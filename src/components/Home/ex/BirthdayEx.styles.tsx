import { css } from 'styled-components'

export const birthdayExStyles = css`
	&[data-theme='choco'] {
		--ex-color: #311;
		--font-color: #ffc627;
		--panel-fo: #ffe697;
		--panel-fo-shadow-color: #000;
		--btn-fo-color: black;
		--setting-bg-color: #311;
		--content-bg-color: #795548;
		--content-bg-color-alpha: #795548ee;
		--deb-bg: #795548ee;
		--btn-bg-color: #ffe;
		--btn-fo-checked-color: var(--btn-fo-color);
		--btn-bg-checked-color: #dda;

		--bingo-bg-color: #333;
		--bingo-bg-hit-color: #ffe697;
		--deb-fo: #dda; // デバッグ背景

		--btn-bo: var(--ex-color);
		--btn-bo-checked: var(--ex-color);

		#timebar {
			.wrap {
				background: #ffa;
			}
			.fill {
				background: var(--sb-bg);
			}
			.pointer {
				background-color: green;
			}
		}
	}
`
