import { createGlobalStyle } from 'styled-components'

export const ProtectFlash = createGlobalStyle`
body {
  background: black;
  z-index: -30;
}
`

export const SubPageTheme = createGlobalStyle`
button {
	background: #ffc3cf;
	border: none;
	border-radius:12px;
	padding: 2px 12px;
	&:hover {
		background: #eea3af;
	}
	&:active {
		background: #aa83af;
	}
}

table.count {
  border: 1px solid #ddd;
  text-align: left;
  td, th {
    padding: 4px;
  }
  thead tr th {
    text-align: center;
    font-weight: bold;
  }
  tfoot {
    border-top: 1px solid #ddd;
  }
  tbody tr th {
    font-weight: bold;
  }
  tbody tr:nth-of-type(2n) {
    background: #f5f5f5;
  }
}
`

export const GlobalStyle = createGlobalStyle`

html {
  height: 100%;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI',
  'Noto Sans Japanese', 'ヒラギノ角ゴ ProN W3', Meiryo, sans-serif;
  margin: 0;
  min-height: 100vh;
	--primary-color: #e7627d;
	--gray-color: #eee;
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
	background: #333;
	color: #fff;
	border-radius: 4px;
	transition: 0.3s ease-in;
}

.tooltip:hover .tooltip-text {
	opacity: 1;
	visibility: visible;
}

[data-util-hide='true'] {
	display: none !important;
}


`
