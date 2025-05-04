import { css } from 'styled-components'

export const moveExStyles = css`
	&[data-ex='move'] {
		@keyframes bpos {
			0% {
				background-position-x: 0;
			}
			100% {
				background-position-x: var(--bg-w);
			}
		}
		#bg-img {
			animation: bpos 20s linear infinite;
		}
	}
`
