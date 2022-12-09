import { useEffect, useState } from 'react'
import { between } from '../util'

export const useTimeBar = (
	startTime: number,
	size?: number,
	tick: number = 1000
) => {
	const [p, setP] = useState<number>(0)

	useEffect(() => {
		if (!size) return
		setP(0)
		const t = setInterval(() => {
			const newP = (Date.now() - startTime) / size

			setP(between(newP, 0, 1))
		}, tick)

		return () => {
			clearInterval(t)
		}
	}, [startTime, size])
	return [p] as const
}
