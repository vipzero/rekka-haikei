import styled from 'styled-components'
import { useBingo, useBingoEdit } from '../../hooks/useBingo'

export const BingoBox = () => {
	const { bingo, toggleItem, setBingo } = useBingo()
	const { mode, startEdit, endEdit, changeItem } = useBingoEdit(bingo, setBingo)

	return (
		<Wrap>
			<div className="box">
				{bingo.items.map((v, i) => (
					<div
						key={i}
						className="item"
						data-checked={v.checked}
						data-selected={mode.id === 'edit' && mode.i === i}
						onClick={() => {
							startEdit(i)
						}}
					>
						{v.name.substring(0, 8)}
					</div>
				))}
			</div>
			<div style={{ height: '40px' }}>
				{mode.id === 'edit' ? (
					<div>
						<input
							type="text"
							className="item-edit"
							value={bingo.items[mode.i]?.name}
							onChange={(e) => {
								changeItem(mode.i, e.target.value)
							}}
						/>
						<input
							type="checkbox"
							checked={bingo.items[mode.i]?.checked}
							className="item-check"
							onChange={() => {
								toggleItem(bingo.items[mode.i]?.name)
							}}
						/>
						<button onClick={endEdit}>完了</button>
					</div>
				) : (
					<div>N line</div>
				)}
			</div>
		</Wrap>
	)
}

const Wrap = styled.div`
	.box {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		.item {
			color: var(--font-color);
			background: var(--bingo-bg-color);
			padding: 2px;
			text-align: center;
			&:hover {
				background: orange;
			}
			box-sizing: content-box;
			&[data-selected='true'] {
				border: 1px solid orange;
			}

			&[data-checked='true'] {
				border: 1px solid var(--bingo-bg-hit-color);
				background: var(--bingo-bg-hit-color);
			}
		}
	}
	.item-edit {
		height: 30px;
		font-size: 20px;
		line-height: 30px;
	}
	.item-check {
		transform: scale(2);
		width: 30px;
	}
	textarea {
		width: 100%;
		height: 10rem;
		font-size: 0.8rem;
	}
`
