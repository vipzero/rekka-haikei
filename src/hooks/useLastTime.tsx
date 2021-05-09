import { useEffect, useState } from 'react'
import config from '../config'

export function useIsLastTime() {
	const [last, setLast] = useState<boolean>(false)

	useEffect(() => {
		if (last) return
		const t = setInterval(() => {
			if (+new Date() < config.lastTime) {
				setLast(true)
				clearInterval(t)
			}
		}, 5000)

		return clearInterval(t)
	}, [])
	return last
}
