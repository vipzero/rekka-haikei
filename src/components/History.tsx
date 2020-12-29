import React, { useState } from 'react'
// import { AnimateOnChange } from 'react-animation'
import styled from 'styled-components'
import { Count, History } from '../../types'
import { useHistoryDb } from './useHistoryDb'

function Page() {
	const [histories, counts, countsSong] = useHistoryDb('2020nematu')
	const [search, setSearch] = useState<string>('')
	const [tab, setTab] = useState<number>(0)

	console.log('render')

	return (
		<Wrap>
			<div>
				正規表現検索 <input onChange={(e) => setSearch(e.target.value)}></input>
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
				<CountTable
					title="再生回数"
					counts={counts.filter(
						(v) => search === '' || new RegExp(search).exec(v.title)
					)}
				/>
			)}
			{tab === 2 && (
				<CountTable
					title="再生回数(曲名)"
					counts={countsSong.filter(
						(v) => search === '' || new RegExp(search).exec(v.title)
					)}
				/>
			)}
		</Wrap>
	)
}

function CountTable({ counts, title }: { title: string; counts: Count[] }) {
	return (
		<div>
			<h3>{title}</h3>
			<table className="count">
				<thead>
					<tr>
						<th>タイトル</th>
						<th>回数</th>
						<th>日付</th>
					</tr>
				</thead>
				<tbody>
					{counts.map((count, i) => (
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
	return <Page />
}

export default HistoryContainer
