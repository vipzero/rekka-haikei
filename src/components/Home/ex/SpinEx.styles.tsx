import { css } from 'styled-components'

export const spinStyles = css`
	#artwork img {
		animation: spin 5s linear infinite;
		&:hover {
			animation-name: none;
		}
	}

	&[data-has-art='false'] {
		#bg > div {
			animation: spin 60s linear infinite;
		}
	}
`
