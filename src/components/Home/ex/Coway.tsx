import {
	ConwaysGameEngine,
	defaultRules,
} from '@monarchwadia/conways-game-engine'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const config = {
	rowSize: 20,
	colSize: 20,

	rules: defaultRules(),

	allowMultipleRuleMatches: false,
}

const useLifeMap = () => {
	const [world, setWorld] = useState<ConwaysGameEngine['world'] | null>()
	useEffect(() => {
		const engine = new ConwaysGameEngine(config)
		const cx = 3
		const cy = 3
		// prettier-ignore
		const bits = [
			0b111111011,
			0b111111011,
			0b000000011,
			0b110000011,
			0b110000011,
			0b110000011,
			0b110000000,
			0b110111111,
			0b110111111,
		]
		bits.map((l, y) => {
			l.toString(2)
				.padStart(9, '0')
				.split('')
				.map((b, x) => {
					if (b === '1') engine.draw(cx + x, cy + y)
				})
		})

		setWorld(engine.world)
		setInterval(() => {
			engine.step()
			setWorld(engine.world)
		}, 800)
	}, [])
	return { world }
}

export const Conways = () => {
	const { world } = useLifeMap()
	if (!world) return null
	return (
		<Style>
			{world.map((row, i) =>
				row.map((v, j) => <div key={`${i}-${j}`} data-v={v} />)
			)}
		</Style>
	)
}

const Style = styled.div`
	position: absolute;
	overflow: hidden;
	top: 0;
	left: 0;
	display: grid;
	width: 100vmax;
	height: 100vmax;
	grid-template-columns: repeat(20, 1fr);
	filter: url(#goo);
	mix-blend-mode: difference;

	[data-v] {
		width: 10vmin;
		height: 10vmin;
		background: lime;
		transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
		transform-origin: center;

		&[data-v='1'] {
			opacity: 1;
			transform: skew(0deg) scale(1);
			/* animation: var(--animation-slide-in-up) 1s; */
		}
		&[data-v='0'] {
			opacity: 0;
			transform: skew(45deg, 45deg) scale(0.5);
			/* animation: var(--animation-slide-in-down) 1s; */
		}
	}
`
