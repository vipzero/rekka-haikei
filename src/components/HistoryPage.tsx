import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useMemo, useState } from 'react'
import safe from 'safe-regex'
import styled from 'styled-components'
import config, { timeColorMap } from '../config'
import { useFavorites } from '../hooks/useFavorites'
import { useHistoryDb } from '../hooks/useHistoryDb'
import { useQeuryEid, useQueryInit } from '../hooks/useQueryEid'
import { useSearch } from '../hooks/useSearch'
import { useStart } from '../hooks/useStart'
import { formatDate, not } from '../util'
import { CheckBox } from './common/CheckBox'
import { TabPanel, Tabs } from './common/Tab'
import Address from './HistoryPage/Address'
import { CountTable } from './HistoryPage/CountTable'
import Schedule from './HistoryPage/Schedule'
import { WordCountTable } from './HistoryPage/WordCountTable'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
	const eid = useQeuryEid()

	const [searchPre, setSearchPre] = useState<string>('')
	const [searchs, setSearch] = useState<string[]>([])
	const [multiMode, setMultiMode] = useState<boolean>(false)
	const [copyMode, setCopyMode] = useState<boolean>(false)
	const [wrapMode, setWrapMode] = useState<boolean>(true)
	const [nsort, setNsort] = useState<boolean>(false)
	const [range, setRange] = useState<Range>(null)
	const [viewAll, setViewAll] = useState<boolean>(false)
	const [tab, setTab] = useState<number>(0)
	const { favorites, toggleFavorites } = useFavorites()
	const {
		searchs: searchHists,
		addSearch,
		delAllSearchs,
		delSearch,
	} = useSearch()

	useQueryInit((q) => {
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
	const search = (text: string) => {
		setSearch(text.trim().split('\n').filter(Boolean))
	}

	return (
		<Wrap>
			<h3>{eid}</h3>
			<p>
				<a href="./bg">戻る</a>
			</p>
			<Schedule setFilter={(v) => setRange(v)} />
			<Tabs
				items={[
					{ label: '履歴' },
					{ label: '再生回数' },
					{ label: '再生回数(曲名)' },
					{ label: 'タグカウント' },
				]}
				onChange={setTab}
			/>
			<TabPanel value={tab} index={0}>
				<div>
					<h3>履歴</h3>
					<div>
						<form className="search-box">
							<div>
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
							</div>
							<div className="search-control">
								<CheckBox
									onChange={(multiMode) => {
										setMultiMode(multiMode)
										if (!multiMode) {
											setSearchPre(searchPre.replace(/\n/g, ' '))
										}
									}}
									checked={multiMode}
								>
									複数
								</CheckBox>
								<button
									style={{ minWidth: '100px' }}
									onClick={(e) => {
										e.preventDefault()
										if (searchPre.trim() !== '')
											addSearch({ q: searchPre, multi: multiMode })
										search(searchPre)
									}}
								>
									検索
									<div>(正規表現)</div>
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
							</div>
							<div>
								<div className="search-hist">
									{searchHists.map((s, i) => (
										<div key={i} className="del-btn">
											<button
												onClick={(e) => {
													e.preventDefault()
													setMultiMode(s.multi)
													search(s.q)
													setSearchPre(s.q)
												}}
											>
												{s.q.substring(0, 10)}
											</button>
											<button
												onClick={(e) => {
													e.preventDefault()
													delSearch(s)
												}}
											>
												x
											</button>
										</div>
									))}
									{searchHists.length > 0 && (
										<button
											style={{ background: 'var(--gray-color)' }}
											onClick={(e) => {
												e.preventDefault()
												delAllSearchs()
											}}
										>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									)}
								</div>
							</div>
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

					<div style={{ display: 'flex', margin: '4px' }}>
						<div data-copy-mode={copyMode}>
							<CheckBox checked={copyMode} onChange={setCopyMode}>
								コピペモード(2列にする)
							</CheckBox>
						</div>
						<div data-wrap-mode={wrapMode}>
							<CheckBox checked={wrapMode} onChange={setWrapMode}>
								折返し
							</CheckBox>
						</div>
					</div>
					<div
						className="hist"
						data-copy-mode={copyMode}
						data-wrap-mode={wrapMode}
					>
						<div className="hist-head">
							<div>日時</div>
							<div>タイトル</div>
							<div className="non-copy">ブ</div>
							<div className="non-copy">
								<div className="link-like" onClick={() => setNsort(not)}>
									N
								</div>
							</div>
						</div>

						{viewHists.map((reco, i) => (
							<ColorTr key={reco.time} h={reco.timeCate} className="hist-row">
								<div>{reco.timeStr}</div>
								<div>{reco.title}</div>
								<div className={'non-copy'}>
									<FontAwesomeIcon
										icon={favorites[reco.title] ? faStarFill : faStar}
										onClick={() => toggleFavorites(reco.title)}
									/>
								</div>
								<div
									className={'non-copy'}
									style={{
										background: `linear-gradient(90deg, #ff9b49 0%, #ff9b49 ${reco.n}%, #fff ${reco.n}%, #fff 100%)`,
										textAlign: 'right',
									}}
								>
									{reco.n === null ? '-' : reco.n}
								</div>
							</ColorTr>
						))}
					</div>
					{histories.length >= 100 && (
						<p>{histories.length}中100件のみ表示しています</p>
					)}
					<button onClick={() => setViewAll((v) => !v)}>
						{viewAll ? '隠す' : '全表示する'}
					</button>
				</div>
			</TabPanel>
			<TabPanel value={tab} index={1}>
				<CountTable title="再生回数" counts={counts} />
			</TabPanel>
			<TabPanel value={tab} index={2}>
				<CountTable title="再生回数(曲名)" counts={countsSong} />
			</TabPanel>
			<TabPanel value={tab} index={3}>
				<WordCountTable />
			</TabPanel>

			<Address />
			{/* <ResetWorkerButton /> */}
		</Wrap>
	)
}

const Wrap = styled.div`
	display: grid;
	padding: 16px;

	div[data-copy-mode] {
		width: max-content;
		&[data-copy-mode='true'] {
			border: solid 1px orange;
			background: #fefedd;
		}
	}
	.hist {
		width: 100%;

		.hist-head,
		.hist-row {
			width: max(96vw, 600px);
			display: grid;
			grid-template-columns: 184px 1fr 1.5rem 3rem;
		}

		.hist-row {
			padding: 2px;
			border-top: solid 1px;
			font-family: ui-monospace monospace;
			> div:first-child {
				font-size: 16px;
			}
		}
		&[data-wrap-mode='false'] {
			.hist-row {
				> div:nth-child(2) {
					overflow: scroll;
					white-space: nowrap;
				}
			}
		}
		&[data-copy-mode='true'] {
			.hist-head,
			.hist-row {
				grid-template-columns: 184px 1fr;
				.non-copy {
					display: none;
				}
			}
		}
	}

	table.count {
		td:nth-child(3) {
			min-width: 166px;
			font-family: ui-monospace monospace;
			font-size: 14px;
		}
	}
	.link-like {
		text-decoration: underline;
		cursor: pointer;
	}
	form {
		display: flex;
		gap: 8px;
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
	.search-hist {
		display: flex;
		flex-wrap: wrap;
		gap: 2px;
		border-left: dotted var(--primary-color);
		padding-left: 4px;
	}
	.del-btn {
		button:first-child {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
		button:nth-of-type(2) {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			background: var(--gray-color);
		}
	}
	.search-control {
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 3px;
	}
`

const ColorTr = styled.div<{ h: number }>`
	> div:first-child {
		border-left: solid ${({ h }) => timeColorMap[h]} 8px;
		background: ${({ h }) => ['#dbf7ff', '#ffeeff'][h % 2]};
	}
`

export default HistoryPage
