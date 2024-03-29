import styled from 'styled-components'

const cards = ['♠X', '♠J', '♠Q', '♠K', '♠A']

export const TrumpCard = ({ open, sign }: { open: boolean; sign: string }) => {
	const [m, n] = [...(sign || '  ')]
	return (
		<Card data-open={open}>
			<div>{open ? m : ''}</div>
			<div>{open ? n : ''}</div>
		</Card>
	)
}
const Card = styled.div`
	border: solid 1px;
	padding: 4px;
	width: 30px;
	height: 42px;
	/* aspect-ratio: 9 / 16; */
	border-radius: 4px;
	> div {
		line-height: 1;
		text-align: center;
		color: #ddd;
	}
	background: #111;
	&[data-open='false'] {
		/* border 模様 */
		background: repeating-linear-gradient(
			40deg,
			#fff,
			#fff 5px,
			#aaa 5px,
			#aaa 10px
		);
	}

	grid-template-columns: repeat(5, 1fr);
	gap: 2px;
`

type Props = {
	opens: boolean[]
}
export const Trump = ({ opens }: Props) => {
	return (
		<Style>
			{cards.map((v, i) => (
				<TrumpCard key={i} open={opens[i]} sign={v} />
			))}
		</Style>
	)
}

const Style = styled.div`
	display: float;
	/* width: min */
	gap: 4px;
`
