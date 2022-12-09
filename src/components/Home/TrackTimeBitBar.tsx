import styled from 'styled-components'
import { useTimeBar } from '../../hooks/useTimeBar'

type Props = {
	startTime: number
	size?: number
}
const SP = 10
const bits16 = (v) =>
	Math.floor(v * 2 ** SP)
		.toString(2)
		.padStart(SP, '0')

function TrackTimeBitBar({ startTime, size }: Props) {
	const [p] = useTimeBar(startTime, size, 101)

	if (!size) return null

	return (
		<>
			<Style id="timebar">
				<div className="wrap">
					{bits16(p)
						.split('')
						.map((b, i) => (
							<div key={i} data-b={b} />
						))}
				</div>
			</Style>
		</>
	)
}
const Style = styled.div`
	.wrap {
		display: grid;
		grid-auto-flow: column;
		position: absolute;
		width: 100vw;
		height: 4px;
		> div {
			width: 100%;
			border-radius: 2px;
			&[data-b='0'] {
			}
			&[data-b='1'] {
				background: #222;
				mix-blend-mode: difference;
			}
			&:nth-of-type(n + 11) {
				background: red;
			}
		}
	}
`

export default TrackTimeBitBar
