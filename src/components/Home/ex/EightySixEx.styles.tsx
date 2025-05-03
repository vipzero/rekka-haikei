import { css } from 'styled-components'

export const eightysixExStyles = css`
	&[data-theme='eightysix'] {
		--ex-color: #222; /* 深い黒、純黒より柔らかい */
		--font-color: #f5f5f5; /* 柔らかい白（真っ白すぎず） */
		--btn-fo-color: #bbb; /* 灰色寄り、控えめなボタン文字色 */
		--btn-bg-color: #111; /* ほぼ黒、やや柔らかい背景色 */
		--btn-fo-checked-color: var(--btn-fo-color); /* チェック時も同じく控えめ */
		--btn-bg-checked-color: #333; /* 選択されたときだけ少し明るく */

		--content-bg-color: #111111; /* 全体背景も黒寄り */
		--setting-bg-color: black; /* 完全な黒背景 */

		--content-bg-color-alpha: linear-gradient(
			to bottom,
			#fafcff 0%,
			#e3edf7cc 40%,
			#bcd0e822 74%
		);

		--panel-fo-color: #e5ebf1;
		--panel-fo-shadow-color: #5fa8d3;

		--deb-bg: #f5f6f7ee; /* デバッグ背景 */
		--deb-fo: #6a040f; /* デバッグ文字色、赤寄り */

		--btn-bo: var(--ex-color);
		--btn-bo-checked: var(--ex-color);
		#panel {
			position: relative;
			background: var(--content-bg-color-alpha);
			background-image: radial-gradient(
					circle,
					rgba(0, 0, 0, 0.02) 1px,
					transparent 1px
				),
				radial-gradient(circle, rgba(0, 0, 0, 0.015) 1px, transparent 1px),
				var(--co-bg);
			background-size: cover, cover, cover;
			background-blend-mode: overlay, overlay, normal;
			border-radius: 0 !important;
			padding: 1.5rem;
			overflow: hidden;
			z-index: 0;
		}
		#panel::before,
		#panel::after {
			content: '';
			position: absolute;
			width: 10px;
			height: calc(100% - 0px);
			top: 0px;
			bottom: 0px;
			background: none;
		}

		#panel::before {
			left: 0;
			border-left: 2px solid #111;
			border-top: 2px solid #311; /* 小さな横棒 */
			border-bottom: 2px solid #311; /* 小さな横棒 */
		}

		#panel::after {
			right: 0;
			border-right: 2px solid #111;
			border-top: 2px solid #311;
			border-bottom: 2px solid #311;
		}
	}
`
