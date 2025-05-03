import { css } from 'styled-components'

export const mtsExStyles = css`
	&[data-theme='cyberpunk'] {
		--ex-color: #faee51;
		--font-color: #2b4e34;
		--btn-fo-color: var(--ex-color);
		--btn-bg-color: black;
		--btn-fo-checked-color: #000;
		--btn-bg-checked-color: #82db6bff;
		--font-color: #000;
		--content-bg-color-alpha: linear-gradient(
			326deg,
			#080f1bee 10%,
			#15283aee 90%
		);
		--content-bg-color: #091624;
		/* --setting-bg-color: #fff; */
		--setting-bg-color: linear-gradient(to bottom, #faee51 40%, #faee5100 100%);
		--content-bg-color-alpha: #15283aaa;
		--panel-fo: #faee51;
		--panel-fo-color: #82db6bff;
		--panel-fo-shadow-color: #00790b;

		--btn-bo: var(--ex-color);
		--btn-bo-checked: var(--ex-color);

		--deb-fo: #b70000;
		/* dark red great gradation  */
		--deb-bg: radial-gradient(circle at 50% 50%, #220000bf 0%, #530000 100%);
		button.book {
		}
		#panel {
			border-radius: 0;
			/* background-image: linear-gradient(326deg, #67084bbb 0%, #1a0245bb 74%); */
		}
	}
`
