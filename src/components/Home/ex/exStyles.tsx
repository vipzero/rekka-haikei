import { css } from 'styled-components'
import { rainbows } from '../../../util'
import { ariascarletStyles } from './AriaScarletEx.styles'
import { flipStyles } from './FlipEx.styles'
import { gamingStyles } from './GamingEx.styles'
import { issyuukanfrStyles } from './IssyuukanfrEx.styles'
import { moveExStyles } from './MoveEx.styles'
import { offlineStyles } from './OfflineEx.styles'
import { paraparaStyles } from './ParaparaEx.styles'
import { rainbowStyles } from './RainbowEx.styles'
import { sakasaStyles } from './SakasaEx.styles'
import { saoStyles } from './SaoEx.styles'
import { spinStyles } from './SpinEx.styles'
import { steinsGateStyles } from './SteinsGateEx.styles'
import { susuStyles } from './SusuEx.styles'
import { gkgurashiStyles } from './GkgurashiEx.styles'
import { chimaruStyles } from './ChimaruEx.styles'

const toPar100 = (i, total) => Math.round((100 / (total - 1)) * i)
const makeAnim = (key: string, vals: string[]) =>
	vals.map((v, i) => `${toPar100(i, vals.length)}% { ${key}: ${v}}`).join('\n')

const randAnimsCss = [...Array(20).keys()]
	.map(
		(i) => `
			span:nth-of-type(${i + 1}),a:nth-of-type(${i + 1}) {
				animation-delay: ${(i * 7) % 10}s;
			}
			`
	)
	.join('\n')

export const exStyles = css`
	${randAnimsCss}

	@keyframes rainbow-anim {
		${makeAnim('background', rainbows)}
	}
	@keyframes rainbow-anim-frame {
		${rainbows
			.map(
				(color, i) => `${toPar100(i, rainbows.length)}% {
			box-shadow: 0 0 .5rem .5rem ${color} inset;
		}`
			)
			.join('\n')}
	}

	@keyframes trip-color {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(90deg);
		}
	}

	&[data-ex='steinsgate'] {
		#timebar > .wrap {
			transform-origin: 0 0;
			animation: spin-y 10s cubic-bezier(0.28, 1.61, 0.7, -0.71) infinite
				alternate;
		}
	}

	@keyframes spin-y {
		0% {
			transform: rotateY(90deg);
		}
		100% {
			transform: rotateY(0deg);
		}
	}
	@keyframes aurora-anim {
		0% {
			background: #e700fc88;
		}
		20% {
			background: transparent;
		}
		40% {
			background: #ffa8;
		}
		60% {
			background: transparent;
		}
		80% {
			background: #fff8;
		}
		100% {
			background: transparent;
		}
	}

	@keyframes appear-anim {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes appear-anim-part {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.9;
		}
	}

	${steinsGateStyles}
	${ariascarletStyles}
	${sakasaStyles}
	${rainbowStyles}
	${gamingStyles}
	${offlineStyles}
	${moveExStyles}
	${paraparaStyles}
	${flipStyles}
	${spinStyles}
	${susuStyles}
	${saoStyles}
	${issyuukanfrStyles}
	${gkgurashiStyles}
	${chimaruStyles}
`
