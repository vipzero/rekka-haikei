import { css } from 'styled-components'

export const susuStyles = css`
	&[data-ex='susu'] {
		#panel-shadow {
			display: block;
			box-shadow: 0 0 20px 12px var(--panel-fo-shadow-color);
			filter: url(#wavy) blur(1px);
			margin: -20px;
		}
		#panel {
			overflow: visible;
		}
		#panel,
		.co-panel {
			p,
			a {
				text-shadow: 4px 4px 0 #000, 1px 1px 1px var(--panel-fo-shadow-color),
					-1px -1px 1px var(--panel-fo-shadow-color),
					-1px 1px 1px var(--panel-fo-shadow-color),
					1px -1px 1px var(--panel-fo-shadow-color);
			}
		}
	}
`
