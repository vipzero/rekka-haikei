import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import styled from 'styled-components'
import config from '../config'
import { useFavorites } from '../hooks/useFavorites'
import { useHistoryDb } from '../hooks/useHistoryDb'
import { useStart } from '../hooks/useStart'
import { formatDate } from '../util'
import Address from './HistoryPage/Address'
import { CountTable } from './HistoryPage/CountTable'
import Schedule from './HistoryPage/Schedule'
import { WordCountTable } from './HistoryPage/WordCountTable'
import ResetWorkerButton from './ResetWorkerButton'

const searchFilter = (search: string, text: string) => {
	if (search === '') return true
	try {
		return new RegExp(search, 'i').exec(text)
	} catch (_e) {
		return text.toLowerCase().includes(search.toLowerCase())
	}
}
const rangeFilter = (range: Range, time: number) => {
	if (range === null) return true
	return range.start <= time && time <= range.end
}

type Range = null | { start: number; end: number }
function HistoryPage() {
	useStart()
	const { histories, counts, countsSong } = useHistoryDb()
	const [search, setSearch] = useState<string>('')
	const [range, setRange] = useState<Range>(null)
	const [viewAll, setViewAll] = useState<boolean>(false)
	const [tab, setTab] = useState<number>(0)
	const { favorites, setFavortes, toggleFavorites } = useFavorites()

	const filteredHistories = histories
		.filter((v) => searchFilter(search, v.title))
		.filter((v) => rangeFilter(range, v.time))
		.slice(0, viewAll ? 10000 : config.visibleRecordLimit)

	return (
		<Wrap>
			<div>
				検索(正規表現)
				<input onChange={(e) => setSearch(e.target.value)}></input>
				<Schedule setFilter={(v) => setRange(v)} />
				{range && (
					<div>
						<span>フィルター中</span>
						<button onClick={() => setRange(null)}>リセット</button>:{' '}
						{formatDate(range.start)} - {formatDate(range.end)}
					</div>
				)}
			</div>
			<Tabs>
				<Tab n={0} cur={tab} label="履歴" setTab={setTab} />
				<Tab n={1} cur={tab} label="再生回数" setTab={setTab} />
				<Tab n={2} cur={tab} label="再生回数(曲名)" setTab={setTab} />
				<Tab n={3} cur={tab} label="タグカウント" setTab={setTab} />
			</Tabs>
			{tab === 0 && (
				<div>
					<h3>履歴</h3>
					<table className="hist">
						<thead>
							<tr>
								<th>日時</th>
								<th>タイトル</th>
								<th>ブ</th>
								<th style={{ width: '3rem' }}>N</th>
							</tr>
						</thead>
						<tbody>
							{filteredHistories.map((reco, i) => (
								<tr key={i} data-cate={reco.timeCate}>
									<td>{reco.timeStr}</td>
									<td>{reco.title}</td>
									<td>
										<FontAwesomeIcon
											icon={favorites[reco.title] ? faStarFill : faStar}
											onClick={() => toggleFavorites(reco.title)}
										/>
									</td>
									<td
										style={{
											background: `linear-gradient(90deg, #ff9b49 0%, #ff9b49 ${reco.n}%, #fff ${reco.n}%, #fff 100%)`,
											textAlign: 'right',
										}}
									>
										{reco.n || '-'}
									</td>
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
			{tab === 4 && <ManageFavorte />}
			<Address />
			<ResetWorkerButton />
		</Wrap>
	)
}

const Wrap = styled.div`
	width: 100vw;
	display: grid;
	padding: 16px;

	table.hist {
		width: 100%;
		td {
			border-top: solid 1px;
		}
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

type TabProps = {
	n: number
	cur: number
	setTab: (id: number) => void
	label: string
}
const Tab = ({ n, cur, setTab, label }: TabProps) => (
	<button data-active={n === cur} onClick={() => setTab(n)}>
		{label}
	</button>
)

const Tabs = styled.div`
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

export default HistoryPage
