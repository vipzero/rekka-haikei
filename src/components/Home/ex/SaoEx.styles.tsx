import { css } from 'styled-components'

export const saoStyles = css`
	&[data-ex='sao'] {
		.link-sao {
			display: block !important;
			text-decoration: underline;
			cursor: not-allowed;
			color: #888;
		}
		.link-hist {
			display: none;
		}
	}
`
