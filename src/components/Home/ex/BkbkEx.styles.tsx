import { css, keyframes } from 'styled-components'
import { zIndex } from '../../../config'

const up = keyframes`
  100% {
    transform: translateY(-100vh);
  }
`

export const bkbkStyles = css`
	/* from exStyles.tsx: &[data-ex='bkbk'] */
	position: absolute;
	right: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden; /* Added to contain bubbles */

	/* Bubbles */
	.bubbles {
		z-index: ${zIndex.layerFrontEx};
		position: absolute;
		bottom: 0;
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
