import { css } from 'styled-components'

export const pcyhopassExStyles = css`
	&[data-theme='psychopass'] {
		--ex-color: #13e0ad;
		--font-color: var(--ex-color);
		--btn-fo-color: var(--ex-color);
		--btn-bg-color: #15353b;
		--btn-fo-checked-color: var(--btn-fo-color);
		--btn-bg-checked-color: black;
		--font-color: white;
		--setting-bg-color: rgba(0, 0, 0, 0.5);
		--deb-fo: #13e0ad; // デバッグ背景

		--btn-bo: var(--ex-color);
		--btn-bo-checked: var(--ex-color);

		div {
			border-bottom: solid 1px var(--ex-color);
			margin-bottom: -1px;
			background: #092b0933;
		}
		p,
		span,
		a {
			color: var(--ex-color);
		}

		&[data-ex='psychopass'] {
			p,
			span,
			a {
				color: var(--ex-color);
				animation-name: noiseBlink;
			}
		}
	}
`
