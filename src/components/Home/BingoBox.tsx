import styled from 'styled-components'
import { useBingo } from '../../hooks/useBingo'

export const BingoBox = () => {
	const { bingo, toggleItem, bingoText, setBingoText } = useBingo()

	return (
		<Wrap>
			<div className="box">
				{bingo.items.map((v, i) => (
					<div
						key={i}
						className="item"
						data-checked={v.checked}
						onClick={() => toggleItem(v.name)}
					>
						{v.name}
					</div>
				))}
			</div>
			<textarea
				value={bingoText}
				onChange={(e) => {
					setBingoText(e.target.value)
				}}
			></textarea>
		</Wrap>
	)
}

const Wrap = styled.div`
	.box {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		.item {
			color: var(--font-color);
			background: var(--bingo-bg-color);
			padding: 2px;
			text-align: center;

			&[data-checked='true'] {
				border: 1px solid var(--bingo-bg-hit-color);
				background: var(--bingo-bg-hit-color);
			}
		}
	}
	textarea {
		width: 100%;
		height: 10rem;
		font-size: 0.8rem;
	}
`
