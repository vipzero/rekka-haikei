import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export const fetcherAtom = atom<boolean>(false)

export const useFetcher = () => {
	const [main, setmain] = useState<boolean>(false)
	const [fetcher, setFetcher] = useAtom(fetcherAtom)

	useEffect(() => {
		setFetcher((v) => {
			if (v) return true

			setmain(true)

			return true
		})
	}, [fetcher])
	return main
}
