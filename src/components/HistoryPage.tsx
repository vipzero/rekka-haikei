import { faStar } from '@fortawesome/free-regular-svg-icons'
import {
	faStar as faStarFill,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import copy from 'copy-to-clipboard'
import React, { useMemo, useState } from 'react'
import { RecoilRoot } from 'recoil'
import safe from 'safe-regex'
import styled from 'styled-components'
import { BRate } from '../service/firebase'
import config, { timeColorMap } from '../config'
import { useFavorites } from '../hooks/useFavorites'
import { useHistoryDb } from '../hooks/useHistoryDb'
import { useQeuryEid, useQueryInit } from '../hooks/useQueryEid'
import { useSearch } from '../hooks/useSearch'
import { useStart } from '../hooks/useStart'
import { History } from '../types'
import { formatDate } from '../util'
import { CopyButton } from './BookPage/CopyButton'
import { CheckBox } from './common/CheckBox'
import { TabPanel, Tabs } from './common/Tab'
import CountsPage from './CountsPage'
import Address from './HistoryPage/Address'
import Schedule from './HistoryPage/Schedule'
import { SearchQueryLab } from './HistoryPage/SearchQueryLab'
import { SettingPage } from './HistoryPage/SettingPage'
import { Toast } from './Toast'

const toH = (ts: number) =>
	Math.floor(
		((ts + 9 * 60 * 60 * 1000) % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
	)

const safeRegex = (s: string) => {
	try {
		if (safe(s)) {
			return true
		}
	} catch (_e) {
		return false
	}
	return false
}
const searchHit = (search: string, text: string, r: RegExp | false) => {
	return (
		(r && r.exec(text)) || text.toLowerCase().includes(search.toLowerCase())
	)
}

const searchFilter = (
	searchs: string[],
	rangedHists: History[]
): [History[], Record<string, number> | null] => {
	if (searchs.length === 0) return [rangedHists, null]

	const preHists = rangedHists

	const result: Record<string, number> = {}
	const searchParts = searchs.map((s) => {
		result[s] = 0
		const ok = safeRegex(s)
		return [s, ok && new RegExp(s, 'i')] as const
	})
	const histories: History[] = []

	preHists.forEach((v) => {
		const hits = searchParts.map(([s, r]) => {
			const hit = searchHit(s, v.title, r)
			result[s] += hit ? 1 : 0
			return hit
		})
		if (hits.some(Boolean)) histories.push(v)
	})

	// const histories = preHists.filter((v) => {
	// 	const hits = searchParts.map(([s, r]) => {
	// 		const hit = searchHit(s, v.title, r)
	// 		result[s] += hit ? 1 : 0
	// 		return hit
	// 	})
	// 	return hits.some(Boolean)
	// })

	return [histories, result]
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
	const { fixDb, histories, counts, countsSong } = useHistoryDb()
	const eid = useQeuryEid()

	const [searchPre, setSearchPre] = useState<string>('')
	const [searchs, setSearch] = useState<string[]>([])
	const [multiMode, setMultiMode] = useState<boolean>(false)
	const [copyMode, setCopyMode] = useState<boolean>(false)
	const [wrapMode, setWrapMode] = useState<boolean>(true)
	const [sortBy, setSort] = useState<'none' | 'by_n' | 'by_b' | 'by_g'>('none')
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

	useQueryInit(
		(q) => {
			setSearchPre(q)
			setSearch([q])
		},
		(tab) => {
			setTab(tab)
		}
	)

	const sortedHists = useMemo(() => {
		if (sortBy === 'none') return histories

		const sortKey: keyof History =
			({ by_n: 'n', by_b: 'b', by_g: 'g' } as Record<string, keyof History>)[
				sortBy
			] || 'n'
		const sort = (a, b) => (b[sortKey] ?? -1) - (a[sortKey] ?? -1)

		const arr = [...histories].sort(sort)
		return arr.sort()
	}, [histories, sortBy])

	const [rangedHists] = useMemo(() => {
		if (range === null) return [sortedHists]
		const rangeFiltered = sortedHists.filter((v) => rangeFilter(range, v.time))

		return [rangeFiltered]
	}, [sortedHists, range])

	const [filteredHists, searchResult] = useMemo(() => {
		performance.mark('a')
		const res = searchFilter(searchs, rangedHists)
		performance.mark('b')
		performance.measure('search', 'a', 'b')

		console.info(performance.getEntriesByName('search').pop())
		return res
	}, [rangedHists, searchs])

	const viewHists = useMemo(() => {
		return filteredHists.slice(0, viewAll ? 10000 : config.visibleRecordLimit)
	}, [viewAll, filteredHists])
	const search = (text: string) => {
		setSearch(text.trim().split('\n').filter(Boolean))
	}
	const searchResultTexts = [
		`履歴検索 ${eid}`,
		...searchs.map((s) => `${s}: ${searchResult?.[s]}件`),
	]
	const index2bText = (b: boolean, i: number) =>
		b ? '済' : `${i + 1}`.padStart(2, '0')
	const searchResultTexts2 = searchs.map(
		(s, i) => index2bText(!!searchResult?.[s], i) + ' ' + s
	)

	return (
		<Wrap>
			<h3>{eid}</h3>
			<p>
				<a href="./bg">戻る</a>
			</p>
			<Schedule setFilter={(v) => setRange(v)} />
			<Tabs
				tab={tab}
				items={[
					{ label: '履歴' },
					{ label: 'カウント' },
					{ label: '背景ラボ' },
					{ label: '設定' },
				]}
				onChange={setTab}
			/>

			<Toast />
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
							<>
								<div className="option-box-word">
									<h4>検索結果</h4>
									{searchResultTexts.map((text) => (
										<div key={text}>{text}</div>
									))}
									<CopyButton
										onClick={() => copy(searchResultTexts.join('\n'))}
									/>
								</div>
								<div className="option-box-word">
									{searchResultTexts2.map((text) => (
										<div key={text}>{text}</div>
									))}
									<CopyButton
										onClick={() => copy(searchResultTexts2.join('\n'))}
									/>
								</div>
							</>
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
					{copyMode && (
						<div data-copy-mode className="hist-copy">
							{viewHists.map((reco) => (
								<div key={reco.time}>
									{formatDate(reco.time)} {reco.title}
								</div>
							))}
						</div>
					)}
					<div
						className="hist"
						data-util-hide={copyMode}
						data-wrap-mode={wrapMode}
					>
						<div className="hist-head">
							<div>日時</div>
							<div>タイトル</div>
							<div className="non-copy">ブ</div>
							<div className="non-copy">
								<div
									className="link-like"
									onClick={() =>
										setSort((v) => (v === 'by_n' ? 'none' : 'by_n'))
									}
								>
									<div className="tooltip">
										<span className="tooltip-text">勢い</span>N
									</div>
								</div>
							</div>
							<div className="non-copy">
								<div
									className="link-like"
									onClick={() =>
										setSort((v) => (v === 'by_b' ? 'none' : 'by_b'))
									}
								>
									<div className="tooltip">
										<span className="tooltip-text">ブクマ数</span>★
									</div>
								</div>
							</div>
							<div className="non-copy">
								<div
									className="link-like"
									onClick={() =>
										setSort((v) => (v === 'by_g' ? 'none' : 'by_g'))
									}
								>
									<div className="tooltip">
										<span className="tooltip-text">
											(ブクマ数 ^ 2)/(勢い + {BRate})
										</span>
										%
									</div>
								</div>
							</div>
						</div>

						{viewHists.map((reco, i) => (
							<ColorTr
								key={reco.time}
								className="hist-row"
								data-h2={toH(reco.time) % 2}
								style={{
									// @ts-ignore
									['--daytime-color']: timeColorMap[toH(reco.time)],
								}}
							>
								<div>{formatDate(reco.time)}</div>
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
									{reco.n ?? '-'}
								</div>
								<div
									className={'non-copy'}
									data-prog-cell
									style={{
										background: `linear-gradient(90deg, #9b49ff 0%, #9b49ff ${
											reco.b ?? 0
										}%, #fff ${reco.b ?? 0}%, #fff 100%)`,
										textAlign: 'right',
									}}
								>
									{reco.b || '-'}
								</div>
								<div
									className={'non-copy'}
									data-prog-cell
									style={{
										background: `linear-gradient(90deg, #9b49ff 0%, #9b49ff ${
											reco.g
										}%, #fff ${reco.g ?? 0}%, #fff 100%)`,
										textAlign: 'right',
									}}
								>
									{reco.g?.toFixed(1)}
								</div>
							</ColorTr>
						))}
					</div>
					{histories.length >= 100 && (
						<p>{histories.length}中100件のみ表示しています</p>
					)}
					<button onClick={() => setViewAll((v) => !v)}>
						{viewAll ? '隠す▲' : '全表示する▶'}
					</button>
				</div>
			</TabPanel>
			<TabPanel value={tab} index={1}>
				<CountsPage counts={counts} countsSong={countsSong} />
			</TabPanel>
			<TabPanel value={tab} index={2}>
				<SearchQueryLab />
			</TabPanel>
			<TabPanel value={tab} index={3}>
				<RecoilRoot>
					<SettingPage />
				</RecoilRoot>
			</TabPanel>

			<Address />
			<div>
				<button onClick={fixDb}>重複・履歴抜け修正ボタン</button>
			</div>
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
	.hist-copy {
		font-family: 'Roboto Mono', monospace;
	}
	.hist {
		width: 100%;
		font-family: 'Roboto Mono', monospace;

		.hist-head,
		.hist-row {
			width: max(96vw, 600px);
			display: grid;
			grid-template-columns: 184px 1fr 1.5rem 2rem 2rem 2rem;
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
					overflow: auto;
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
	> div {
		padding: 2px;
	}
	> div:first-child {
		border-left: solid var(--daytime-color) 8px;
	}
	--bg-strip-color1: #98e0ff;
	--bg-strip-color2: #e5faff;
	@media (prefers-color-scheme: dark) {
		--bg-strip-color1: #002737;
		--bg-strip-color2: #003c4b;
	}
	&[data-h2='0'] {
		> div:first-child {
			background: var(--bg-strip-color1);
		}
	}
	&[data-h2='1'] {
		> div:first-child {
			background: var(--bg-strip-color2);
		}
	}
	[data-prog-cell] {
		color: black;
	}
`

export default HistoryPage
