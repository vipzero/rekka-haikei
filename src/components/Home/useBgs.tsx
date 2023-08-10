import { useEffect, useState } from 'react'
import { imgCheck } from '../../util'

const hostPattern = process.env.NEXT_PUBLIC_IMG_HOST_PATTERN || '___invalid'
const isHostImg = (url: string) => url.match(hostPattern)
const isMobile = () => {
	const screenWidth =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth
	return screenWidth <= 768 // 例えば、画面幅が768px以下ならスマートフォンと判定
}
const mobilePatch = (url: string) => {
	if (!isHostImg(url) || !isMobile()) return url
	const parts = url.split('.')
	const ext = parts.pop()
	return parts.join('.') + '_min.' + ext
}

async function enableUrl(urls: string[]) {
	for (const urlPre of urls) {
		const url = mobilePatch(urlPre)
		const img = await imgCheck(url).catch(() => false as const)

		if (img) return { url, img }
	}
	return false
}

export function useBgs(urls: string[], sid: number, lockCount: number) {
	const [anime, setAnime] = useState<boolean>(true)
	const [url, setUrl] = useState<string>('')
	const [size, setSize] = useState<{ w: number; h: number }>({ w: 1, h: 1 })
	const [lock, setLock] = useState<number>(lockCount)

	useEffect(() => {
		setLock(lockCount + 1)
	}, [sid, lockCount])

	const locked = lock === 0

	useEffect(() => {
		if (locked) return

		enableUrl(urls)
			.then((res) => {
				if (res) {
					const { url, img } = res
					setUrl(url)
					setAnime(false)
					setSize({ w: img.naturalWidth, h: img.naturalHeight })
					setLock((v) => v - 1)
				}
			})
			.catch(() => {})
	}, [urls[0], locked])
	return { anime, url, setAnime, size }
}
