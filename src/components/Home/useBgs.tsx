import { useEffect, useState } from 'react'
import { imgCheck } from '../../util'

async function enableUrl(urls: string[]) {
	for (const url of urls) {
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
