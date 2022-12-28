import styled from 'styled-components'
import { useTimeBar } from '../../hooks/useTimeBar'
import { range } from '../../util'

type Props = {
	startTime: number
	size?: number
}
const SP = 16
const bits16 = (v) =>
	Math.floor(v * 2 ** SP)
		.toString(2)
		.padStart(SP, '0')

function TrackTimeBitBar({ startTime, size }: Props) {
	const [p] = useTimeBar(startTime, size, 97)

	if (!size) return null
	const bs = bits16(p)
	const bs4 = range(4).map((i) => bs.substring(i * 4, i * 4 + 4) === '1111')

	return (
		<>
			<Style id="timebar">
				<div className="wrap">
					<>
						{bs.split('').map((b, i) => (
							<div key={i} data-b={b} data-b4={bs4[Math.floor(i / 4)]} />
						))}
					</>
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
				background: #888;
				mix-blend-mode: difference;
			}
			&[data-b4='true'] {
				background: yellow;
				mix-blend-mode: color-burn;
			}
			/* &:nth-of-type(11) {
				background: red;
				animation: blink 0.1s infinite alternate;
			}
			&:nth-of-type(12) {
				background: red;
				animation: blink 0.1s infinite alternate;
			}
			&:nth-of-type(n + 13) {
				background: green;
				background: #888;
				opacity: 0.5;
				mix-blend-mode: difference;
			} */
		}
	}
`

export default TrackTimeBitBar
