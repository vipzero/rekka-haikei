import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { range } from '../../../util'
import RainCanvas from './RainCh'

const rand = (a, b) => Math.floor((Math.random() * (b - a) + a) * 100) / 100

const rainAnim = keyframes`
	${range(20)
		.map((i) => ({ s: i * 5, e: i * 5 + 4, w: rand(-10, 10) * 10 }))
		.map(
			({ s, e, w }) => css`
				${s}% {
					/* ${`${5}%`} { */
					transform: translate(${w}px, 0);
				}
				${e}% {
					transform: translate(${w}px, 100vh);
				}
			`
		)}
	100% {
		transform: translate(0px, 0px);
	}
`

const RainsBox = styled.div`
	pointerevents: 'none';
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
`

export const RainEx = () => {
	return (
		<RainsBox>
			<RainCanvas />
		</RainsBox>
	)
}

export default RainEx
