import { css } from 'styled-components'

export const gamingStyles = css`
	&[data-ex='gaming'] {
		#mask {
			display: block;
			opacity: 0.9;
			animation: rainbow-anim-frame 20s linear infinite alternate;
			background: #0004;
		}
	}
	/* #setting-box {
	box-shadow: 0px 0px 2px 10px rgba(0, 255, 68, 0.3);
} */
`
