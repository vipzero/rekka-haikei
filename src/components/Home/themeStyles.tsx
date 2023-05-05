import { css } from 'styled-components'

export const themeStyles = css`
	& {
		--font-color: black;
		--panel-fo-color: #ccc;
		--panel-fo-shadow-color: #000;
		--btn-fo-color: black;
		--setting-bg-color: #aaa;
		--content-bg-color: transparent;
		--sub-bg-color: #333;
		--btn-bg-color: rgb(239, 239, 239);
		--btn-bg-checked-color: #999;

		--bingo-bg-color: #ccc;
		--bingo-bg-hit-color: #e85;
	}
	&[data-theme='1'] {
		--setting-bg-color: rgba(255, 255, 255, 0.5);
		--content-bg-color: rgba(255, 255, 255, 0.5);
	}
	&[data-theme='2'] {
		--font-color: white;
		--btn-fo-color: white;
		--setting-bg-color: rgba(0, 0, 0, 0.5);
		--content-bg-color: rgba(0, 0, 0, 0.5);
		--btn-bg-color: black;
		--btn-bg-checked-color: #333;
		--bingo-bg-color: #333;
		--bingo-bg-hit-color: #88f;
	}
	&[data-theme='3'] {
		#panel,
		[data-co] {
			visibility: hidden;
		}
	}
	&[data-theme='4'] {
		[data-co] {
			visibility: hidden;
		}
		#panel {
			> * {
				visibility: hidden;
			}
			.titles {
				visibility: visible;
			}
		}
	}
`
