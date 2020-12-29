import React from 'react'
// import { AnimateOnChange } from 'react-animation'
import styled from 'styled-components'
import { History } from '../../types'
import { useHistoryDb } from './useHistoryDb'

type Props = {
	counts: Record<string, number[]>
	histories: History[]
}
function Page({ counts, histories }: Props) {
	return (
		<Wrap>
			<div></div>
			<div>{JSON.stringify(counts)}</div>
		</Wrap>
	)
}
const Wrap = styled.div`
	width: 100vw;
	display: grid;
	padding: 16px;
`

function HistoryContainer() {
	const [histories, counts] = useHistoryDb('2020nematu')

	return <Page histories={histories} counts={counts} />
}

export default HistoryContainer
