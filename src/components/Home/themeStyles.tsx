import { css } from 'styled-components'

export const themeStyles = css`
	& {
		--font-color: black;
		--panel-fo-color: #ccc;
		--panel-fo-shadow-color: #000;
		--btn-fo-color: black;
		--setting-bg-color: #aaa;
		--content-bg-color: #aaa;
		--deb-bg-color: #333;
		--btn-bg-color: #efefef;
		--btn-bg-checked-color: #999;

		--bingo-bg-color: #ccc;
		--bingo-bg-hit-color: #e85;
		--alpha: 1;
	}
	&[data-theme='0'] {
		--content-bg-color: transparent;
	}
	&[data-theme='1'] {
		--setting-bg-color: #eee;
		--content-bg-color: #eee;
		--alpha: 0.5;
	}
	&[data-theme='2'] {
		--font-color: #fff;
		--btn-fo-color: #fff;
		--setting-bg-color: #000;
		--content-bg-color: #000;
		--btn-bg-color: #000;
		--btn-bg-checked-color: #333;
		--bingo-bg-color: #333;
		--bingo-bg-hit-color: #88f;
		--alpha: 0.5;
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

	/* pre setup */
	&[data-shape='0'] {
	}
	&[data-shape='1'] {
		--alpha: 1;
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
