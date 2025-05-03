import { css, keyframes } from 'styled-components'
import { rainbows, range } from '../../../util'
import { sakasaStyles } from './SakasaEx.styles'

const duration = 0.2
const frequency = 10
const interval = duration / frequency
const rand = (a, b) => Math.floor((Math.random() * (b - a) + a) * 100) / 100

const toPar100 = (i, total) => Math.round((100 / (total - 1)) * i)
const makeAnim = (key: string, vals: string[]) =>
	vals.map((v, i) => `${toPar100(i, vals.length)}% { ${key}: ${v}}`).join('\n')

const fontInflare = keyframes`
0% {
	font-size: 1vw;
	left: 0vmin;
	bottom: 0vmin;
}
100% {
	left: -20vmin;
	bottom: -20vmin;
	font-size: 100vmin;
}
`
const animStart = process.env.NODE_ENV === 'development' ? 5 : 60

const clockSpin = keyframes`
0% {
	opacity: 0.1;
	transform: rotate(-90deg);
}
100% {
	opacity: 1;
	transform: rotate(0);
}
`

const rgbShiftR = genAnimationRgbShift()
const rgbShiftG = genAnimationRgbShift()
const rgbShiftB = genAnimationRgbShift()
const glitchBefore = genAnimationGlitch()
// const glitchAfter = genAnimationGlitch()

const randAnimsCss = [...Array(20).keys()]
	.map(
		(i) => `
			span:nth-of-type(${i + 1}),a:nth-of-type(${i + 1}) {
				animation-delay: ${(i * 7) % 10}s;
			}
			`
	)
	.join('\n')

export const exStyles = css`
	${randAnimsCss}

	@keyframes rainbow-anim {
		${makeAnim('background', rainbows)}
	}
	@keyframes rainbow-anim-frame {
		${rainbows
			.map(
				(color, i) => `${toPar100(i, rainbows.length)}% {
			box-shadow: 0 0 .5rem .5rem ${color} inset;
		}`
			)
			.join('\n')}
	}

	@keyframes trip-color {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(90deg);
		}
	}

	&[data-ex='steinsgate'] {
		#timebar > .wrap {
			transform-origin: 0 0;
			animation: spin-y 10s cubic-bezier(0.28, 1.61, 0.7, -0.71) infinite
				alternate;
		}
	}

	@keyframes spin-y {
		0% {
			transform: rotateY(90deg);
		}
		100% {
			transform: rotateY(0deg);
		}
	}
	@keyframes aurora-anim {
		0% {
			background: #e700fc88;
		}
		20% {
			background: transparent;
		}
		40% {
			background: #ffa8;
		}
		60% {
			background: transparent;
		}
		80% {
			background: #fff8;
		}
		100% {
			background: transparent;
		}
	}

	@keyframes appear-anim {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes appear-anim-part {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.9;
		}
	}

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
	}

	&[data-ex='ariascarlet'] {
		#timebar {
			.fill {
				background-color: red;
			}
			.pointer {
				mask-image: url(/static/bullet.svg);
				mask-mode: alpha;
				mask-size: 16px 8px;
				background: conic-gradient(at 0% 30%, red 10%, yellow 19%, #ff5722 45%);
				transform: rotateY(180deg);
				position: relative;
				top: -2px;
				left: -2px;

				width: 16px;
				height: 8px;
			}
		}
	}
	${sakasaStyles}

	&[data-ex='3sha3yo'] {
		.hurricane {
			filter: url(#wavy) blur(1px);
			position: absolute;
			animation: ${fontInflare} 240s linear both;
			color: black;
		}
		.hurricane-s {
			animation: spin 0.3s linear infinite;
			svg {
				filter: drop-shadow(2rem 2rem 2rem #505);
			}
		}
	}
	&[data-ex='imascd'] {
		#imascd {
			pointer-events: none;
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			overflow: hidden;

			> div {
				--l: calc(100vw - 100vmax);
				position: absolute;
				animation: ${clockSpin} var(--song-time) linear both;

				top: 0;
				left: var(--l);
				width: 200vmax;
				height: 200vmax;
			}
			img {
				position: absolute;
				height: 100vmax;
				right: 100vmax;
			}
		}
	}
	&[data-ex='offline'] {
		#bg {
			filter: grayscale(100%);
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
