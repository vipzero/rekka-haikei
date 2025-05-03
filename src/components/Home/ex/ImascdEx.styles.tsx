import { css, keyframes } from 'styled-components'

// clockSpinアニメーションをexStyles.tsxから移植
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

// exStyles.tsxからimascdスタイルを移植
export const imascdStyles = css`
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
`
