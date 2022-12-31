import { useEffect, useState } from 'react'

export const useTick = () => {
	const [now, setNow] = useState<Date>(new Date())
	useEffect(() => {
		const t = setInterval(() => {
			const d = new Date()
			d.setMilliseconds(0)
			setNow(d)
		}, 100)
		return () => clearInterval(t)
	}, [])
	return now
}
