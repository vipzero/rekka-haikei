import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

html {
  height: 100%;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI',
  'Noto Sans Japanese', 'ヒラギノ角ゴ ProN W3', Meiryo, sans-serif;
  margin: 0;
  min-height: 100vh;
  background: black;
  z-index: -30;
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

`
