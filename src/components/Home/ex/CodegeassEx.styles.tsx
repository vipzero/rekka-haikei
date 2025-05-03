import { css } from 'styled-components'

export const codegeassExStyles = css`
	&[data-theme='codegeass'] {
		--ex-color: #3c13e0;
		--font-color: #6f5dbb;
		--btn-fo-color: #dcd3ff;
		--btn-bg-color: #140d51;
		--btn-fo-checked-color: var(--btn-fo-color);
		--btn-bg-checked-color: black;
		--font-color: white;
		--content-bg-color: #050033;
		--setting-bg-color: var(--content-bg-color);
		--content-bg-color-alpha: #1a0245bb;
		--content-bg-color-alpha: linear-gradient(
			123deg,
			#1a0245ff 0%,
			#67084b88 40%,
			#67084b00 74%
		);
		--panel-fo-color: black;
		--panel-fo-shadow-color: #6f5dbb;

		--btn-bo: var(--ex-color);
		--btn-bo-checked: var(--ex-color);

		/* --deb-fo: #fff; // デバッグ背景 */
		button.book {
			color: red;
		}
		#panel {
			border-radius: 0;
			/* background-image: linear-gradient(326deg, #67084bbb 0%, #1a0245bb 74%); */
		}
	}
`
