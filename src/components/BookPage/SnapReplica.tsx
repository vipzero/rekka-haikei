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
	const grad = gradation[hourGrad(time.getHours())]
	const [icy1, icy2] = snap.icy.split(' - ')
	const gradCss = `linear-gradient(135deg, ${grad
		// .map((c) => c + hexAlpha)
		.join(', ')})`

	return (
		<Style
			data-d={time.getDay()}
			data-m={time.getMinutes() % 10}
			style={{
				borderImage: `linear-gradient(45deg, ${grad.join(', ')}) 1`,
			}}
		>
			<div
				className="img"
				style={{
					// backgroundImage: `url(${snap.url})`,
					backgroundImage: `url(${snap.url})`,
				}}
			/>
			<div className="pattern" />
			<div className="color" style={{ backgroundImage: `${gradCss}` }} />
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

const gradation = {
	nig1: ['#373B44', '#4286f4'],
	nig2: ['#0F2027', '#203A43', '#2C5364'],
	daw1: ['#03001e', '#7303c0', '#ec38bc', '#fdeff9'],
	daw2: ['#1a2a6c', '#b21f1f', '#fdbb2d'],
	mor1: ['#2980B9', '#6DD5FA', '#FFFFFF'],
	mor2: ['#BDFFF3', '#4AC29A'],
	eve1: ['#f7ff00', '#db36a4'],
	eve2: ['#f12711', '#f5af19'],
} as const

type GradKey = keyof typeof gradation

const hourGrad = (h: number): GradKey => {
	if (h < 1) return 'nig2'
	if (h < 4) return 'daw1'
	if (h < 7) return 'daw2'
	if (h < 10) return 'mor1'
	if (h < 13) return 'mor2'
	if (h < 16) return 'eve1'
	if (h < 19) return 'eve2'
	if (h < 22) return 'nig1'
	return 'nig2'
}

const Style = styled.div`
	position: relative;
	width: 200px;
	aspect-ratio: 1.618 / 1;
	/* box-shadow: 0 -10px 20px 0px #000 inset; */
	/* border-bottom: solid 4px; */
	/* border-radius: 10px; */

	border-radius: 2px;
	border-bottom: 4px;
	overflow: hidden;

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
	}

	&[data-d='0'] {
	}
	&[data-d='1'] {
		border-left: 5px solid;
	}
	&[data-d='2'] {
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
	}
	&[data-d='3'] {
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
	}
	&[data-m='0'] {
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
	&[data-m='1'] {
		.pattern {
			--cw: 16px;
			background-color: #888;
			opacity: 0.2;
			background-image: repeating-linear-gradient(
					45deg,
					#ffffff 25%,
					transparent 25%,
					transparent 75%,
					#ffffff 75%,
					#ffffff
				),
				repeating-linear-gradient(
					45deg,
					#ffffff 25%,
					#000000 25%,
					#000000 75%,
					#ffffff 75%,
					#ffffff
				);
			background-position: 0 0, calc(var(--cw) / 2) calc(var(--cw) / 2);
			background-size: var(--cw) var(--cw);
		}
	}
	&[data-m='2'] {
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
			--cw: 10px;
			background-size: var(--cw) var(--cw);
		}
	}
	&[data-m='3'] {
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
	}
	&[data-m='4'] {
		.pattern {
			background-image: linear-gradient(#ffffff 1px, transparent 1px),
				linear-gradient(to right, #ffffff 1px, #000000 1px);
			background-size: 20px 20px;
		}
	}
	&[data-m='5'] {
		.pattern {
			background-image: linear-gradient(135deg, #ffffff 25%, transparent 25%),
				linear-gradient(225deg, #ffffff 25%, transparent 25%),
				linear-gradient(45deg, #ffffff 25%, transparent 25%),
				linear-gradient(315deg, #ffffff 25%, #000000 25%);
			background-position: 10px 0, 10px 0, 0 0, 0 0;
			background-size: 20px 20px;
			background-repeat: repeat;
		}
	}
	&[data-m='6'] {
		.pattern {
			background-size: 20px 20px;
			background-image: repeating-linear-gradient(
				to right,
				#ffffff,
				#ffffff 1px,
				#000000 1px,
				#000000
			);
		}
	}
	&[data-m='7'] {
		.pattern {
			background-image: linear-gradient(45deg, #ffffff 50%, #000000 50%);
			background-size: 10px 10px;
		}
	}
	&[data-m='8'] {
		.pattern {
			background-image: radial-gradient(#ffffff 0.5px, transparent 0.5px),
				radial-gradient(#ffffff 0.5px, #000000 0.5px);
			background-size: 8px 8px;
			background-position: 0 0, 10px 10px;
		}
	}
	&[data-m='9'] {
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
	}

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
