import styled from 'styled-components'
import { range } from '../../../util'

type Props = {
	cd: Record<string, boolean>
}

type Cell = {
	label: string
	y: number
}

const cells1 = [
	{ label: '', y: 2013 },
	{ label: 'LTP', y: 2013.6 },
	{ label: 'LTH', y: 2014.6 },
	{ label: 'LTD', y: 2015.6 },
	{ label: 'LTF', y: 2016.6 },
	{ label: 'MTG', y: 2017.5 },
	{ label: 'MTW', y: 2019.4 },
	{ label: 'MTS', y: 2021.4 },
	{ label: ' ', y: 2023.3 },
	{ label: 'MAT', y: 2023.6 },
	{ label: ' ', y: 2024.4 },
]
const cells2 = [
	{ label: '', y: 2013 },
	{ label: 'TA', y: 2016.3 },
	{ label: '', y: 2016.8 },
	{ label: 'MS', y: 2017.3 },
	{ label: 'TB', y: 2018.2 },
	{ label: '', y: 2018.7 },
	{ label: 'TC', y: 2019.6 },
	{ label: '', y: 2020.5 },
	{ label: 'MS2', y: 2022 },
	{ label: 'MC', y: 2023.7 },
	{ label: '', y: 2024.3 },
]
const startYear = 2013
const endYear = 2024
const rangeYear = endYear - startYear + 1
const years = range(rangeYear).map((i) => startYear + i)

const toCellColumns = (years: Cell[]) =>
	years
		.map((a, i) => (years[i + 1] ? years[i + 1].y : endYear + 1) - a.y)
		.map((v) => `${((v * 100) / rangeYear).toFixed(2)}%`)
		.join(' ')

export const ImasMilionTl = ({ cd }: Props) => {
	return (
		<Style data-open={open}>
			<div className="years">
				{years.map((y) => (
					<div key={y}>{y}</div>
				))}
			</div>
			<div className="ml1">
				{cells1.map((c, i) => (
					<div key={i} className={c.label} data-hit={!!cd[c.label]}>
						{c.label}
					</div>
				))}
			</div>
			<div className="ml2">
				{cells2.map((c, i) => (
					<div key={i} className={c.label} data-hit={!!cd[c.label]}>
						{c.label}
					</div>
				))}
			</div>
		</Style>
	)
}

const Style = styled.div`
	width: 400px;
	border: solid 1px;
	font-size: 10%;
	color: #333;
	background: white;
	opacity: 0.9;
	text-align: center;
	.years {
		display: flex;
		width: 100%;
		justify-content: space-evenly;
		background: #eee;
	}
	> div {
		&:not(.years) {
			border-top: solid #aaa 1px;
		}
		> div {
			border-right: solid #aaa 1px;
			width: 100%;
			/* padding-right: 1px; */
			&:last-child {
				border-right: none;
			}
			&[data-hit='true'] {
				background: #ea0;
			}
		}
	}
	.ml1 {
		display: grid;
		width: 100%;
		grid-template-columns: ${toCellColumns(cells1)};
	}
	.ml2 {
		display: grid;
		width: 100%;
		grid-template-columns: ${toCellColumns(cells2)};
	}
	/* width: min */
`
