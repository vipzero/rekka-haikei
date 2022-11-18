import styled from 'styled-components'
import { Snap } from '../../types'

type Props = {
	snap: Snap
	onDelete: () => void
}
const hexAlpha = '80'
// const hexAlpha = 'd0'
export function SnapReplica({ snap }: Props) {
	const grad = gradation[hourGrad(new Date(snap.time).getHours())]

	return (
		<Style
			style={{
				backgroundImage: `linear-gradient(135deg, ${grad
					.map((c) => c + hexAlpha)
					.join(', ')}), url(${snap.url})`,
			}}
		>
			<div>
				<div className="sub">{snap.animeTitle}</div>
				<div className="title">{snap.icy}</div>
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
	> div {
		position: absolute;
		width: 100%;
		height: 100%;
		padding: 4px;
	}
	.title {
		font-size: 10px;
		position: absolute;
		bottom: 4px;
		/* mix-blend-mode: overlay; */
		color: white;
	}
	.sub {
		color: #fefefe;
	}
`
