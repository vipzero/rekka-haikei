import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useMemo, useState } from 'react'
import safe from 'safe-regex'
import styled from 'styled-components'
import config, { timeColorMap } from '../config'
import { useFavorites } from '../hooks/useFavorites'
import { useHistoryDb } from '../hooks/useHistoryDb'
import { useQueryInit } from '../hooks/useQueryEid'
import { useStart } from '../hooks/useStart'
import { formatDate, not } from '../util'
import Address from './HistoryPage/Address'
import { CountTable } from './HistoryPage/CountTable'
import Schedule from './HistoryPage/Schedule'
import { WordCountTable } from './HistoryPage/WordCountTable'
import ResetWorkerButton from './ResetWorkerButton'

const searchFilter = (search: string, text: string, r: RegExp) => {
	let res = false
	try {
		if (safe(search)) {
			res = !!r.exec(text)
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
	const [searchPre, setSearchPre] = useState<string>('')
	const [searchs, setSearch] = useState<string[]>([])
	const [multiMode, setMultiMode] = useState<boolean>(false)
	const [copyMode, setCopyMode] = useState<boolean>(false)
	const [nsort, setNsort] = useState<boolean>(false)
	const [range, setRange] = useState<Range>(null)
	const [viewAll, setViewAll] = useState<boolean>(false)
	const [tab, setTab] = useState<number>(0)
	const { favorites, toggleFavorites } = useFavorites()

	useQueryInit((q) => {
		console.log({ q })

		setSearchPre(q)
		setSearch([q])
	})

	const sortedHists = useMemo(() => {
		if (!nsort) return histories
		const arr = [...histories].sort(
			(a, b) => (b.n === null ? -1 : b.n) - (a.n === null ? -1 : a.n)
		)
		return arr.sort()
	}, [histories, nsort])

	const [rangedHists] = useMemo(() => {
		const rangeFiltered = sortedHists.filter((v) => rangeFilter(range, v.time))

		return [rangeFiltered]
	}, [sortedHists, range])

	const [filteredHists, searchResult] = useMemo(() => {
		if (searchs.length === 0) return [rangedHists, null]
		const result: Record<string, number> = {}
		const searchParts = searchs.map((s) => {
			result[s] = 0
			return [s, new RegExp(s, 'i')] as const
		})
		const histories = rangedHists.filter((v) => {
			const hits = searchParts.map(([s, r]) => {
				const hit = searchFilter(s, v.title, r)
				result[s] += hit ? 1 : 0
				return hit
			})
			return hits.some(Boolean)
		})

		return [histories, result]
	}, [rangedHists, searchs])

	const viewHists = useMemo(() => {
		return filteredHists.slice(0, viewAll ? 10000 : config.visibleRecordLimit)
	}, [viewAll, filteredHists])

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
						<form>
							<textarea
								rows={multiMode ? 8 : 1}
								name="rekka-search-word"
								value={searchPre}
								autoComplete="on"
								onChange={(e) =>
									setSearchPre(
										multiMode ? e.target.value : e.target.value.split('\n')[0]
									)
								}
							/>
							<label>
								<input
									type="checkbox"
									onChange={(e) => {
										const multiMode = e.target.checked
										setMultiMode(multiMode)
										if (!multiMode) {
											setSearchPre(searchPre.replace(/\n/g, ' '))
										}
									}}
								/>
								複数
							</label>
							<button
								onClick={(e) => {
									e.preventDefault()
									setSearch(searchPre.trim().split('\n').filter(Boolean))
								}}
							>
								検索(正規表現)
							</button>
							{searchs.length > 0 && (
								<button
									onClick={(e) => {
										e.preventDefault()
										setSearch([])
										setSearchPre('')
									}}
								>
									リセット
								</button>
							)}
						</form>
					</div>
					<div className="search-result">
						{searchResult && (
							<div className="option-box-word">
								<h4>検索結果</h4>
								{searchs.map((search) => (
									<p key={search}>
										{search} の検索結果: {searchResult[search]}件
									</p>
								))}
							</div>
						)}
						{range && (
							<div className="option-box">
								<h4>期間</h4>
								<p>
									{`${formatDate(range.start, true)} 〜 ${formatDate(
										range.end,
										true
									)}`}
								</p>
								<button onClick={() => setRange(null)}>リセット</button>
							</div>
						)}
					</div>

					<div data-copy-mode={copyMode}>
						<label>
							<input
								type="checkbox"
								onChange={(e) => setCopyMode(e.target.checked)}
							/>
							コピペモード(2列にする)
						</label>
					</div>
					<table className="hist" data-copy-mode={copyMode}>
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
							{viewHists.map((reco, i) => (
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
			{tab === 1 && <CountTable title="再生回数" counts={counts} />}
			{tab === 2 && <CountTable title="再生回数(曲名)" counts={countsSong} />}
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

	div[data-copy-mode] {
		width: max-content;
		padding: 2px;
		border: solid 1px white;
		&[data-copy-mode='true'] {
			border: solid 1px orange;
			background: #fefedd;
		}
	}

	table.hist {
		width: 100%;
		td {
			border-top: solid 1px;
		}
		td:first-child {
			width: 144px;
		}
		&[data-copy-mode='true'] {
			th,
			td {
				&:nth-child(n + 3) {
					display: none;
				}
			}
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
	form {
		display: flex;
		> :not(button) {
			margin-top: 4px;
		}
	}

	.search-result {
		p {
			margin: 0;
			padding: 0;
		}
		h4 {
			margin: 0;
		}
		.option-box,
		.option-box-word {
			margin-top: 8px;
			display: flex;
			gap: 0.5rem;
			padding: 2px;
			border: solid 1px orange;
			background: #fefedd;
		}
		.option-box-word {
			flex-direction: column;
		}
		.option-box {
			> :not(button) {
				margin-top: 4px;
			}
		}
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
