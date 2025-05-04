import { css } from 'styled-components'

export const flipStyles = css`
	&[data-ex='flip'] {
		#bg {
			transform: rotateY(180deg);
		}
		#setting-box {
			transform: rotateY(180deg);
		}
	}
`
