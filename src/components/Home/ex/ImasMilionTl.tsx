import styled from 'styled-components'
import { range } from '../../../util'

type Props = {
	cd: Record<string, boolean>
}
const cells1 = [
	{ label: '' },
	{ label: 'LTP' },
	{ label: 'LTH' },
	{ label: 'LTD' },
	{ label: 'LTF' },
	{ label: 'MTG' },
	{ label: 'MTW' },
	{ label: 'MTS' },
	{ label: '' },
]
const cells2 = [
	{ label: '' },
	{ label: 'TA' },
	{ label: '' },
	{ label: 'MS' },
	{ label: 'TB' },
	{ label: '' },
	{ label: 'TC' },
	{ label: '' },
	{ label: 'MS2' },
	{ label: '' },
]
const years = range(2023 - 2013 + 1).map((i) => 2013 + i)

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
					<div key={i} className={c.label}>
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
		grid-template-columns: 5% 9% 9% 10% 8% 17% 18% 17% 5%;
	}
	.ml2 {
		display: grid;
		width: 100%;
		grid-template-columns: 29% 5% 5% 8% 6% 7% 8% 14% 10%;
	}
	/* width: min */
`
