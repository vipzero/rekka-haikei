import React, { useState } from 'react'
// import { AnimateOnChange } from 'react-animation'
import styled from 'styled-components'
import { Count, History } from '../../types'
import { useHistoryDb } from './useHistoryDb'

type Props = {
	counts: Count[]
	histories: History[]
}
function Page({ counts, histories }: Props) {
	const [search, setSearch] = useState<string>('')
	const [tab, setTab] = useState<number>(0)

	console.log('render')

	return (
		<Wrap>
			<div>
				<input onChange={(e) => setSearch(e.target.value)}></input>
			</div>
			<p>
				<button onClick={() => setTab(0)}>履歴</button>
				<button onClick={() => setTab(1)}>再生回数</button>
				<button onClick={() => setTab(2)}>再生回数(曲名)</button>
			</p>
			{tab === 0 && (
				<div>
					<h3>履歴</h3>
					<table className="hist">
						<thead>
							<tr>
								<th>タイトル</th>
								<th>回数</th>
							</tr>
						</thead>
						<tbody>
							{histories
								.filter(
									(v) => search === '' || new RegExp(search).exec(v.title)
								)
								.map((count, i) => (
									<tr key={i}>
										<td>{count.timeStr}</td>
										<td>{count.title}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			)}
			{tab === 1 && (
				<div>
					<h3>再生回数</h3>
					<table className="count">
						<thead>
							<tr>
								<th>タイトル</th>
								<th>回数</th>
								<th>日付</th>
							</tr>
						</thead>
						<tbody>
							{counts
								.filter(
									(v) => search === '' || new RegExp(search).exec(v.title)
								)
								.map((count, i) => (
									<tr key={i}>
										<td>{count.title}</td>
										<td>{count.times.length}</td>
										<td>
											<ul>
												{count.timesStr.map((s) => (
													<li key={s}>{s}</li>
												))}
											</ul>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			)}
		</Wrap>
	)
}
const Wrap = styled.div`
	width: 100vw;
	display: grid;
	padding: 16px;

	table {
		width: 100%;
	}
	table.hist {
		td:first-child {
			width: 144px;
		}
	}

	table.count {
		td:nth-child(3) {
			width: 144px;
		}
	}
`

function HistoryContainer() {
	const [histories, counts] = useHistoryDb('2020nematu')

	return <Page histories={histories} counts={counts} />
}

export default HistoryContainer
