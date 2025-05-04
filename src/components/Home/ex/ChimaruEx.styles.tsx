import { css } from 'styled-components'

export const chimaruStyles = css`
	@keyframes bpos {
		0% {
			background-position-x: var(--bg-w);
		}
		100% {
			background-position-x: 0;
		}
	}
	@keyframes bposc {
		0% {
			transform: translateX(80%);
		}
		100% {
			transform: translateX(0%);
		}
	}
	&[data-ex='chimaru'] {
		#bg-img {
			animation: bpos var(--song-time) linear infinite;
		}
		#main-box {
			position: absolute;
			animation: bposc var(--song-time) linear infinite;
		}

		#timebar {
			.wrap {
				height: 8px;
			}
			.fill {
				background: #222288;
				width: 50vw !important;
			}
			.pointer {
				background: #ff0 !important;
			}
		}
	}
`
