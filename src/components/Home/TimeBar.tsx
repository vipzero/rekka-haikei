import React, { useEffect, useState } from 'react'
import { between } from '../../util'

type Props = {
	startTime: number
	size?: number
}

function TimeBar({ startTime, size }: Props) {
	const [p, setP] = useState<number>(0)

	useEffect(() => {
		if (!size) return
		setP(0)
		const t = setInterval(() => {
			const newP = (Date.now() - startTime) / size

			setP(between(newP, 0, 1))
		}, 1000)

		return () => {
			console.log('close')
			clearInterval(t)
		}
	}, [startTime, size])
	if (!size) {
		return null
	}

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
