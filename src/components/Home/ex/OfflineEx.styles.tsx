import { css } from 'styled-components'

// exStyles.tsxからofflineスタイルを移植
export const offlineStyles = css`
	#offline {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
	}

	#bg {
		filter: grayscale(100%);
	}
`
