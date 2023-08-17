import { css } from 'styled-components'
import { exStyles } from './ex/exStyles'

export const themeStyles = css`
	& {
		--font-color: black;
		--panel-fo-color: #ccc;
		--panel-fo-shadow-color: #000;
		--btn-fo-color: black;
		--content-bg-color: #aaa;
		--deb-bg-color: #333;
		--btn-bg-color: #efefef;
		--btn-bg-checked-color: #999;

		--bingo-bg-color: #ccc;
		--bingo-bg-hit-color: #e85;
	}
	&[data-theme='0'] {
		--content-bg-color: transparent;
	}
	&[data-theme='1'] {
		--content-bg-color: #eee;
		--content-bg-color-alpha: #eee8;
		--setting-bg-color-alpha: #aaaa;
	}
	&[data-theme='2'] {
		--font-color: #fff;
		--btn-fo-color: #fff;
		--content-bg-color: #000;
		--content-bg-color-alpha: #0008;
		--btn-bg-color: #000;
		--btn-bg-checked-color: #333;
		--bingo-bg-color: #333;
		--bingo-bg-hit-color: #88f;
	}
	&[data-theme='3'] {
		#panel,
		[data-co] {
			visibility: hidden;
		}
	}
	&[data-theme='4'] {
		[data-co] {
			visibility: hidden;
		}
		#panel {
			> * {
				visibility: hidden;
			}
			#title {
				visibility: visible;
			}
		}
	}
	${exStyles}

	/* pre setup */
	& {
		--setting-bg-color: var(--setting-bg-color, --content-bg-color);

		/* --content-bg-color-alpha: var(--content-bg-color-alpha, --content-bg-color); */
		/* --setting-bg-color-alpha: var(
			--setting-bg-color-alpha,
			--content-bg-color-alpha
		); */

		--co-bg: var(--content-bg-color-alpha, --content-bg-color);
		--sb-bg: var(
			--setting-bg-color-alpha,
			var(--content-bg-color-alpha, --setting-bg-color)
		);
		--btn-bg: var(--btn-bg-color);
	}
	&[data-shape='0'] {
	}
	&[data-shape='1'] {
		#title {
			font-size: 1rem;

			/* color: var(--panel-fo-color); */
			text-shadow: none;
		}
		#panel {
			p,
			a {
				text-shadow: none;
			}
		}
		p,
		a {
			text-shadow: none;
		}
	}
`

export const shapeStyles = css`
	&[data-shape='0'] {
	}
	&[data-shape='1'] {
		#title {
			font-size: 1rem;

			/* color: var(--panel-fo-color); */
			text-shadow: none;
		}
		#panel {
			p,
			a {
				text-shadow: none;
			}
		}
		p,
		a {
			text-shadow: none;
		}
	}
`
