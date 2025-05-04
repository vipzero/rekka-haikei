import { css } from 'styled-components'

export const issyuukanfrStyles = css`
	&[data-ex='issyuukanfr'] {
		#mask {
			display: block;
			background: #fff;
			animation: appear-anim-part 180s cubic-bezier(0.18, 0.89, 0.32, 1.28) both;
			mask-image: linear-gradient(
				rgba(0, 0, 0, 0),
				rgba(0, 0, 0, 1),
				rgba(0, 0, 0, 1),
				rgba(0, 0, 0, 1)
			);
		}
	}
`
