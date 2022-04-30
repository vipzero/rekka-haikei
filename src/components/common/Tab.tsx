import * as React from 'react'
import styled from 'styled-components'

type Props = {
	n: number
	cur: number
	setTab: (id: number) => void
	label: string
}
export const Tab = ({ n, cur, setTab, label }: Props) => (
	<button data-active={n === cur} onClick={() => setTab(n)}>
		{label}
	</button>
)

export const Tabs = ({
	items,
	onChange,
}: {
	onChange: (v: number) => void
	items: { label: string }[]
}) => {
	const [tab, setTab] = React.useState<number>(0)
	return (
		<Style>
			<div className="tab-line">
				{items.map((item, i) => (
					<Tab
						n={i}
						key={i}
						cur={tab}
						label={item.label}
						setTab={() => {
							onChange(i)
							setTab(i)
						}}
					/>
				))}
			</div>
			<div className="lamp" style={{ left: `${tab * 102}px` }} />
		</Style>
	)
}

export const Style = styled.div`
	.tab-line {
		display: flex;
		margin-top: 12px;
		border-bottom: solid 1px #ddd;
		gap: 2px;
	}

	button {
		width: 100px;
		padding: 8px 0;
		border: none;
		background: var(--gray-color);
		&:hover {
			background: #ddd;
		}
		&[data-active='true'] {
			cursor: default;
			background: white;
			border-color: var(--primary);
			color: var(--primary);
		}
	}
	.lamp {
		position: relative;
		width: 100px;
		height: 2px;
		background: #333;
		display: block;
		transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
	}
`

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

export function TabPanel(props: TabPanelProps) {
	const { children, value, index } = props

	return (
		<div hidden={value !== index}>
			{value === index && <div>{children}</div>}
		</div>
	)
}
