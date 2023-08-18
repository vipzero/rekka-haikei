import { css } from 'styled-components'
import { exStyles } from './ex/exStyles'

export const themeStyles = css`
	& {
		--font-color: black;
		--panel-fo-color: #ccc;
		--panel-fo-shadow-color: #000;
		--btn-fo-color: black;
		--content-bg-color: #aaa;
		--setting-bg-color: #aaa;
		--deb-bg-color: #333;
		--btn-bg-color: #efefef;
		--btn-bg-checked-color: #999;

		--bingo-bg-color: #ccc;
		--bingo-bg-hit-color: #e85;
		--co-pad: 12px;
	}
	&[data-theme='0'] {
		--content-bg-color: transparent;
	}
	&[data-theme='1'] {
		--content-bg-color: #eee;
		--content-bg-color-alpha: #eee8;
		--setting-bg-color-alpha: #aaaa;
		--panel-fo-color-non-shadow: #58585a;
	}
	&[data-theme='2'] {
		--font-color: #fff;
		--btn-fo-color: #fff;
		--content-bg-color: #000;
		--setting-bg-color-alpha: #0008;
		--setting-bg-color: #888;
		--content-bg-color-alpha: #0008;
		--btn-bg-color: #000;
		--btn-bg-checked-color: #333;
		--bingo-bg-color: #333;
		--bingo-bg-hit-color: #88f;
	}
	${exStyles}

	/* pre setup */
	& {
		--co-bg: var(--content-bg-color-alpha, --content-bg-color);
		--sb-bg: var(
			--setting-bg-color-alpha,
			var(--setting-bg-color, --content-bg-color-alpha)
		);
		--btn-bg: var(--btn-bg-color);
	}
	&[data-shape='0'] {
	}
	&[data-shape='1'] {
		--co-bg: var(--content-bg-color);
		--sb-bg: var(--setting-bg-color, --content-bg-color-alpha);

		--co-pad: 4px 8px;
		--panel-fo-color: var(--panel-fo-color-non-shadow, --panel-fo-color);
	}
`

export const shapeStyles = css`
	&[data-shape='0'] {
	}
	&[data-shape='1'] {
		.animetitle,
		#title {
			font-size: 0.8rem;

			/* color: var(--panel-fo-color); */
			text-shadow: none;
		}
		#main-box {
			padding: 8px;
		}
		#artwork img {
			margin-top: 4px;
			width: 100px;
		}
		#panel {
			border-radius: 0;
			.songinfo-icon {
				display: none;
				filter: none;
			}
		}
		.flex-rows > *:not(:first-child) {
			margin-left: 0;
		}
		[data-co] {
			width: max-content;
			width: max-width;
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
	&[data-shape='2'] {
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
	&[data-shape='3'] {
		#panel,
		[data-co] {
			visibility: hidden;
		}
	}
`
