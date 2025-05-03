import { css } from 'styled-components'

export const masshiroExStyles = css`
	&[data-theme='yojitsu'] {
		--font-color: white;
		--panel-fo: white;
		--panel-fo-shadow-color: transparent;
		--btn-fo-color: white;
		--setting-bg-color: #373f4f;
		/* #616F84 */
		--content-bg-color: #373f4f;
		--content-bg-color-alpha: #373f4faa;
		--deb-bg: #373f4f;
		--btn-bg-color: #373f4f;
		--btn-fo-checked-color: var(--btn-fo-color);
		--btn-bg-checked-color: #616f84;
		--btn-bo: #cacaca;
		--btn-bo-checked: #848484;

		--bingo-bg-color: #ccc;
		--bingo-bg-hit-color: #9eece4;

		--btn-bo: transparent;
		--btn-bo-checked: transparent;

		#panel {
			box-shadow: 0 0 0 4px #b4ece6, 0 0 0 20px #616f84;
			border-radius: 0;
		}
		#panel,
		.co-panel {
			p,
			a {
				text-shadow: 0 0 2px white;
			}

			#title {
				color: #75eade;
				text-shadow: 0 0 1px #9eece4, 0 0 6px var(--deb-bg);
			}
		}
		#setting-box {
			button {
				border-radius: 0;
				border: solid 1px #b4ece6;
			}
		}
		#main-box {
			gap: 2rem;
		}
		&[data-ex='yojitsu'] {
			#yrings {
				position: absolute;
				right: 0;
				top: 0;
			}
		}
	}
`
