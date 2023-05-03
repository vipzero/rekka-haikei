import { useEffect, useState } from 'react'

export const useTick = (ms = 100) => {
	const [now, setNow] = useState<Date>(new Date())
	useEffect(() => {
		const t = setInterval(() => {
			const d = new Date()
			d.setMilliseconds(0)
			setNow(d)
		}, ms)
		return () => clearInterval(t)
	}, [])
	return now
}

export const useTick5m = () => useTick(1000 * 60 * 5)
