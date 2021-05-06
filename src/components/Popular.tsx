import React from 'react'
import styled from 'styled-components'
import { BookCount } from '../../types'
import config from '../config'
import { useBookDb } from './useBookDb'

function Page() {
	const [books] = useBookDb(config.eventId)

	return (
		<Wrap>
			<CountTable title={'人気ブックマーク'} counts={books} />
		</Wrap>
	)
}

function CountTable({ counts, title }: { title: string; counts: BookCount[] }) {
	return (
		<div>
			<h3>{title}</h3>
			<table className="count">
				<thead>
					<tr>
						<th>タイトル</th>
						<th>人数</th>
					</tr>
				</thead>
				<tbody>
					{counts.slice(0, config.visibleRecordLimit).map((count, i) => (
						<tr key={i}>
							<td>{count.icy}</td>
							<td>{count.count}</td>
						</tr>
					))}
				</tbody>
			</table>
			{counts.length >= 100 && <p>100件までのみ表示しています</p>}
		</div>
	)
}

const Wrap = styled.div`
	width: 100vw;
	display: grid;
	padding: 16px;

	table {
		width: 100%;
	}
	table td {
		border-top: solid 1px;
	}
`

function PopularContainer() {
	return <Page />
}

export default PopularContainer
