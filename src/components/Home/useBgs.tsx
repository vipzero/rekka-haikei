import { useEffect, useState } from 'react'
import { imgCheck } from '../../util'

async function enableUrl(urls: string[]) {
	for (const url of urls) {
		const ok = await imgCheck(url).catch(() => false)

		if (ok) return url
	}
	return false
}

export function useBgs(urls: string[], sid: number, lockCount: number) {
	const [anime, setAnime] = useState<boolean>(true)
	const [url, setUrl] = useState<string>('')
	const [lock, setLock] = useState<number>(lockCount)

	useEffect(() => {
		setLock(lockCount + 1)
	}, [sid, lockCount])

	const locked = lock === 0

	useEffect(() => {
		if (locked) return

		enableUrl(urls)
			.then((url) => {
				if (url) {
					setUrl(url)
					setAnime(false)
					setLock((v) => v - 1)
				}
			})
			.catch(() => {})
	}, [urls[0], locked])
	return { anime, url, setAnime }
}
