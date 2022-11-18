import styled from 'styled-components'
import { Snap } from '../../types'
import { formatDate } from '../../util'

type Props = {
	snap: Snap
	onDelete: () => void
}
const hexAlpha = '80'
// const hexAlpha = 'd0'
export function SnapReplica({ snap, onDelete }: Props) {
	const time = new Date(snap.time)
	const grad = gradation[hourGrad(time.getHours())]
	const [icy1, icy2] = snap.icy.split(' - ')

	return (
		<Style
			style={{
				backgroundImage: `linear-gradient(135deg, ${grad
					.map((c) => c + hexAlpha)
					.join(', ')}), url(${snap.url})`,
			}}
		>
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
	background-size: cover;
	background-position: center center;
	/* box-shadow: 0 -10px 20px 0px #000 inset; */
	border-radius: 10px;

	&:hover {
		.hover-conf {
			display: block;
			background: #333333ff !important;
		}
		.texts {
			display: none;
		}
	}
	.hover-conf {
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
