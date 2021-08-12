import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/dist/client/router'
import React, { useMemo, useState } from 'react'
import { useEffect } from 'react'
import safe from 'safe-regex'
import styled from 'styled-components'
import config, { timeColorMap } from '../config'
import { useFavorites } from '../hooks/useFavorites'
import { useHistoryDb } from '../hooks/useHistoryDb'
import { useQeurySearch } from '../hooks/useQueryEid'
import { useStart } from '../hooks/useStart'
import { formatDate, not } from '../util'
import Address from './HistoryPage/Address'
import { CountTable } from './HistoryPage/CountTable'
import Schedule from './HistoryPage/Schedule'
import { WordCountTable } from './HistoryPage/WordCountTable'
import ResetWorkerButton from './ResetWorkerButton'

const searchFilter = (search: string, text: string) => {
	let res = false
	try {
		if (safe(search)) {
			res = !!new RegExp(search, 'i').exec(text)
		}
	} catch (_e) {}
	res = res || text.toLowerCase().includes(search.toLowerCase())
	return res
}
const rangeFilter = (range: Range, time: number) => {
	if (range === null) return true
	return range.start <= time && time <= range.end
}

type Range = null | { start: number; end: number }
function HistoryPage() {
	const ready = useStart()

	if (!ready) return null
	return <HistoryPageBase />
}
function HistoryPageBase() {
	const { histories, counts, countsSong } = useHistoryDb()
	const q = useQeurySearch()
	const router = useRouter()
	const [search, setSearch] = useState<string>(q || '')
	const [nsort, setNsort] = useState<boolean>(false)
	const [range, setRange] = useState<Range>(null)
	const [viewAll, setViewAll] = useState<boolean>(false)
	const [tab, setTab] = useState<number>(0)
	const { favorites, toggleFavorites } = useFavorites()

	useEffect(() => {
		if (q) router.replace(router.pathname)
		console.log(router.pathname)
	}, [])

	const sortedHistories = useMemo(() => {
		if (!nsort) return histories
		const arr = [...histories].sort(
			(a, b) => (b.n === null ? -1 : b.n) - (a.n === null ? -1 : a.n)
		)
		return arr.sort()
	}, [nsort])

	const filteredHistories = useMemo(() => {
		return sortedHistories
			.filter((v) => searchFilter(search, v.title))
			.filter((v) => rangeFilter(range, v.time))
			.slice(0, viewAll ? 10000 : config.visibleRecordLimit)
	}, [sortedHistories, search, range, viewAll, nsort])

	return (
		<Wrap>
			<Schedule setFilter={(v) => setRange(v)} />
			<Tabs>
				<Tab n={0} cur={tab} label="履歴" setTab={setTab} />
				<Tab n={1} cur={tab} label="再生回数" setTab={setTab} />
				<Tab n={2} cur={tab} label="再生回数(曲名)" setTab={setTab} />
				<Tab n={3} cur={tab} label="タグカウント" setTab={setTab} />
			</Tabs>
			{tab === 0 && (
				<div>
					<h3>履歴</h3>
					<div>
						検索(正規表現)
						<input onChange={(e) => setSearch(e.target.value)}></input>
						{range && (
							<div>
								<span>フィルター中</span>
								<button onClick={() => setRange(null)}>リセット</button>:{' '}
								{formatDate(range.start)} - {formatDate(range.end)}
							</div>
						)}
					</div>
					{search && (
						<p>
							{search} の検索結果: {filteredHistories.length}件
						</p>
					)}
					<table className="hist">
						<thead>
							<tr>
								<th>日時</th>
								<th>タイトル</th>
								<th>ブ</th>
								<th style={{ width: '3rem' }} className="link-like">
									<div onClick={() => setNsort(not)}>N</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredHistories.map((reco, i) => (
								<ColorTr key={reco.time} h={reco.timeCate}>
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
										{reco.n === null ? '-' : reco.n}
									</td>
								</ColorTr>
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
	}

	table.count {
		td:nth-child(3) {
			width: 144px;
		}
	}
	.link-like {
		text-decoration: underline;
		cursor: pointer;
	}
`

const ColorTr = styled.tr<{ h: number }>`
	td:first-child {
		border-left: solid ${({ h }) => timeColorMap[h]};
		background: ${({ h }) => ['#dbf7ff', '#ffeeff'][h % 2]};
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
