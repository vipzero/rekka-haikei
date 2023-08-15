import { createGlobalStyle } from 'styled-components'

export const ProtectFlash: any = createGlobalStyle`
body {
  background: black;
  z-index: -30;
}
`

export const SubPageTheme: any = createGlobalStyle`

body {
	background: var(--color-bg);
  z-index: 0;
	color: var(--color-fg);
}
button {
	border: none;
	border-radius: 8px;
	padding: 2px 12px;

	:not(:disabled) {
		&:hover { background: var(--color-bg2); }
		&:active { background: var(--color-bg3); }
	}
	padding: .4rem 1rem;
	background: var(--color-bg);
  box-shadow:  4px 4px 8px var(--color-bg3),
              -4px -4px 8px var(--color-bg);
	margin: 2px 2px 0 0;
						
	@media (prefers-color-scheme: dark) {
		box-shadow:  4px 4px 8px #1d1d1d,
                -4px -4px 12px #272727;
	}
	color: var(--color-fg);
}

table.count {
  border: 1px solid var(--color-bg3);
  text-align: left;
  td, th {
    padding: 4px;
  }
  thead tr th {
    text-align: center;
    font-weight: bold;
  }
  tfoot {
    border-top: 1px solid var(--color-bg3);
  }
  tbody tr th {
    font-weight: bold;
  }
  tbody tr:nth-of-type(2n) {
    background: var(--color-bg);
  }
}
a {
	color: var(--primary-color);
	&:hover {
		color: #aa83af;
	}
}
`

export const GlobalStyle: any = createGlobalStyle`
@import "open-props/style";
@import "open-props/animations";

:root {
	--color-bg: #fff;
	--color-bg2: #eee;
	--color-bg3: #ddd;
	--color-fg: #000;
	--color-bg-sub: #fefedd;
	@media (prefers-color-scheme: dark) {
		--color-bg: #222;
		--color-bg2: #333;
		--color-bg3: #444;
		--color-bg-sub: #3d3d00;
		--color-fg: #eee;
	}
}

html {
  height: 100%;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI',
  'Noto Sans Japanese', 'ヒラギノ角ゴ ProN W3', Meiryo, sans-serif;
  margin: 0;
  min-height: 100vh;
	--primary-color: #e7627d;
}
ul {
		margin: 0;
		padding: 0;
}
li {
	list-style: none;
}

*, *::before, *::after {
  box-sizing: border-box;
}

.tooltip {
	position: relative;
	cursor: pointer;
	&:hover {
		background: gray;
		filter: invert(1);
	}
	&[data-active='true'] {
		background: orange;
	}
}

.tooltip-text {
	opacity: 0;
	visibility: hidden;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: -60px;
	display: inline-block;
	padding: 4px;
	white-space: nowrap;
	font-size: 0.8rem;
	line-height: 1.3;
	background: var(--color-bg3);
	color: var(--color-fg);
	border-radius: 4px;
	transition: opacity 0.3s ease-in;
}

.tooltip:hover .tooltip-text {
	opacity: 1;
	visibility: visible;
}

[data-util-hide='true'] {
	display: none !important;
}

.mono {
	font-family: 'Roboto Mono', monospace;
}

button {
	user-select: none;
	span {
		user-select: none;
	}
}
`
