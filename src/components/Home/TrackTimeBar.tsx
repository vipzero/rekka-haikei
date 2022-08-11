import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
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

function TrackTimeBar({ startTime, size }: Props) {
	const [p] = useTimeBar(startTime, size)

	if (!size) return null

	return (
		<>
			<Style id="timebar">
				<div className="wrap">
					<div className="fill" style={{ width: `${100 * p}vw` }}></div>
					<div className="pointer" />
				</div>
			</Style>
			{/* <div id="breaks">
				<div id="break-y" style={{ height: `${100 / (p + 0.1)}vh` }}></div>
			</div> */}
		</>
	)
}
const Style = styled.div`
	.wrap {
		display: flex;
		position: absolute;
		width: 100vw;
		height: 4px;
		background: #222;
	}
	.fill {
		background: #ddd;
		height: 4px;
	}
	#break-y {
		background: #f008;
		position: absolute;
		width: 10px;
	}
`

export default TrackTimeBar
