import styled from 'styled-components'
import { useTick } from '../../../hooks/useTick'

export const YearTimer = () => {
	const now = useTick()
	const c = +new Date(2023, 0, 1, 0, 0, 0, 0)

	const a = c - +now
	const ds = Math.floor(a / 1000)
	const m = Math.floor(ds / 60)
	const s = ds % 60

	const k = m >= 5 ? 'hide' : a > 0 ? 'active' : 'end'
	if (a < -30 * 1000) return null

	return (
		<Style data-show={k}>
			<div>2023 まで</div>
			{!!m && <div className="m">{m}分</div>}
			<div className="s">{s}秒</div>
		</Style>
	)
}

const Style = styled.div`
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	padding: 1rem;
	font-size: 2rem;
	background: var(--setting-bg-color);
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
