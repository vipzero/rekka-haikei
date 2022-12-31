import styled from 'styled-components'
import { Snap } from '../../types'
import { formatDate } from '../../util'

type Props = {
	snap: Snap
	onDelete: () => void
}
// const hexAlpha = ''
// const hexAlpha = '80'
// const hexAlpha = 'd0'
export function SnapReplica({ snap, onDelete }: Props) {
	const time = new Date(snap.time)
	const h = time.getHours()
	// const grad = gradation[hourGrad(h)]
	const w = time.getDay()
	const isNight = h < 6 || 18 <= h
	const [icy1, icy2] = snap.icy.split(' - ')
	const hd = Math.floor(h / 3) // day split to 8

	return (
		<Style data-d={w} data-hd={hd} data-dk={isNight ? 'n' : 'd'}>
			<div
				className="img"
				style={{
					backgroundImage: `url(${snap.url})`,
				}}
			/>
			<div className="pattern" />
			<div className="color" />
			<div className="texts">
				<div className="sub">{snap.animeTitle}</div>
				<div className="title">{icy1}</div>
				<div className="title">{icy2}</div>
			</div>
			<div className="hover-conf">
				<button onClick={onDelete}>削除</button>
				<div className="sub">{formatDate(+time)}</div>
			</div>
		</Style>
	)
}

