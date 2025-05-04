import { css } from 'styled-components'

export const paraparaStyles = css`
	&[data-ex='parapara'] {
		#mask {
			display: block;
			width: 50vw;
			background: black;
		}
		&[data-show-setting='true'] {
			#mask {
				left: 50vw;
			}
		}
	}
`
