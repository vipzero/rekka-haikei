import { css } from 'styled-components'

export const shanimasStyles = css`
	#mask {
		display: block;
		opacity: 0.5;
		animation: rainbow-anim 20s linear infinite alternate;
		mask-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
	}
`
