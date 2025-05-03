import { css, keyframes } from 'styled-components'

const up = keyframes`
  100% {
    transform: translateY(-100vh);
  }
`

// plasma keyframes seems unused in the original #bkbk style block,
// but including it here for completeness if needed later.
const plasma = keyframes`
  0% {
    transform: scale(6) translate3d(20px, 0, 0);
  }
  50% {
    transform: scale(1) translate3d(-60px, 0, 0);
  }
  100% {
    transform: scale(6) translate3d(20px, 0, 0);
  }
`

export const bkbkStyles = css`
	/* from exStyles.tsx: &[data-ex='bkbk'] */
	position: absolute;
	right: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	border: solid 1px orange; /* Keep or remove border? */
	overflow: hidden; /* Added to contain bubbles */

	/* Bubbles */
	.bubbles {
		position: absolute;
		bottom: 0;
		/* z-index: 5; */
		margin-right: 50px; /* This might need adjustment */
		background-color: white;
		border-radius: 50%;
		/* opacity: 0.5; */ /* Opacity is set inline */
		width: 40px; /* Base width, scale is applied inline */
		height: 40px; /* Base height, scale is applied inline */
		animation-name: ${up}; /* Animation name applied */
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		/* animation-duration is set inline */
		/* transform is set inline */
	}
`
