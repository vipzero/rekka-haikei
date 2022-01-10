import { css, keyframes } from 'styled-components'

const spin = keyframes`
0% {
	transform: rotate(0deg);
}
100% {
	transform: rotate(360deg);
}
`
const animStart = process.env.NODE_ENV === 'development' ? 5 : 60

const randAnimsCss = [...Array(20).keys()]
	.map(
		(i) => `
			span:nth-of-type(${i + 1}),a:nth-of-type(${i + 1}) {
				animation-delay: ${(i * 7) % 10}s;
			}
			`
	)
	.join('\n')

export const exStyles = css`
	&[data-ex='lain'],
	&[data-ex='psychopass'],
	&[data-ex='kokaku'] {
		div {
			/* background: linear-gradient(#0000, #1008, #0008, #1000) !important; */
		}

		span,
		a {
			width: max-content;
			animation-name: noise;
			animation-direction: alternate;
			animation-timing-function: ease-in-out;
			animation-iteration-count: infinite;
			animation-duration: 8s;
		}

		&[data-ex='kokaku'] {
			div {
				border-bottom: solid 1px #0385f4;
				background: #a2c0c033;
			}
			p,
			span,
			a {
				color: #0385f4 !important;
				animation-name: noiseBlink;
				/* background: #1008 !important; */
			}

			cursor: url(/static/sac-min.png) 25 25, auto;
		}

		&[data-ex='psychopass'] {
			div {
				border-bottom: solid 1px #12e0ad;
				background: #092b0933;
			}
			p,
			span,
			a {
				color: #12e0ad !important;
				animation-name: noiseBlink;
			}
		}

		${randAnimsCss}
	}
	&[data-ex='spin'] {
		.album img {
			animation: ${spin} 5s linear infinite;
			&:hover {
				animation-name: none;
			}
		}

		&[data-has-art='true'] {
			#bg > div {
				animation: ${spin} 3000s linear infinite;
			}
		}
		&[data-has-art='false'] {
			#bg > div {
				animation: ${spin} 60s linear infinite;
			}
		}
	}
	&[data-ex='rakupro'] {
		#mask {
			display: block;
			animation: aurora-anim 20s linear infinite alternate;
		}

		/* background-size: 400% 400%; */
		#mask2 {
			/* background: linear-gradient(to top, #e700fcaa, transparent); */
			/* background: linear-gradient(to top, #fffa, transparent); */
		}
	}
	&[data-ex='masshiro'] {
		#mashiros {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 20vw;
			animation: skipping-move 10s linear infinite alternate;
			> div {
				position: relative;
			}
		}
		#mashiro-a,
		#mashiro-b {
			width: 100%;
			position: absolute;
			right: 0;
			bottom: 0;
		}
		#mashiro-a {
			animation: skipping 2s linear infinite;
		}
		#mashiro-b {
			animation: skipping-back 2s linear infinite;
		}
	}

	@keyframes noise {
		0% {
			opacity: 0.5;
			transform: rotate(-5deg) translate(-10%, 5%);
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
			opacity: 0.75;
			transform: translate(5%, 0%);
		}
		75% {
			transform: rotate(-2deg);
		}
		100% {
			opacity: 1;
			transform: rotate(5deg) translate(0%, -10%);
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

	&[data-ex='steinsgate'] {
		#timebar > div {
			transform-origin: 0 0;
			animation: spin-y 10s cubic-bezier(0.28, 1.61, 0.7, -0.71) infinite
				alternate;
		}
	}

	@keyframes spin-y {
		0% {
			transform: rotateY(90deg);
		}
		100% {
			transform: rotateY(0deg);
		}
	}
	@keyframes aurora-anim {
		0% {
			background: #e700fc88;
		}
		20% {
			background: transparent;
		}
		40% {
			background: #ffa8;
		}
		60% {
			background: transparent;
		}
		80% {
			background: #fff8;
		}
		100% {
			background: transparent;
		}
	}
	#cog-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		opacity: 0;
		animation: appear-anim 1s linear ${animStart}s both;
		z-index: -3;
	}
	.cog {
		position: absolute;

		/* border: solid 1px black; */
		background: url(/static/cog.svg);
		pointer-events: none;
		opacity: 0.7;

		&#cog1 {
			width: 400vmax;
			height: 400vmax;
			top: -40vmax;
			left: -140vmax;
			animation: spin 300s linear infinite;
			opacity: 1;
		}
		&#cog2 {
			width: 40vmax;
			height: 40vmax;
			top: -10vmax;
			right: -20vmax;
			animation: spin 10s ease-in-out infinite;
			background: url(/static/cog2.svg);
		}
		&#cog3 {
			width: 100vmax;
			height: 100vmax;
			top: -80vmax;
			left: 0vmax;
			animation: spin 100s linear infinite;
			background: url(/static/cog2.svg);
		}
		&#cog4 {
			width: 100vmax;
			height: 100vmax;
			top: 50vmax;
			left: -50vmax;
			animation: spin 100s ease-in-out infinite;
			background: url(/static/cog3.svg);
		}
		&#cog5 {
			width: 150vmax;
			height: 150vmax;
			top: 25vmax;
			left: -75vmax;
			animation: spin 50s linear infinite reverse;
			background: url(/static/cog3.svg);
		}
	}

	@keyframes appear-anim {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}

	&[data-ex='steinsgate'] #bg > div {
		&::before,
		&::after,
		.channel {
			background: inherit;
			bottom: 0;
			left: 0;
			position: absolute;
			right: 0;
			top: 0;
		}
		&::before {
			animation: glitch-before 3s linear infinite alternate both;
			content: '';
		}
		.channel {
			mix-blend-mode: screen;
			&::before {
				bottom: 0;
				content: '';
				display: block;
				mix-blend-mode: multiply;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
			}
		}
		.r {
			animation: rgb-shift-r 3s steps(1, jump-end) infinite alternate both;
			&::before {
				background: #f00;
			}
		}
		.g {
			animation: rgb-shift-g 3s steps(1, jump-end) infinite alternate both;
			&::before {
				background: #0f0;
			}
		}
		.b {
			animation: rgb-shift-b 3s steps(1, jump-end) infinite alternate both;
			::before {
				background: #00f;
			}
		}
		&::before,
		&::after,
		.channel {
			animation-delay: ${animStart - 3}s;
		}
	}
	@keyframes glitch-before {
		0% {
			clip-path: polygon(
				0% 47.038511849%,
				100% 47.038511849%,
				100% 51.254650439%,
				0% 51.254650439%
			);
			transform: translate(-4.2216264996%, 0.1989512247%);
		}
		2% {
			clip-path: polygon(
				0% 14.0862284363%,
				100% 14.0862284363%,
				100% 23.7804946193%,
				0% 23.7804946193%
			);
			transform: translate(0.5319544663%, -0.1670048037%);
		}
		4% {
			clip-path: polygon(
				0% 55.9114114584%,
				100% 55.9114114584%,
				100% 58.830823819%,
				0% 58.830823819%
			);
			transform: translate(3.1212064652%, -0.2880821595%);
		}
		6% {
			clip-path: polygon(
				0% 50.5761948778%,
				100% 50.5761948778%,
				100% 53.1131055475%,
				0% 53.1131055475%
			);
			transform: translate(-2.2125530768%, -0.1782644813%);
		}
		8% {
			clip-path: polygon(
				0% 5.2698433493%,
				100% 5.2698433493%,
				100% 12.9134196002%,
				0% 12.9134196002%
			);
			transform: translate(-3.117269545%, 0.1664145405%);
		}
		10% {
			clip-path: polygon(
				0% 29.3892293425%,
				100% 29.3892293425%,
				100% 36.6173919336%,
				0% 36.6173919336%
			);
			transform: translate(2.9458337841%, 0.4535629647%);
		}
		12% {
			clip-path: polygon(
				0% 71.2148012183%,
				100% 71.2148012183%,
				100% 77.3616681453%,
				0% 77.3616681453%
			);
			transform: translate(-7.9487393487%, 0.2982833827%);
		}
		14% {
			clip-path: polygon(
				0% 42.9684489052%,
				100% 42.9684489052%,
				100% 48.4146875463%,
				0% 48.4146875463%
			);
			transform: translate(-2.2589695483%, -0.0592603285%);
		}
		16% {
			clip-path: polygon(
				0% 63.6300940787%,
				100% 63.6300940787%,
				100% 65.678719627%,
				0% 65.678719627%
			);
			transform: translate(7.9643179644%, 0.4468598444%);
		}
		18% {
			clip-path: polygon(
				0% 32.6738475345%,
				100% 32.6738475345%,
				100% 35.580721758%,
				0% 35.580721758%
			);
			transform: translate(6.8037577127%, -0.3461978446%);
		}
		20%,
		100% {
			clip-path: none;
			transform: none;
		}
	}
	@keyframes glitch-after {
		0% {
			clip-path: polygon(
				0% 0.8270248202%,
				100% 0.8270248202%,
				100% 5.4939340464%,
				0% 5.4939340464%
			);
			transform: translate(-7.1916191058%, -0.1380443312%);
		}
		2% {
			clip-path: polygon(
				0% 89.1769768176%,
				100% 89.1769768176%,
				100% 94.3318042413%,
				0% 94.3318042413%
			);
			transform: translate(7.4237584863%, -0.3166234875%);
		}
		4% {
			clip-path: polygon(
				0% 22.0045627452%,
				100% 22.0045627452%,
				100% 25.9181608462%,
				0% 25.9181608462%
			);
			transform: translate(5.1594881935%, -0.4591250969%);
		}
		6% {
			clip-path: polygon(
				0% 4.7639447506%,
				100% 4.7639447506%,
				100% 13.6636703227%,
				0% 13.6636703227%
			);
			transform: translate(2.6963086584%, -0.2645536103%);
		}
		8% {
			clip-path: polygon(
				0% 52.4635820467%,
				100% 52.4635820467%,
				100% 62.0395911029%,
				0% 62.0395911029%
			);
			transform: translate(7.3100348879%, -0.1260783259%);
		}
		10% {
			clip-path: polygon(
				0% 5.1816914487%,
				100% 5.1816914487%,
				100% 14.7829249101%,
				0% 14.7829249101%
			);
			transform: translate(-0.494793877%, -0.2340290804%);
		}
		12% {
			clip-path: polygon(
				0% 58.064048749%,
				100% 58.064048749%,
				100% 62.7163317906%,
				0% 62.7163317906%
			);
			transform: translate(1.8799712425%, 0.4567037882%);
		}
		14% {
			clip-path: polygon(
				0% 24.7593123521%,
				100% 24.7593123521%,
				100% 31.0296461651%,
				0% 31.0296461651%
			);
			transform: translate(-5.0921859964%, -0.0587072616%);
		}
		16% {
			clip-path: polygon(
				0% 1.5216960549%,
				100% 1.5216960549%,
				100% 6.482918601%,
				0% 6.482918601%
			);
			transform: translate(-4.002265371%, -0.1352225457%);
		}
		18% {
			clip-path: polygon(
				0% 17.1644138008%,
				100% 17.1644138008%,
				100% 18.9188413823%,
				0% 18.9188413823%
			);
			transform: translate(4.292726286%, -0.3047630935%);
		}
		20%,
		100% {
			clip-path: none;
			transform: none;
		}
	}
	@keyframes rgb-shift-r {
		0% {
			transform: translate(0.7585343931%, -0.2109878944%);
		}
		2% {
			transform: translate(0.9206386872%, 0.0267665935%);
		}
		4% {
			transform: translate(-0.0802672972%, -0.4118534426%);
		}
		6% {
			transform: translate(-0.5487193155%, 0.1275117299%);
		}
		8% {
			transform: translate(-0.0328829258%, 0.306989083%);
		}
		10% {
			transform: translate(-1.2839166547%, 0.2283543764%);
		}
		12% {
			transform: translate(0.7143636832%, 0.2680444509%);
		}
		14% {
			transform: translate(-0.4849653061%, 0.3796902026%);
		}
		16% {
			transform: translate(1.6994583253%, -0.291757438%);
		}
		18% {
			transform: translate(1.8923736225%, -0.3616740782%);
		}
		20%,
		100% {
			transform: none;
		}
	}
	@keyframes rgb-shift-g {
		0% {
			transform: translate(-1.3509405686%, -0.4813110341%);
		}
		2% {
			transform: translate(-1.9759167791%, -0.4054291111%);
		}
		4% {
			transform: translate(0.1454875785%, 0.1720477629%);
		}
		6% {
			transform: translate(0.3691080564%, 0.0190589127%);
		}
		8% {
			transform: translate(-0.7339261724%, -0.3888581052%);
		}
		10% {
			transform: translate(1.7481156884%, 0.2400228654%);
		}
		12% {
			transform: translate(0.8476399866%, 0.1702532325%);
		}
		14% {
			transform: translate(-1.3371385489%, -0.0525643884%);
		}
		16% {
			transform: translate(-0.8436379081%, 0.4597279789%);
		}
		18% {
			transform: translate(0.0648447193%, 0.1267576003%);
		}
		20%,
		100% {
			transform: none;
		}
	}
	@keyframes rgb-shift-b {
		0% {
			transform: translate(1.1873673524%, -0.4186032299%);
		}
		2% {
			transform: translate(-0.0963989962%, 0.153563236%);
		}
		4% {
			transform: translate(0.0425526428%, 0.436543678%);
		}
		6% {
			transform: translate(-0.7953652732%, 0.0687284708%);
		}
		8% {
			transform: translate(-1.4650845551%, 0.3647511521%);
		}
		10% {
			transform: translate(-0.8599325574%, -0.3613046752%);
		}
		12% {
			transform: translate(1.1325257477%, -0.3908610418%);
		}
		14% {
			transform: translate(1.0393944104%, 0.3239251429%);
		}
		16% {
			transform: translate(0.2292569257%, 0.1178513479%);
		}
		18% {
			transform: translate(-1.6738748469%, -0.0844500211%);
		}
		20%,
		100% {
			transform: none;
		}
	}
`
