import styled from 'styled-components'
import { useTimeBar } from '../../hooks/useTimeBar'

type Props = {
	startTime: number
	size?: number
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
