import { css, keyframes } from 'styled-components'

// fontInflareアニメーションをexStyles.tsxから移植
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

// exStyles.tsxから3sha3yoスタイルを移植
export const sha3yoStyles = css`
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
`
