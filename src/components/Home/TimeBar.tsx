import React, { useEffect, useState } from 'react'
import { between } from '../../util'

type Props = {
	startTime: number
	size?: number
}
const useTimeBar = (startTime: number, size?: number) => {
	const [p, setP] = useState<number>(0)

	useEffect(() => {
		if (!size) return
		setP(0)
		const t = setInterval(() => {
			const newP = (Date.now() - startTime) / size

			setP(between(newP, 0, 1))
		}, 1000)

		return () => {
			clearInterval(t)
		}
	}, [startTime, size])
	return [p] as const
}

function TimeBar({ startTime, size }: Props) {
	const [p] = useTimeBar(startTime, size)

	if (!size) return null

	return (
		<div
			style={{
				position: 'absolute',
				width: '100vw',
				height: '4px',
				background: '#222',
			}}
		>
			<div
				style={{ background: '#ddd', width: `${100 * p}vw`, height: '4px' }}
			></div>
		</div>
	)
}

export default TimeBar
