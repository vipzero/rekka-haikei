export const pad2 = (num: number) => String(num).padStart(2, '0')
export function formatDate(time: number, toHour: boolean = false) {
	const date = new Date(time)

	const yyyy = date.getFullYear()
	const mm = pad2(date.getMonth() + 1)
	const dd = pad2(date.getDate())
	const h = pad2(date.getHours())
	const m = pad2(date.getMinutes())
	const s = pad2(date.getSeconds())

	if (toHour) return `${mm}月${dd}日${h}時`
	return `${yyyy}-${mm}-${dd} ${h}:${m}:${s}`
}

export function formatYmdSlash(time: number) {
	const date = new Date(time)
	const yyyy = date.getFullYear()
	const mm = pad2(date.getMonth() + 1)
	const dd = pad2(date.getDate())
	return `${yyyy}/${mm}/${dd}`
}
export const formatTime = (time: number) => formatDate(time).split(' ')[1]

export const formatCount = (n: number) => (n === 1 ? '初' : `${n}回目`)

export function imgCheck(url: string) {
	return new Promise((resolve, reject) => {
		const bgImg = new Image()

		bgImg.onload = () => {
			resolve(true)
		}
		bgImg.onerror = () => {
			reject()
		}
		bgImg.src = url
	})
}

export function imgLoad(url: string) {
	return new Promise<XMLHttpRequest>((resolve, reject) => {
		let xhr = new XMLHttpRequest()
		xhr.open('GET', url, true)
		xhr.responseType = 'blob'
		xhr.onload = () => resolve(xhr)
		xhr.onerror = reject
		xhr.send()
	})
}
export const downloadImg = async (url: string, filename: string) => {
	const img = await imgLoad(url)
	let dlLink = document.createElement('a')

	const dataUrl = URL.createObjectURL(img.response)
	dlLink.href = dataUrl

	dlLink.download = filename

	dlLink.click()
	dlLink.remove()
}

export const sleep = (msec) =>
	new Promise((resolve) => setTimeout(resolve, msec))
export const between = (v, min, max) => Math.max(min, Math.min(max, v))

export const isObjEmpty = (obj: object) => Object.keys(obj).length === 0
export const not = (v: boolean) => !v

export const toggle = <T>(v: T, key: keyof T): T => ({ ...v, [key]: !v[key] })
export const isValidUrl = (url: string) => {
	try {
		new URL(url)
	} catch (_e) {
		return false
	}
	return true
}

export const getIp = () =>
	fetch('https://api.ipify.org').then((res) => res.text())

export const getIp2 = async () => (await fetch('https://api.ipify.org')).text()

export const makeHash = (str: string) => {
	let hash = 5381
	let i = str.length
	while (i) {
		hash = (hash * 33) ^ str.charCodeAt(--i)
	}
	return hash >>> 0
}

export const searchUrl = (q: string) =>
	`https://www.google.co.jp/search?q=${encodeURI(q)}`
export const searchImageUrl = (q: string) => `${searchUrl(q)}&tbm=isch`
export const utanetSearchUrl = (keyword: string) =>
	searchUrl(`${keyword} site:uta-net.com`)

export const uaHash = () => {
	if (typeof navigator === 'undefined') return 0
	return makeHash(navigator.userAgent)
}

export const mergeArr = <T>(a0: T[], b0: T[], orderBy: (a: T) => number) => {
	const res: T[] = []
	const a = [...a0]
	const b = [...b0]

	while (a.length > 0 && b.length > 0) {
		const v = (orderBy(a[0]) <= orderBy(b[0]) ? a : b).shift()
		if (v !== undefined) res.push(v)
	}

	return res.concat(a).concat(b)
}

export const genToggle =
	<T>(arr: readonly T[]): ((v: T) => T) =>
	(v) =>
		arr[(arr.indexOf(v) + 1) % arr.length]

export const keyNorm = (title: string) =>
	title
		.trim()
		.toLowerCase()
		.replace(/[　 ]/g, ' ')
		.replace(/！/g, '!')
		.replace(/？/g, '?')
		.replace(/／/g, '/')
		.replace(/＼/g, '\\')
		.replace(/[、，]/g, ',')
		.replace(/[。．]/g, '.')
		.replace(/：/g, ':')
		.replace(/；/g, ';')
		.replace(/[´｀¨‘’]/g, "'")
		.replace(/＿/g, '_')
		.replace(/＾/g, '^')
		.replace(/[ー―‐－]/g, '^')
		.replace(/～/g, '~')
		.replace(/[✕×✖]/g, '×')
		.replace(/[“”]/g, '"')
		.replace(/[＝]/g, '=')
		.replace(/[￥]/g, '¥')
		.replace(/[＄]/g, '$')
		.replace(/[％]/g, '%')
		.replace(/[＃]/g, '#')
		.replace(/[＆]/g, '&')
		.replace(/[＊]/g, '*')
		.replace(/[＠]/g, '@')
		.replace(/[（〔［｛〈《「『【＜]/g, '(')
		.replace(/[）〕］｝〉》」』】＞]/g, ')')

export const isEmoji = (v) => /\p{Emoji}/u.test(v)
export const isBugText = (s) => s.includes('�')

export const rainbows = [
	'red',
	'orange',
	'yellow',
	'green',
	'aqua',
	'blue',
	'purple',
]
