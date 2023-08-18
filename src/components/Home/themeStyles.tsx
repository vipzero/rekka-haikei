import { css } from 'styled-components'
import { exStyles } from './ex/exStyles'

export const themeStyles = css`
	& {
		--font-color: black;
		--panel-fo: #eee;
		--panel-fo-shadow-color: #000;
		--btn-fo-color: black;
		--content-bg-color: #aaa;
		--setting-bg-color: #aaa;
		--btn-bg-color: #efefef;
		--btn-bg-checked-color: #999;

		--bingo-bg-color: #ccc;
		--bingo-bg-hit-color: #e85;
		--co-pad: 12px;

		--deb-bg: #eee;
		--deb-fo: #333;
	}
	&[data-theme='0'] {
		--content-bg-color: transparent;
	}
	&[data-theme='1'] {
		--content-bg-color: #eee;
		--content-bg-color-alpha: #eee8;
		--setting-bg-color-alpha: #aaaa;
		--panel-fo-non-shadow: #58585a;
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
		--deb-bg: #111;
		--deb-fo: #eee;
	}
	${exStyles}

	/* pre setup */
	& {
		--co-bg: var(--content-bg-color-alpha, var(--content-bg-color));
		--sb-bg: var(
			--setting-bg-color-alpha,
			var(--setting-bg-color, var(--content-bg-color-alpha))
		);
		--btn-bg: var(--btn-bg-color);
	}
	&[data-shape='0'] {
	}
	&[data-shape='1'] {
		--co-bg: var(--content-bg-color);
		--sb-bg: var(--setting-bg-color, var(--content-bg-color-alpha));

		--co-pad: 4px 8px;
		--panel-fo: var(--panel-fo-non-shadow);
	}
`

export const shapeStyles = css`
	&[data-shape='0'] {
	}
	&[data-shape='1'] {
		.animetitle,
		#title {
			font-size: 0.8rem;

			/* color: var(--panel-fo); */
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
			max-width: calc(100vw - 8px * 2);
			background: var(--content-bg-color-alpha, var(--content-bg-color));
		}
		&:not([data-theme='0']) {
			#title,
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
	}
	&[data-shape='2'] {
		[data-co] {
			display: none;
		}
		#panel {
			> * {
				display: none;
			}
			#title {
				display: block;
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
