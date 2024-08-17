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

const divmod = (a: number, b: number) => [Math.floor(a / b), a % b]

export const AgeBar = ({ y, m }: { y: number; m: number }) => {
	const [oy, my] = divmod(y, 10)

	return (
		<Style className="co-agebar co-panel" onClick={(e) => e.stopPropagation()}>
			<p>
				{y}
				<span>年</span>
				{m}
				<span>ヶ月前</span>
				{range(oy).map((i) => (
					<progress className="ten" key={i} value={12} max={12} />
				))}
				{range(my).map((i) => (
					<progress key={i} value={12} max={12} />
				))}
				<progress value={m} max={12} />
			</p>
		</Style>
	)
}

const validFormat = (s: string) => s.match(/^\d{4}-\d{2}-\d{2}$/)

type Props = {
	ymd: string // yyyy-mm-dd
}

export const AgeBarContainer = ({ ymd }: Props) => {
	const { showAgebar: visible } = useSettings()
	const { y, m } = elapsedYourMonth(ymd)
	if (!validFormat(ymd)) return null

	return (
		<Style style={{ display: visible ? 'block' : 'none' }}>
			<AgeBar y={y} m={m} />
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

		height: 0.4rem;
		width: 1rem;

		&.ten {
			height: 0.5rem;
			width: 7rem;
		}

		&::-webkit-progress-bar {
			background-color: var(--font-color, #aaa);
			border-radius: 4px;
		}
		&::-webkit-progress-value {
			background-color: var(--co-bg, #444);
			border-radius: 4px;
		}
	}
`
