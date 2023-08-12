import styled from 'styled-components'

type Props = {
	bools: boolean[][]
}

export const ImasBoard = ({ bools }: Props) => {
	return (
		<Style data-open={open}>
			{bools.map((row, i) => (
				<div key={i} className="row">
					{row.map((b, j) => (
						<div key={j} data-hit={b}>
							{b ? '|' : '|'}
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
	font-size: 10px;
	line-height: 10px;
	background: #888;
	display: grid;
	opacity: 0.9;
	/* color: transparent; */
	text-align: center;
	[data-hit='true'] {
		background: #444;
	}
	[data-hit='false'] {
		background: #fff;
	}
	.row {
		border-top: dotted 1px gray;
		/* height: 10px; */
		display: grid;
		grid-template-columns: repeat(50, 1fr);
	}
`
