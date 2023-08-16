import { useMemo } from 'react'
import styled from 'styled-components'
import { useTick, useTick5m } from '../../../hooks/useTick'

const YEAR = 2024
const TARGET = +new Date(YEAR, 0, 1, 0, 0, 0, 0)

const calcActive = (now: Date) => {
	const a = TARGET - +now
	const ds = Math.floor(a / 1000)
	const m = Math.floor(ds / 60)
	const s = ds % 60

	const before30 = a < -30 * 1000
	const stat = a > 0 ? 'active' : 'end'
	return { stat, m, s, before30 }
}

const YearTimerComponent = () => {
	const now = useTick()

	const { stat, m, s } = calcActive(now)

	return (
		<Style data-show={stat}>
			<div>{YEAR} まで</div>
			{!!m && <div className="m">{m}分</div>}
			<div className="s">{s}秒</div>
		</Style>
	)
}
export const YearTimer = () => {
	const now = useTick5m()
	const { before30 } = useMemo(() => calcActive(now), [now])
	if (!before30) return null

	return <YearTimerComponent />
}

const Style = styled.div`
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	padding: 1rem;
	font-size: 2rem;
	background-color: var(--setting-bg-color);
	color: var(--font-color);
	display: flex;
	transition: all 5s ease-in;
	transform: translateY(0%);
	opacity: 1;
	&[data-show='hide'] {
		opacity: 0;
		transform: translateY(-20%);
	}
	&[data-show='active'] {
		opacity: 1;
		transform: translateY(0%) rotate(0deg);
	}
	&[data-show='end'] {
		opacity: 0;
		transform: translateY(-50%) rotate(2023deg);
	}

	.m,
	.s {
		text-align: right;
		width: 6rem;
	}
`
