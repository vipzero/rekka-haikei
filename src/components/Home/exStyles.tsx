import { css, keyframes } from 'styled-components'

const spin = keyframes`
0% {
	transform: rotate(0deg);
}
100% {
	transform: rotate(360deg);
}
`

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
		&[data-ex='lain'] {
			* {
				color: red !important;
			}
		}

		&[data-ex='kokaku'] {
			div {
				border-bottom: solid 1px #0385f4;
				background: #00aaaa33;
			}
			p,
			span,
			a {
				color: #0385f4 !important;
				animation-name: noiseBlink;
				/* background: #1008 !important; */
			}

			cursor: url(/static/sac-min.png) 25 25, auto;
		}

		&[data-ex='psychopass'] {
			div {
				border-bottom: solid 1px #12e0ad;
				background: #092b0933;
			}
			p,
			span,
			a {
				color: #12e0ad !important;
				animation-name: noiseBlink;
			}
		}

		${randAnimsCss}
	}
	&[data-ex='spin'] {
		.album img {
			animation: ${spin} 5s linear infinite;
			&:hover {
				animation-name: none;
			}
		}
	}
	&[data-ex='rakupro'] {
		#mask {
			display: block;
			opacity: 0.5;
			background: linear-gradient(45deg, #e700fc, #fffa, #e700fc, #fffa)
				repeat-x;

			background-size: 400% 400%;
			animation: bggradient 5s linear infinite;
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
`
