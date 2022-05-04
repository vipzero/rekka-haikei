import { css, keyframes } from 'styled-components'

const duration = 0.2
const frequency = 10
const interval = duration / frequency
const range = (n: number) => [...Array(n).keys()]
const rand = (a, b) => Math.floor((Math.random() * (b - a) + a) * 100) / 100

const spin = keyframes`
0% {
	transform: rotate(0deg);
}
100% {
	transform: rotate(360deg);
}
`
const animStart = process.env.NODE_ENV === 'development' ? 5 : 60

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
	&[data-ex='lain'],
	&[data-ex='psychopass'],
	&[data-ex='kokaku'] {
		div {
			/* background: linear-gradient(#0000, #1008, #0008, #1000) !important; */
		}

		span,
		a {
			width: max-content;
			animation-name: noise;
			animation-direction: alternate;
			animation-timing-function: ease-in-out;
			animation-iteration-count: infinite;
			animation-duration: 8s;
		}

		&[data-ex='kokaku'] {
			--ex-color: #0385f4;
			--font-color: #b8deff;
			--btn-fo-color: var(--ex-color);
			--btn-bg-color: white;
			--btn-bg-checked-color: #b8deff;

			div {
				border-bottom: solid 1px var(--ex-color);
				background: #a2c0c033;
			}

			p,
			span,
			a {
				animation-name: noiseBlink;
			}

			.setting-box {
				p,
				span,
				a {
					color: var(--ex-color);
				}
			}

			/* cursor: url(/static/sac-min.png) 25 25, auto; */
			&[data-ex-just='kokaku'] {
				cursor: none;

				#kokaku-pointer {
					pointer-events: none;
					animation: ${spin} 10s linear infinite;
				}
			}
		}

		&[data-ex='psychopass'] {
			--ex-color: #13e0ad;
			--font-color: var(--ex-color);
			--btn-fo-color: var(--ex-color);
			--btn-bg-color: #15353b;
			--btn-bg-checked-color: black;

			div {
				border-bottom: solid 1px var(--ex-color);
				background: #092b0933;
			}
			p,
			span,
			a {
				color: var(--ex-color);
				animation-name: noiseBlink;
			}
		}

		${randAnimsCss}
	}
	&[data-ex='patema'] {
		transform: rotateX(180deg);
	}
	&[data-ex='flip'] {
		#bg {
			transform: rotateY(180deg);
		}
		.setting-box {
			transform: rotateY(180deg);
		}
	}
	&[data-ex='spin'] {
		.album img {
			animation: ${spin} 5s linear infinite;
			&:hover {
				animation-name: none;
			}
		}

		&[data-has-art='true'] {
			#bg > div {
				animation: ${spin} 3000s linear infinite;
			}
		}
		&[data-has-art='false'] {
			#bg > div {
				animation: ${spin} 60s linear infinite;
			}
		}
	}
	&[data-ex='shanimas'] {
		#mask {
			display: block;
			opacity: 0.5;
			animation: rainbow-anim 20s linear infinite alternate;
			mask-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
		}
		@keyframes rainbow-anim {
			0% {
				background: red;
			}
			16% {
				background: orange;
			}
			32% {
				background: yellow;
			}
			48% {
				background: green;
			}
			64% {
				background: aqua;
			}
			80% {
				background: blue;
			}
			100% {
				background: purple;
			}
		}
	}
	&[data-ex='rakupro'] {
		#mask {
			display: block;
			animation: aurora-anim 20s linear infinite alternate;
		}

		/* background-size: 400% 400%; */
		#mask2 {
			/* background: linear-gradient(to top, #e700fcaa, transparent); */
			/* background: linear-gradient(to top, #fffa, transparent); */
		}
	}
	&[data-ex='masshiro'] {
		#mashiros {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 20vw;
			animation: skipping-move 10s linear infinite alternate;
			> div {
				position: relative;
			}
		}
		#mashiro-a,
		#mashiro-b {
			width: 100%;
			position: absolute;
			right: 0;
			bottom: 0;
		}
		#mashiro-a {
			animation: skipping 2s linear infinite;
		}
		#mashiro-b {
			animation: skipping-back 2s linear infinite;
		}
	}

	@keyframes noise {
		0% {
			opacity: 0.5;
			transform: rotate(-5deg) translate(-10%, 5%);
		}
		25% {
			transform: rotate(1deg);
		}
		50% {
			opacity: 0.75;
		}
		51% {
			opacity: 0;
		}
		52% {
			opacity: 0.75;
			transform: translate(5%, 0%);
		}
		75% {
			transform: rotate(-2deg);
		}
		100% {
			opacity: 1;
			transform: rotate(5deg) translate(0%, -10%);
		}
	}

	@keyframes noiseBlink {
		0% {
			opacity: 1;
		}
		99% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes skipping {
		0% {
			transform: translate(0%) rotateY(-90deg);
		}
		50% {
			opacity: 1;
			transform: translate(0%) rotateY(90deg);
		}
		51% {
			opacity: 0;
			transform: translate(0%) rotateY(90deg);
		}
		100% {
			opacity: 0;
			transform: translate(0%) rotateY(90deg);
		}
	}
	@keyframes skipping-back {
		0% {
			opacity: 0;
			transform: translate(0%) rotateY(-90deg);
		}
		50% {
			opacity: 0;
			transform: translate(0%) rotateY(-90deg);
		}
		51% {
			opacity: 1;
			transform: translate(0%) rotateY(-90deg);
		}
		100% {
			transform: translate(0%) rotateY(90deg);
		}
	}
	@keyframes skipping-move {
		0% {
			left: 20%;
		}
		100% {
			left: 60%;
		}
	}

	@keyframes trip-color {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(90deg);
		}
	}

	&[data-ex='gkgurashi'] {
		#bg {
			animation: trip-color 120s linear both;
		}
	}

	&[data-ex='issyuukanfr'] {
		#mask {
			display: block;
			background: #fff;
			animation: appear-anim-part 180s cubic-bezier(0.18, 0.89, 0.32, 1.28) both;
			mask-image: linear-gradient(
				rgba(0, 0, 0, 0),
				rgba(0, 0, 0, 1),
				rgba(0, 0, 0, 1),
				rgba(0, 0, 0, 1)
			);
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
	#cog-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		opacity: 0;
		animation: appear-anim 1s linear ${animStart}s both;
		z-index: -3;
	}
	.cog {
		position: absolute;

		/* border: solid 1px black; */
		background: url(/static/cog.svg);
		pointer-events: none;
		opacity: 0.7;

		&#cog1 {
			width: 400vmax;
			height: 400vmax;
			top: -40vmax;
			left: -140vmax;
			animation: cog-spin 300s linear infinite;
			opacity: 1;
		}
		&#cog2 {
			width: 40vmax;
			height: 40vmax;
			top: -10vmax;
			right: -20vmax;
			animation: cog-spin 10s ease-in-out infinite;
			background: url(/static/cog2.svg);
		}
		&#cog3 {
			width: 100vmax;
			height: 100vmax;
			top: -80vmax;
			left: 0vmax;
			animation: cog-spin 100s linear infinite;
			background: url(/static/cog2.svg);
		}
		&#cog4 {
			width: 100vmax;
			height: 100vmax;
			top: 50vmax;
			left: -50vmax;
			animation: cog-spin 100s ease-in-out infinite;
			background: url(/static/cog3.svg);
		}
		&#cog5 {
			width: 150vmax;
			height: 150vmax;
			top: 25vmax;
			left: -75vmax;
			animation: cog-spin 50s linear infinite reverse;
			background: url(/static/cog3.svg);
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
	@keyframes cog-spin {
		0% {
			opacity: 0.3;
			transform: rotate(0deg);
		}
		50% {
			opacity: 0.8;
		}
		100% {
			opacity: 0.3;
			transform: rotate(-360deg);
		}
	}

	&[data-ex='steinsgate'] #bg > div {
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
			animation: glitch-before 3s linear infinite alternate both;
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
			animation: rgb-shift-r 3s steps(1, jump-end) infinite alternate both;
			&::before {
				background: #f00;
			}
		}
		.g {
			animation: rgb-shift-g 3s steps(1, jump-end) infinite alternate both;
			&::before {
				background: #0f0;
			}
		}
		.b {
			animation: rgb-shift-b 3s steps(1, jump-end) infinite alternate both;
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

	${['r', 'g', 'b'].map((k) => genAnimationRgbShift(k))}
	${genAnimationGlitch('before')}
	${genAnimationGlitch('after')}

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

	&[data-ex='sao'] {
		.link-sao {
			display: block !important;
			text-decoration: underline;
			cursor: not-allowed;
			color: #888;
		}
		.link-hist {
			display: none;
		}
	}
`

function genAnimationRgbShift(name) {
	return css`
		@keyframes rgb-shift-${name} {
			${range(frequency).map(
				(p) => css`
					${p * interval * 100}% {
						transform: translate(${rand(-2, 2)}%, ${rand(-0.5, 0.5)}%);
						opacity: 1;
					}
				`
			)}

			${duration * 100}%,
			100% {
				opacity: 0;
				transform: none;
			}
		}
	`
}

function genAnimationGlitch(name: string) {
	return css`
		@keyframes glitch-${name} {
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

			${duration * 100}%,
			100% {
				clip-path: none;
				transform: none;
			}
		}
	`
}
