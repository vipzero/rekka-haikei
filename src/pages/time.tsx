import { useMemo } from 'react'
import { useEffect, useState } from 'react'

const pad2 = (n: number) => ('0' + n).slice(-2)
const Time = () => {
	const [now, setNow] = useState<Date | null>(null)
	useEffect(() => {
		const t = setInterval(() => {
			const d = new Date()
			d.setMilliseconds(0)
			setNow(d)
		}, 100)
		return () => clearInterval(t)
	}, [])

	const [cur, diff, nextHour] = useMemo(() => {
		if (!now) return ['--:--:--', '--:--', 0]
		const cur = [
			pad2(now.getHours()),
			pad2(now.getMinutes()),
			pad2(now.getSeconds()),
		].join(':')
		const diff = [
			pad2(60 - now.getMinutes() - 1),
			pad2((60 - now.getSeconds()) % 60),
		].join(':')
		return [cur, diff, now.getHours() + 1]
	}, [now])
	if (!now) return null

	return (
		<div>
			<h4>{cur}</h4>
			<p>
				<h3>
					{nextHour}時まであと{diff}
				</h3>
			</p>
		</div>
	)
}
export default Time
