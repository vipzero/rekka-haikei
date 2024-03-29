import { ReactNode, useEffect, useState } from 'react'
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
	tab: upTab,
	items,
	onChange,
}: {
	onChange: (v: number) => void
	items: { label: string }[]
	tab?: number
}) => {
	const [tab, setTab] = useState<number>(0)
	useEffect(() => {
		if (upTab !== undefined && upTab !== tab) setTab(upTab)
	}, [upTab])
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
			<div className="lamp" style={{ left: `${tab * (WIDTH + 2)}px` }} />
		</Style>
	)
}

const WIDTH = 140
export const Style = styled.div`
	.tab-line {
		display: flex;
		margin-top: 12px;
		border-bottom: solid 1px var(--color-bg2);
		gap: 2px;
	}

	button {
		border-radius: 0;
		width: ${WIDTH}px;
		padding: 6px 0;
		border: none;
		background: var(--color-bg2);
		&:hover {
			background: var(--color-bg3);
		}
		&[data-active='true'] {
			cursor: default;
			background: var(--color-bg);
			border-color: var(--primary-color);
			color: var(--primary-color);
		}
		box-shadow: none;
	}
	.lamp {
		position: relative;
		width: ${WIDTH}px;
		height: 2px;
		background: #333;
		display: block;
		transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
	}
`

interface TabPanelProps {
	children?: ReactNode
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
