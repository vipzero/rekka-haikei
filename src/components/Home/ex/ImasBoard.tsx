import styled from 'styled-components'

const colNum = 50
const chars = ['@', 'P', 'B', 'H', 'S']

type Props = {
	bools: boolean[][]
}

const sum = (a: number, b: number) => a + b
export const ImasBoard = ({ bools }: Props) => {
	const rowNum = bools.map((row) => Math.ceil(row.length / colNum)).reduce(sum)

	return (
		<Style data-open={open}>
			{bools.map((row, i) => (
				<div key={i} className="row">
					{row.map((b, j) => (
						<div
							key={j}
							data-hit={b}
							style={{
								background: `hsla(${
									((i + j / 50 + (j % 50)) / (rowNum + colNum)) * 360
								},50%,50%,10)`,
							}}
						>
							{b ? '.' : chars[i] || '|'}
						</div>
					))}
				</div>
			))}
		</Style>
	)
}

const Style = styled.div`
	width: 300px;
	border: solid 1px;
	font-size: 7px;
	line-height: 7px;
	font-family: monospace;
	background: #888;
	display: grid;
	opacity: 0.9;
	/* color: transparent; */
	text-align: center;
	[data-hit='true'] {
	}
	[data-hit='false'] {
		background: #fff !important;
	}
	.row {
		border-top: dotted 1px gray;
		/* height: 10px; */
		display: grid;
		grid-template-columns: repeat(${colNum}, 1fr);
	}
`
