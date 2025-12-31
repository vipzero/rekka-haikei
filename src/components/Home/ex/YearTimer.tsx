import { useMemo } from 'react'
import styled from 'styled-components'
import { zIndex } from '../../../config'
import { useTick, useTick5m } from '../../../hooks/useTick'

const YEAR = new Date(+new Date() - 1000 * 60 * 60).getFullYear() + 1
const TARGET = +new Date(YEAR, 0, 1, 0, 0, 0, 0)
// テスト用: 5秒後にカウントダウン開始
// const TARGET = +new Date() + 1000 * 5

const calcActive = (now) => {
	const a = TARGET - +now
	const ds = Math.floor(a / 1000)
	const m = Math.floor(ds / 60)
	const s = ds % 60

	const before10m = a < 10 * 60 * 1000
	const stat = a > 0 ? 'active' : 'end'
	return { stat, m, s, before10m }
}

const emojis = ['🎉', '🎊', '✨']
const seededRandom = (seed: number) => {
	const x = Math.sin(seed) * 10000
	return x - Math.floor(x)
}
const LAUNCH_DURATION = 1 // 全体の発射時間（秒）
const confettiItems = Array.from({ length: 12 }, (_, i) => ({
	emoji: i === 7 ? '🗿' : emojis[i % emojis.length],
	x: seededRandom(i * 3) * 80 + 10,
	drift: (seededRandom(i * 7) - 0.5) * 100,
	delay: (i / 11) * LAUNCH_DURATION,
}))

const YearTimerComponent = () => {
	const now = useTick()

	const { stat, m, s } = calcActive(now)

	return (
		<>
			<Style data-show={stat}>
				<div className="label">{YEAR - 1}年終了まで</div>
				<div className="time">
					{!!m && <span className="num">{m}</span>}
					{!!m && <span className="unit">分</span>}
					<span className="num">{s}</span>
					<span className="unit">秒</span>
				</div>
			</Style>
			<Confetti data-show={stat}>
				{confettiItems.map((item, i) => (
					<span
						key={i}
						style={
							{
								'--start-x': `${item.x}%`,
								'--drift': `${item.drift}px`,
								animationDelay: `${item.delay}s`,
							} as React.CSSProperties
						}
					>
						{item.emoji}
					</span>
				))}
			</Confetti>
		</>
	)
}
export const YearTimer = () => {
	const now = useTick5m()
	const { before10m } = useMemo(() => calcActive(now), [now])
	if (!before10m) return null

	return <YearTimerComponent />
}

const Style = styled.div`
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	z-index: ${zIndex.layerFrontEx};
	padding: 1rem 1.5rem;
	background: linear-gradient(
		135deg,
		rgba(30, 20, 50, 0.85),
		rgba(50, 30, 60, 0.85)
	);
	backdrop-filter: blur(8px);
	border: 1px solid rgba(255, 215, 0, 0.3);
	border-radius: 12px;
	box-shadow: 0 0 20px rgba(255, 215, 0, 0.15);
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	transition: all 3s ease-in;
	opacity: 1;

	&[data-show='hide'] {
		opacity: 0;
	}
	&[data-show='active'] {
		opacity: 1;
	}
	&[data-show='end'] {
		opacity: 0;
		transform: translateY(-100vh) translateX(100vw) rotate(2023deg);
	}

	.label {
		font-size: 0.875rem;
		color: rgba(255, 220, 180, 0.9);
		letter-spacing: 0.1em;
	}

	.time {
		display: flex;
		align-items: baseline;
	}

	.num {
		font-size: 2.5rem;
		font-weight: bold;
		font-variant-numeric: tabular-nums;
		min-width: 2ch;
		text-align: right;
		background: linear-gradient(180deg, #fff 30%, #ffd700);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
	}

	.unit {
		font-size: 1rem;
		color: rgba(255, 220, 180, 0.7);
		margin: 0 0.5rem 0 0.125rem;
	}
`

const Confetti = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100vh;
	pointer-events: none;
	z-index: ${zIndex.layerFrontEx};

	span {
		position: absolute;
		bottom: 0;
		left: var(--start-x);
		font-size: 4rem;
		opacity: 0;
	}

	&[data-show='end'] span {
		animation:
			launchX 4s linear forwards,
			launchY 4s cubic-bezier(0.33, 1, 0.68, 1) forwards;
	}

	@keyframes launchX {
		0% {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
		40% {
			opacity: 1;
			transform: translateX(var(--drift)) scale(1.2);
		}
		100% {
			opacity: 0;
			transform: translateX(calc(var(--drift) * 2)) scale(0.9);
		}
	}

	@keyframes launchY {
		0% {
			margin-bottom: 0;
		}
		35% {
			margin-bottom: 60vh;
		}
		100% {
			margin-bottom: -10vh;
		}
	}
`
