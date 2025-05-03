import { css } from 'styled-components'

export const ariascarletStyles = css`
	/* スタイルを exStyles.tsx から移植 */
	position: relative;

	/* タイムバーのスタイリング */
	#timebar {
		.fill {
			background-color: red;
		}
		.pointer {
			mask-image: url(/static/bullet.svg);
			mask-mode: alpha;
			mask-size: 16px 8px;
			background: conic-gradient(at 0% 30%, red 10%, yellow 19%, #ff5722 45%);
			transform: rotateY(180deg);
			position: relative;
			top: -2px;
			left: -2px;

			width: 16px;
			height: 8px;
		}
	}
`
