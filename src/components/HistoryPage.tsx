import React, { useState } from 'react'
import styled from 'styled-components'
import { Count } from '../types'
import config from '../config'
import { useCountDb } from '../hooks/useCountDb'
import { useHistoryDb } from '../hooks/useHistoryDb'

const searchFilter = (search: string, text: string) => {
	if (search === '') return true
	try {
		return new RegExp(search, 'i').exec(text)
	} catch (_e) {
		return text.toLowerCase().includes(search.toLowerCase())
	}
}

function HistoryPage() {
	const [histories, counts, countsSong] = useHistoryDb(config.eventId)
	const [search, setSearch] = useState<string>('')
	const [viewAll, setViewAll] = useState<boolean>(false)
	const [tab, setTab] = useState<number>(0)

	const filteredHistories = histories
		.filter((v) => searchFilter(search, v.title))
		.slice(0, viewAll ? 10000 : config.visibleRecordLimit)

	return (
		<Wrap>
			<div>
				検索(正規表現)
				<input onChange={(e) => setSearch(e.target.value)}></input>
			</div>
			<p>
				<button onClick={() => setTab(0)}>履歴</button>
				<button onClick={() => setTab(1)}>再生回数</button>
				<button onClick={() => setTab(2)}>再生回数(曲名)</button>
				<button onClick={() => setTab(3)}>タグカウント</button>
			</p>
			{tab === 0 && (
				<div>
					<h3>履歴</h3>
					<table className="hist">
						<thead>
							<tr>
								<th>日時</th>
								<th>タイトル</th>
							</tr>
						</thead>
						<tbody>
							{filteredHistories.map((reco, i) => (
								<tr key={i} data-cate={reco.timeCate}>
									<td>{reco.timeStr}</td>
									<td>{reco.title}</td>
								</tr>
							))}
						</tbody>
					</table>
					{histories.length >= 100 && (
						<p>{histories.length}中100件のみ表示しています</p>
					)}
					<button onClick={() => setViewAll((v) => !v)}>
						{viewAll ? '隠す' : '全表示する'}
					</button>
				</div>
			)}
			{tab === 1 && (
				<CountTable
					title="再生回数"
					counts={counts.filter((v) => searchFilter(search, v.title))}
				/>
			)}
			{tab === 2 && (
				<CountTable
					title="再生回数(曲名)"
					counts={countsSong.filter((v) => searchFilter(search, v.title))}
				/>
			)}
			{tab === 3 && <WordCountTable />}
		</Wrap>
	)
}

function WordCountTable() {
	const [counts] = useCountDb(config.eventId)

	return (
		<div>
			<h3>タグカウント</h3>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
				{counts.map((v, i) => (
					<div key={i}>
						<span>{v.word}</span>
						<span>({v.count})</span>
					</div>
				))}
			</div>
		</div>
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
						<th>日時</th>
					</tr>
				</thead>
				<tbody>
					{counts.slice(0, config.visibleRecordLimit).map((count, i) => (
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
	table.hist {
		td:first-child {
			width: 144px;
		}
		tr {
			&[data-cate='0'],
			&[data-cate='2'],
			&[data-cate='4'],
			&[data-cate='6'],
			&[data-cate='8'] {
				td:first-child {
					background: #dbf7ff;
				}
			}
		}
	}

	table.count {
		td:nth-child(3) {
			width: 144px;
		}
	}
`

export default HistoryPage
