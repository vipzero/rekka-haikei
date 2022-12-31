import { useEffect, useState } from 'react'
import styled from 'styled-components'

const galax = [
	'AAAeDQiIRDAkMSJGEgYRCIhYPAAA',
	'AYAeC2iYDmZy8SJHpzM4DItoPADA',
	'AkAgBgEDQRIOigAouCRBYEAwAgEg',
	'AABgAgAzgRcNCBQIWHRA5gAgAwAA',
	'AABgACAygnUPyDYJ+FcgpgIAAwAA',
	'AAAABSA6wgQIMAAGCBAhrgJQAAAA',
	'AAAABbBswgAAMMGGAAAhmwbQAAAA',
	'AAAADfhvwwAYMMGGDABh+w/YAAAA',
]
const bits = galax.map((s) =>
	Array.from(Uint8Array.from(Buffer.from(s, 'base64')))
		.map((i) => i.toString(2).padStart(8, '0').split(''))
		.flat()
)

const useLifeMap = () => {
	const [world, setWorld] = useState<number>(0)
	useEffect(() => {
		setInterval(() => {
			setWorld((i) => (i + 1) % 8)
		}, 800)
	}, [])
	return { world }
}

export const Conways = () => {
	const { world } = useLifeMap()

	return (
		<Style>
			{bits[world].map((v, i) => (
				<div key={`${i}`} data-v={v} />
			))}
		</Style>
	)
}

const Style = styled.div`
	position: absolute;
	overflow: hidden;
	top: 0;
	left: 0;
	display: grid;

	height: 100vmax;
	grid-template-columns: repeat(13, 1fr);
	filter: url(#goo);
	mix-blend-mode: difference;
	gap: 2px;

	[data-v] {
		width: 64px;
		height: 64px;
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
