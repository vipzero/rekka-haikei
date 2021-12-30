// eslint-disable-next-line
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
}
ul {
		margin: 0;
		padding: 0;
}
li {
	list-style: none;
}


@keyframes noise {
	0% {
		opacity: 0.5;
		transform: rotate(-5deg) translate(-10%,5%);
	}
  25% {
		transform: rotate(1deg);
  }
	50% {
		opacity: 0.75;
	}
	51% {
		opacity: 0;
	}
	52% {
		opacity: 0.75 ;
    transform: translate(5%,0%);
	}
  75% {
		transform: rotate(-2deg);
  }
	100% {
		opacity: 1;
		transform: rotate(5deg) translate(0%,-10%);
	}
}

@keyframes noiseBlink {
	0% {
		opacity: 1;
	}
	99% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@keyframes skipping {
	0% {
		transform: translate(0%) rotateY(-90deg);
	}
	50% {
		opacity: 1;
		transform: translate(0%) rotateY(90deg);
	}
	51% {
		opacity: 0;
		transform: translate(0%) rotateY(90deg);
	}
	100% {
		opacity: 0;
		transform: translate(0%) rotateY(90deg);
	}
}
@keyframes skipping-back {
	0% {
		opacity: 0;
		transform: translate(0%) rotateY(-90deg);
	}
	50% {
		opacity: 0;
		transform: translate(0%) rotateY(-90deg);
	}
	51% {
		opacity: 1;
		transform: translate(0%) rotateY(-90deg);
	}
	100% {
		transform: translate(0%) rotateY(90deg);
	}
}
@keyframes skipping-move {
	0% {
		left: 20%;
	}
	100% {
		left: 60%;
	}
}
`
