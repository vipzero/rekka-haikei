import { css } from 'styled-components'

export const themeStyles = css`
	& {
		--font-color: black;
		--setting-bg-color: #aaa;
		--content-bg-color: transparent;
		--sub-bg-color: #333;
		--btn-bg-color: rgb(239, 239, 239);
		--btn-bg-checked-color: #999;
	}
	&[data-theme='1'] {
		--setting-bg-color: rgba(255, 255, 255, 0.5);
		--content-bg-color: rgba(255, 255, 255, 0.5);
	}
	&[data-theme='2'] {
		--font-color: white;
		--setting-bg-color: rgba(0, 0, 0, 0.5);
		--content-bg-color: rgba(0, 0, 0, 0.5);
		--btn-bg-color: black;
		--btn-bg-checked-color: #333;
	}
	&[data-theme='3'] {
		#song-info,
		.recenthistory,
		.bookmarks {
			visibility: hidden;
		}
	}
	&[data-theme='4'] {
		.recenthistory,
		.bookmarks {
			visibility: hidden;
		}
		#song-info {
			> * {
				visibility: hidden;
			}
			.titles {
				visibility: visible;
			}
		}
	}
	button {
		color: var(--font-color);
		background-color: var(--btn-bg-color);
	}
	.content,
	.recenthistory,
	.bookmarks {
		background: var(--content-bg-color);
	}
	.typography {
		color: var(--font-color);
	}
`
