import { useEffect, useState } from 'react'
import { imgCheck } from '../../util'

const isMobile = () => {
	const screenWidth =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth
	return screenWidth <= 650
}

const mobilePatch = (url: string, hasMinImg: boolean) => {
	if (!(hasMinImg && isMobile())) return url
	const parts = url.split('.')
	const ext = parts.pop()
	return parts.join('.') + '_min.' + ext
}

async function enableUrl(urls: string[], hasMinImg: boolean) {
	for (const urlPre of urls) {
		const url = mobilePatch(urlPre, hasMinImg)
		const img = await imgCheck(url).catch(() => false as const)

		if (img) return { url, img }
	}
	return false
}

export function useBgs(
	urls: string[],
	sid: number,
	lockCount: number,
	hasMinImg: boolean,
	onChangeUrl?: (url: string) => void
) {
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

		enableUrl(urls, hasMinImg)
			.then((res) => {
				if (!res) return

				const { url, img } = res
				setUrl(url)
				onChangeUrl?.(url)
				setAnime(false)
				setSize({ w: img.naturalWidth, h: img.naturalHeight })
				setLock((v) => v - 1)
			})
			.catch(() => {})
	}, [urls[0], locked])
	return { anime, url, setAnime, size }
}
