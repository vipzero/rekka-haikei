import styled, { keyframes } from 'styled-components'

export const RingsSvg = (props) => {
	return (
		<svg
			// xmlns="http://www.w3.org/2000/svg"
			// xmlns:xlink="http://www.w3.org/1999/xlink"
			// style="isolation:isolate"
			{...props}
			viewBox="0 0 20 20"
			width="20pt"
			height="20pt"
		>
			<defs>
				<clipPath id="_clipPath_LGwLTGoMeBVTrzN2kNFIYk0xCD7WjW2Q">
					<rect width="20" height="20" />
				</clipPath>
			</defs>
			<g clip-path="url(#_clipPath_LGwLTGoMeBVTrzN2kNFIYk0xCD7WjW2Q)">
				<path
					className="ring-a"
					d=" M 7.153 9.052 C 7.55 7.86 8.675 7 10 7 C 11.656 7 13 8.344 13 10 C 13 11.656 11.656 13 10 13 C 8.344 13 7.001 11.656 7 10"
					fill="none"
					stroke-width="0.5"
					stroke-dasharray="0,0"
					stroke="rgb(117,234,222)"
					stroke-opacity="0.8"
					stroke-linejoin="miter"
					stroke-linecap="butt"
					stroke-miterlimit="4"
				/>
				<path
					d=" M 13.405 10.811 C 13.039 12.352 11.653 13.5 10 13.5 C 8.068 13.5 6.5 11.932 6.5 10"
					className="ring-b"
					fill="none"
					stroke-width="0.5"
					stroke-dasharray="0,0"
					stroke="rgb(117,234,222)"
					stroke-opacity="0.8"
					stroke-linejoin="miter"
					stroke-linecap="butt"
					stroke-miterlimit="4"
				/>
				<path
					className="ring-c"
					d=" M 7.865 6.618 C 8.483 6.227 9.215 6 10 6 C 12.208 6 14 7.792 14 10 C 14 12.208 12.208 14 10 14 C 7.792 14 6 12.208 6 10"
					fill="none"
					stroke-width="0.5"
					stroke-dasharray="0,0"
					stroke="rgb(117,234,222)"
					stroke-opacity="0.8"
					stroke-linejoin="miter"
					stroke-linecap="butt"
					stroke-miterlimit="4"
				/>
				<circle
					cx="10"
					cy="10"
					r="5"
					fill="none"
					stroke-width="0.1"
					className="ring-d"
					stroke-dasharray="20,30"
					stroke="rgb(117,234,222)"
					stroke-opacity="0.8"
					stroke-linejoin="miter"
					stroke-linecap="butt"
					stroke-miterlimit="4"
				/>
				<path
					className="ring-e"
					d=" M 9.899 4.501 C 9.933 4.5 9.966 4.5 10 4.5 C 13.035 4.5 15.5 6.964 15.5 10 C 15.5 13.036 13.036 15.5 10 15.5 C 6.964 15.5 4.5 13.036 4.5 10"
					fill="none"
					stroke-width="0.1"
					stroke-dasharray="25,30"
					stroke="rgb(117,234,222)"
					stroke-opacity="0.8"
					stroke-linejoin="miter"
					stroke-linecap="butt"
					stroke-miterlimit="4"
				/>
				<path
					d=" M 6.71 15.017 C 5.078 13.945 4 12.097 4 10 C 4 9.411 4.085 8.842 4.243 8.305"
					className="ring-f"
					fill="none"
					stroke-width="1.2"
					stroke-dasharray="1,1"
					stroke="rgb(117,234,222)"
					stroke-linejoin="miter"
					stroke-linecap="butt"
					stroke-miterlimit="4"
				/>
				<circle
					cx="10"
					cy="10"
					r="7"
					fill="none"
					stroke-width="0.2"
					className="ring-g"
					stroke-dasharray="3,7,6"
					stroke="rgb(117,234,222)"
					stroke-opacity="0.8"
					stroke-linejoin="miter"
					stroke-linecap="butt"
					stroke-miterlimit="4"
				/>
				<circle
					cx="10"
					cy="10"
					r="7.1499999999999995"
					fill="none"
					className="ring-h"
					stroke-width="0.2"
					stroke-dasharray="47,47"
					stroke="rgb(117,234,222)"
					stroke-linejoin="miter"
					stroke-linecap="butt"
					stroke-miterlimit="4"
				/>
				<path
					className="ring-r"
					d=" M 9.671 4.009 C 9.78 4.003 9.89 4 10 4 C 13.311 4 16 6.689 16 10 C 16 13.311 13.311 16 10 16 C 6.689 16 4 13.311 4 10"
					fill="none"
					stroke-width="0.5"
					stroke-dasharray="1,2,1,0.5"
					stroke="rgb(117,234,222)"
					stroke-linejoin="miter"
					stroke-linecap="butt"
					stroke-miterlimit="4"
				/>
			</g>
		</svg>
	)
}

const spinnerA = keyframes`
  0% {
		transform: rotate3d(1, 1, 1, 0deg);
  }

  100% {
    transform: rotate3d(1, 1, 1, 360deg);
  }
`

const spinnerB = keyframes`
  0% {
    transform: rotate3d(1, 1, 1, 0deg);
  }

  100% {
    transform: rotate3d(1, 1, 1, 360deg);
  }
`

const spinnerD = keyframes`
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  100% {
	transform: rotate3d(0, 0, 1, 360deg);
  }
`

const spinnerReverse = keyframes`
  0% {
    transform: rotate3d(0, 0, 1, 360deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
`

export const Yrings = styled(RingsSvg)`
	display: block;
	width: 300px;
	height: 300px;
	filter: drop-shadow(0px 0px 0.5rem rgba(0, 200, 240, 1));
	perspective: 3000px;
	transform-style: preserve-3d;
	transform: rotateX(55deg) rotateY(342deg) rotateZ(1deg);

	[class^='ring-'] {
		transform-origin: 10px 10px;
	}
	.ring-a {
		animation: ${spinnerA} 2000ms infinite linear;
	}

	.ring-b {
		animation: ${spinnerB} 3000ms infinite linear;
	}

	.ring-c {
		animation: ${spinnerB} 4000ms infinite linear;
	}

	.ring-d {
		animation: ${spinnerD} 2000ms infinite linear;
	}

	.ring-e {
		animation: ${spinnerReverse} 2200ms infinite linear;
	}

	.ring-f {
		animation: ${spinnerD} 2400ms infinite linear;
	}

	.ring-g {
		animation: ${spinnerD} 7000ms infinite linear;
	}

	.ring-i {
		animation: ${spinnerReverse} 3000ms infinite linear;
	}
`
