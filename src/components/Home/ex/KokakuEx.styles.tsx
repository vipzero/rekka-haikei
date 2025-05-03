import { css } from 'styled-components'

export const kokakuExStyles = css`
	&[data-theme='kokaku'] {
		--ex-color: #0385f4;
		--font-color: #b8deff;
		--btn-fo-color: var(--ex-color);
		--btn-bg-color: #fff;
		--btn-fo-checked-color: var(--btn-fo-color);
		--btn-bg-checked-color: #b8deff;
		--setting-bg-color: rgba(255, 255, 255, 0.5);
		--deb-fo: #0385f4; // デバッグ背景

		--btn-bo: var(--ex-color);
		--btn-bo-checked: var(--ex-color);

		div {
			border-bottom: solid 1px var(--ex-color);
			margin-bottom: -1px;
			background: #a2c0c033;
		}

		#setting-box {
			p,
			span,
			a {
				color: var(--ex-color);
			}
		}

		/* cursor: url(/static/sac-min.png) 25 25, auto; */
		&[data-ex='kokaku'] {
			/* ee が発動している */
			cursor: none;

			p,
			span,
			a {
				animation-name: noiseBlink;
			}

			#kokaku-pointer {
				pointer-events: none;
				animation: spin 10s linear infinite;
			}
		}
	}
`
