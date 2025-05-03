import { css } from 'styled-components'

export const rainExStyles = css`
	&[data-theme='diy'] {
		--ex-color: #3cb2e5;
		--font-color: #f47d4c;
		--btn-fo-color: #ff5722;
		--btn-bg-color: #ffccb6;
		--btn-fo-checked-color: #000;
		--btn-bg-checked-color: #ff9800;
		--font-color: #000;
		--content-bg-color-alpha: linear-gradient(
			326deg,
			#0b81a944 10%,
			#b6842833 90%
		);
		--content-bg-color: #091624;
		/* --setting-bg-color: #fff; */
		--setting-bg-color: linear-gradient(
				90deg,
				rgba(208, 147, 82, 0.6),
				rgba(192, 134, 70, 0.6) 60%,
				rgba(208, 147, 82, 0.6)
			),
			repeating-radial-gradient(
				ellipse at 60% 500%,
				#c08646,
				#c08646 0.2%,
				#d09352 0.6%,
				#d09352 1%
			);
		/* --content-bg-color-alpha: #15283aaa; */
		--panel-fo: #f47d4c;
		--panel-fo-color: #fff;
		--panel-fo-shadow-color: #fff;

		--btn-bo: #fff;
		--btn-bo-checked: var(--ex-color);

		#panel {
			font-family: 'Yusei Magic', -apple-system, BlinkMacSystemFont,
				'Helvetica Neue', 'Segoe UI', 'Noto Sans Japanese',
				'ヒラギノ角ゴ ProN W3', Meiryo, sans-serif;
		}
		#panel:not([data-shape='1']) #title {
			text-shadow: 1px 1px 1px var(--panel-fo-shadow-color),
				-1px -1px 1px var(--panel-fo-shadow-color),
				-1px 1px 1px var(--panel-fo-shadow-color),
				1px -1px 1px var(--panel-fo-shadow-color), 4px 4px 1px var(--ex-color);

			/* background-image: linear-gradient(326deg, #67084bbb 0%, #1a0245bb 74%); */
		}
		#setting-box {
		}
	}
`
