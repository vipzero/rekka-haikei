import styled from 'styled-components'
import { useSettings } from '../../hooks/useSettings'
import { range } from '../../util'

const elapsedYourMonth = (ymd: string) => {
	const [y, m] = ymd.split('-').map(Number)
	const now = new Date()
	const mDiff = now.getFullYear() * 12 + (now.getMonth() + 1) - (y * 12 + m)

	return {
		y: Math.floor(mDiff / 12),
		m: mDiff % 12,
	}
}

type Props = {
	ymd: string // yyyy-mm-dd
}

export const AgeBar = ({ ymd }: Props) => {
	const { showAgebar: visible } = useSettings()
	const { y, m } = elapsedYourMonth(ymd)

	return (
		<Style
			className="co-agebar co-panel"
			onClick={(e) => e.stopPropagation()}
			style={{ display: visible ? 'block' : 'none' }}
		>
			<p>
				{y}
				<span>年</span>
				{m}
				<span>ヶ月前</span>
				{range(y).map((i) => (
					<progress key={i} value={12} max={12} />
				))}
				<progress value={m} max={12} />
			</p>
		</Style>
	)
}
const Style = styled.div`
	p {
		font-size: 0.8rem !important;
		span {
			font-size: 0.5rem;
		}
	}
	progress {
		appearance: none;
		margin-left: 0.2rem;
		/* filter: invert(1); */
		border-radius: 5px;

		height: 0.4rem;
		width: 1rem;

		&::-webkit-progress-bar {
			background-color: var(--font-color);
			border-radius: 5px;
		}
		&::-webkit-progress-value {
			background-color: var(--co-bg);
		}
	}
`
