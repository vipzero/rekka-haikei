import styled from 'styled-components'
import { rainbows } from '../util'

export const FloatingBox = styled.div`
	width: 3vw;
	height: 4vw;
	fill: #60b99a;
	animation: 3.5s roll ease-in-out infinite;
	> * {
		display: block;
		animation: floatHorizontal 7s ease-in-out infinite alternate;
	}
	  img {
		animation: floatVertical 6s ease-in-out infinite alternate;
	}

	@keyframes roll {
		0% {
			transform: rotateZ(15deg) scale(0.9);
		}
		50% {
			transform: rotateZ(-15deg) scale(1);
		}
		100% {
			transform: rotateZ(15deg) scale(0.9);
		}
	}
	@keyframes floatHorizontal {
		0% {
			transform: translate3d(2.5vw, 0, 0);
		}
		50% {
			transform: translate3d(-2.5vw, 0, 0);
		}
		100% {
			transform: translate3d(2.5vw, 0, 0);
		}
	}
	@keyframes floatVertical {
		0% {
			transform: translate3d(0, 2.5vw, 0);
		}
		50% {
			transform: translate3d(0, -2.5vw, 0);
		}
		100% {
			transform: translate3d(0, 2.5vw, 0);
		}
	}
`

export const RainbowFont = styled.div`
	> a {
		color: #acb6e5;

		background: linear-gradient(-45deg, ${rainbows.join(',')});
		font-size: 1.5rem;

		-webkit-background-clip: text;
		color: transparent !important;
	}
`

export const RainbowFontCool = styled.div`
	> a {
		color: #acb6e5;

		background: linear-gradient(45deg, aqua, blue, blue, purple);
		font-size: 1.5rem;

		-webkit-background-clip: text;
		color: transparent !important;
	}
`
