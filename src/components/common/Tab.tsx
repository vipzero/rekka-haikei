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

export const Tabs = styled.div`
	margin-top: 12px;
	display: flex;
	button {
		border: solid 1px gray;
		border-bottom: none;
		border-radius: 4px 4px 0 0;
		margin-left: 2px;
		&[data-active='true'] {
			cursor: default;
			background: white;
		}
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
