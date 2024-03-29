const width = 600
const height = 600
const makeSvgUrl = async (element: HTMLDivElement, prevurl: string) => {
	const url = element.style.backgroundImage.replace(/url\("(.*)"\)/, '$1')
	if (url === prevurl) return false
	const imgEl = document.createElement('img')
	imgEl.src = url
	imgEl.style.width = '100%'
	// const waitingImgList = Array.from([imgEl])
	// await Promise.all(
	// 	waitingImgList.map(
	// 		(el) =>
	// 			new Promise((resolve) => {
	// 				el.addEventListener('load', () => {
	// 					resolve(0)
	// 				})
	// 			})
	// 	)
	// )

	const ns = 'http://www.w3.org/2000/svg'
	const svg = document.createElementNS(ns, 'svg')
	svg.setAttribute('width', String(width))
	svg.setAttribute('height', String(height))

	const foreignObject = document.createElementNS(ns, 'foreignObject')
	foreignObject.setAttribute('width', String(width))
	foreignObject.setAttribute('height', String(height))

	const html = element.cloneNode(true) as HTMLElement
	html.appendChild(imgEl)
	html.style.display = 'content'

	const imgList = Array.from(html.querySelectorAll('img'))
	await Promise.all(
		imgList.map(async (el) => {
			const data = await fetch(el.src).then((res) => res.blob())
			const reader = new FileReader()
			const url = await new Promise<string>((resolve) => {
				reader.onload = () => resolve(String(reader.result))
				reader.readAsDataURL(data)
			})
			el.src = url
			return el.decode()
		})
	)

	// const style = document.createElement('style')
	// const css = await fetch('style.css').then((res) => res.text())
	// style.textContent = css
	// html.appendChild(style)

	foreignObject.appendChild(html)
	svg.appendChild(foreignObject)

	const svgStr = new XMLSerializer().serializeToString(svg)
	const svgUrl =
		'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr)
	return { svgUrl, url }
}

export const startPip = async () => {
	const pipSource = document.querySelector<HTMLDivElement>('#bg-img')
	if (pipSource === null) return

	// const waitingImgList = Array.from([imgEl])
	// await Promise.all(
	// 	waitingImgList.map(
	// 		(el) =>
	// 			new Promise((resolve) => {
	// 				el.addEventListener('load', () => {
	// 					resolve(0)
	// 				})
	// 			})
	// 	)
	// )

	// const { width, height } = pipSource.getBoundingClientRect()
	console.log(width, height)
	let img = new Image(width, height)
	let url = ''
	const updateImage = async () => {
		const res = await makeSvgUrl(pipSource, url)
		if (!res) return
		const { svgUrl, url: newUrl } = res
		url = newUrl

		img = new Image(width, height)
		img.src = svgUrl
		await img.decode()
	}
	updateImage()

	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	canvas.width = width
	canvas.height = height

	const it = setInterval(updateImage, 3000)
	;(function render() {
		if (ctx === null) return
		ctx.clearRect(0, 0, width, height)
		ctx.drawImage(img, 0, 0, img.width, img.height)
		requestAnimationFrame(() => render())
	})()

	const stream = canvas.captureStream(60)

	// canvasを表示するだけのvideo要素を作る
	const video = document.createElement('video')
	video.autoplay = true
	video.muted = true
	video.playsInline = true
	video.width = width
	video.height = height
	video.srcObject = stream

	await new Promise((resolve) => {
		video.ontimeupdate = () => {
			resolve(0)
		}
		video.play()
	})

	video.onenterpictureinpicture = () => {
		video.style.display = 'none'
	}

	video.onleavepictureinpicture = () => {
		video.remove()
		clearInterval(it)
	}

	document.body.appendChild(video)
	video.play()
	video.requestPictureInPicture()
}
