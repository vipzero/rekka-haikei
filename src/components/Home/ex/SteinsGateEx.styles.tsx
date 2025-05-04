import { css, keyframes } from 'styled-components'
import { range } from '../../../util'

const duration = 0.2
const frequency = 10
const interval = duration / frequency
const rand = (a, b) => Math.floor((Math.random() * (b - a) + a) * 100) / 100
const animStart = process.env.NODE_ENV === 'development' ? 5 : 60

const rgbShiftR = genAnimationRgbShift()
const rgbShiftG = genAnimationRgbShift()
const rgbShiftB = genAnimationRgbShift()
const glitchBefore = genAnimationGlitch()

export const steinsGateStyles = css`
	&[data-ex='steinsgate'] #bg > div {
		.clone {
			display: none;
		}
		&::before,
		&::after,
		.channel {
			background: inherit;
			bottom: 0;
			left: 0;
			position: absolute;
			right: 0;
			top: 0;
		}
		&::before {
			animation: ${glitchBefore} 3s linear infinite alternate both;
			content: '';
		}
		.channel {
			mix-blend-mode: screen;
			&::before {
				bottom: 0;
				content: '';
				display: block;
				mix-blend-mode: multiply;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
			}
		}
		.r {
			animation: ${rgbShiftR} 3s steps(1, jump-end) infinite alternate both;
			&::before {
				background: #f00;
			}
		}
		.g {
			animation: ${rgbShiftG} 3s steps(1, jump-end) infinite alternate both;
			&::before {
				background: #0f0;
			}
		}
		.b {
			animation: ${rgbShiftB} 3s steps(1, jump-end) infinite alternate both;
			::before {
				background: #00f;
			}
		}
		&::before,
		&::after,
		.channel {
			animation-delay: ${animStart - 3}s;
		}

		#timebar > .wrap {
			transform-origin: 0 0;
			animation: spin-y 10s cubic-bezier(0.28, 1.61, 0.7, -0.71) infinite
				alternate;
		}

		#bg > div {
			.clone {
				display: none;
			}
			&::before,
			&::after,
			.channel {
				background: inherit;
				bottom: 0;
				left: 0;
				position: absolute;
				right: 0;
				top: 0;
			}
			&::before {
				animation: ${glitchBefore} 3s linear infinite alternate both;
				content: '';
			}
			.channel {
				mix-blend-mode: screen;
				&::before {
					bottom: 0;
					content: '';
					display: block;
					mix-blend-mode: multiply;
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
				}
			}
			.r {
				animation: ${rgbShiftR} 3s steps(1, jump-end) infinite alternate both;
				&::before {
					background: #f00;
				}
			}
			.g {
				animation: ${rgbShiftG} 3s steps(1, jump-end) infinite alternate both;
				&::before {
					background: #0f0;
				}
			}
			.b {
				animation: ${rgbShiftB} 3s steps(1, jump-end) infinite alternate both;
				::before {
					background: #00f;
				}
			}
			&::before,
			&::after,
			.channel {
				animation-delay: ${animStart - 3}s;
			}
		}
	}
`

function genAnimationRgbShift() {
	return keyframes`
		${`${duration * 100}%`}, 100% {
			opacity: 0;
			transform: none;
		}

		${range(frequency).map(
			(p) => css`
				${p * interval * 100}% {
					transform: translate(${rand(-2, 2)}%, ${rand(-0.5, 0.5)}%);
					opacity: 1;
				}
			`
		)}
	`
}

function genAnimationGlitch() {
	return keyframes`
		${range(frequency).map((p) => {
			const left = 0
			const right = 100
			const top = rand(0, 90)
			const bottom = top + rand(1, 10)
			return css`
				${p * interval * 100}% {
					clip-path: polygon(
						${left}% ${top}%,
						${right}% ${top}%,
						${right}% ${bottom}%,
						${left}% ${bottom}%
					);
					transform: translate(${rand(-8, 8)}%, ${rand(-0.5, 0.5)}%);
				}
			`
		})}

		${`${duration * 100}%`}, 100% {
			clip-path: none;
			transform: none;
		}
	`
}