const Style = styled.div`
	position: relative;
	width: max(10%, min(200px, 48%));

	aspect-ratio: 1.618 / 1;
	/* box-shadow: 0 -10px 20px 0px #000 inset; */
	/* border-bottom: solid 4px; */
	/* border-radius: 10px; */

	border-radius: 2px;
	border-bottom: 4px;
	overflow: hidden;

	&[data-d='0']&[data-dk='d'] {
		--gc1: #cfd9df;
		--gc2: #e2ebf0;
	}
	&[data-d='0']&[data-dk='n'] {
		--gc1: #09203f;
		--gc2: #537895;
	}
	&[data-d='1']&[data-dk='d'] {
		--gc1: #fccb90;
		--gc2: #d57eeb;
	}
	&[data-d='1']&[data-dk='n'] {
		--gc1: #a6c0fe;
		--gc2: #f68084;
	}
	&[data-d='2']&[data-dk='d'] {
		--gc1: #f6d365;
		--gc2: #fda085;
	}
	&[data-d='2']&[data-dk='n'] {
		--gc1: #a40606;
		--gc2: #d98324;
	}
	&[data-d='3']&[data-dk='d'] {
		--gc1: #83eaf1;
		--gc2: #63a4ff;
	}
	&[data-d='3']&[data-dk='n'] {
		--gc1: #30cfd0;
		--gc2: #330867;
	}
	&[data-d='4']&[data-dk='d'] {
		--gc1: #d4fc79;
		--gc2: #96e6a1;
	}
	&[data-d='4']&[data-dk='n'] {
		--gc1: #0ba360;
		--gc2: #3cba92;
	}
	&[data-d='5']&[data-dk='d'] {
		--gc1: #ffdd00;
		--gc2: #fbb034;
	}
	&[data-d='5']&[data-dk='n'] {
		--gc1: #f6d365;
		--gc2: #fda085;
	}
	&[data-d='6']&[data-dk='d'] {
		--gc1: #864ba2;
		--gc2: #bf3a30;
	}
	&[data-d='6']&[data-dk='n'] {
		--gc1: #c79081;
		--gc2: #dfa579;
	}

	border-image: linear-gradient(45deg, var(--gc1), var(--gc2)) 1;

	.img {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center center;
	}
	.pattern {
		position: absolute;
		width: 100%;
		height: 100%;
		mix-blend-mode: color-dodge;
		opacity: 0.3;
		background-color: #888;
	}
	.color {
		position: absolute;
		width: 100%;
		height: 100%;
		background-position: 50% 50%;
		/* background-size: 200% 200%; */
		mix-blend-mode: multiply;
		opacity: 40%;
		background-image: linear-gradient(135deg, var(--gc1), var(--gc2));
	}

	/* &[data-d='0'] {
	}
	&[data-d='1'] {
		border-left: 5px solid;
	} */
	/* &[data-d='2'] { */
	border-bottom: 5px solid;
	.pattern {
		background-color: #888;
		background-image: linear-gradient(
				45deg,
				#444 25%,
				transparent 25%,
				transparent 75%,
				#444 75%,
				#444
			),
			linear-gradient(
				45deg,
				#444 25%,
				transparent 25%,
				transparent 75%,
				#444 75%,
				#444
			);
		background-position: 0 0, 25px 25px;
		--cw: 10px;
		background-size: var(--cw) var(--cw);
	}
	/* } */
	/* &[data-d='3'] {
		border-radius: 20px;
	}
	&[data-d='4'] {
		border: 2px solid;
	}
	&[data-d='5'] {
		border-bottom: 5px;
		border-radius: 12px 0;
	}
	&[data-d='6'] {
		transform: skewX(-3deg);
	} */
	&[data-hd='0'] {
		.pattern {
			background: repeating-radial-gradient(
				circle at -150% -25%,
				#fff,
				#777 3px,
				#fff 3px
			);
			background-position: 50% 50%;
			background-size: 120% 120%;
		}
	}
	&[data-hd='1'] {
		.pattern {
			--cw: 16px;
			background-color: #888;
			opacity: 0.2;
			background-image: repeating-linear-gradient(
					45deg,
					#777 25%,
					transparent 25%,
					transparent 75%,
					#777 75%,
					#777
				),
				repeating-linear-gradient(
					45deg,
					#777 25%,
					#000000 25%,
					#000000 75%,
					#777 75%,
					#777
				);
			background-position: 0 0, calc(var(--cw) / 2) calc(var(--cw) / 2);
			background-size: var(--cw) var(--cw);
		}
	}
	&[data-hd='2'] {
		.pattern {
			background-image: linear-gradient(
					45deg,
					#000 25%,
					transparent 25%,
					transparent 75%,
					#000 75%,
					#000
				),
				linear-gradient(
					-45deg,
					#000 25%,
					transparent 25%,
					transparent 75%,
					#000 75%,
					#000
				);
			--cw: 24px;
			background-size: var(--cw) var(--cw);
		}
	}
	&[data-hd='3'] {
		.pattern {
			background-image: radial-gradient(#777 0.5px, transparent 0.5px),
				radial-gradient(#777 0.5px, #000000 0.5px);
			--cw: 10px;
			background-size: 0 0, var(--cw) var(--cw);
		}
	}
	&[data-hd='4'] {
		.pattern {
			background-image: linear-gradient(#777 1px, transparent 1px),
				linear-gradient(to right, #777 1px, #000000 1px);
			background-size: 20px 20px;
		}
	}
	&[data-hd='5'] {
		.pattern {
			background-image: linear-gradient(135deg, #555 25%, transparent 25%),
				linear-gradient(225deg, #555 25%, transparent 25%),
				linear-gradient(45deg, #555 25%, transparent 25%),
				linear-gradient(315deg, #555 25%, #000000 25%);
			background-position: 10px 0, 10px 0, 0 0, 0 0;
			background-size: 20px 20px;
			background-repeat: repeat;
		}
	}
	&[data-hd='6'] {
		.pattern {
			background-size: 20px 20px;
			background-image: repeating-linear-gradient(
				to right,
				#777,
				#777 1px,
				#000000 1px,
				#000000
			);
		}
	}
	&[data-hd='7'] {
		.pattern {
			background-image: linear-gradient(45deg, #777 50%, #000000 50%);
			background-size: 10px 10px;
		}
	}
	/* &[data-hd='8'] {
		.pattern {
			background-color: #888;
			opacity: 0.8;

			background-image: repeating-radial-gradient(
					circle at 0 0,
					transparent 0,
					#858585 14px
				),
				repeating-linear-gradient(#00000055, #515151a8);
		}
	} */
	/* &[data-hd='9'] {
		.pattern {
			--cw: 20px;
			--cwh: calc(var(--cw) / 2);

			background: radial-gradient(
					circle,
					transparent 20%,
					#000000 20%,
					#000000 80%,
					transparent 80%,
					transparent
				),
				radial-gradient(
						circle,
						transparent 20%,
						#000000 20%,
						#000000 80%,
						transparent 80%,
						transparent
					)
					var(--cwh) var(--cwh),
				linear-gradient(#ffffff 2px, transparent 2px) 0 -1px,
				linear-gradient(90deg, #ffffff 2px, #000000 2px) -1px 0;
			background-size: var(--cw) var(--cw), var(--cw) var(--cw),
				var(--cwh) var(--cwh), var(--cwh) var(--cwh);
		}
	} */

	&:hover {
		.hover-conf {
			display: block;
			background: #333333ff !important;
		}
		.color {
			opacity: 0;
		}
		.texts {
			display: none;
		}
	}
	.hover-conf {
		position: absolute;
		display: none;
		padding: 4px;
		button {
			background: #949494;
		}
	}
	.texts {
		position: absolute;
		width: 100%;
		height: 100%;
		padding: 4px;
		display: grid;
		grid-template-rows: 1fr max-content max-content;
	}
	.title {
		font-size: 10px;
		/* mix-blend-mode: overlay; */
		color: white;
		white-space: nowrap;
	}
	.sub {
		color: #fefefe;
	}
`
