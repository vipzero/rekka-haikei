import { css } from 'styled-components'

// exStyles.tsxからofflineスタイルを移植
export const offlineStyles = css`
	&[data-ex='offline'] {
		#bg {
			filter: grayscale(100%);
		}
	}
`
