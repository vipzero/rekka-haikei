import copy from 'copy-to-clipboard'
import { useMemo, useState } from 'react'
import * as regexpTree from 'regexp-tree'
import styled from 'styled-components'
import config from '../config'
import { useFavorites } from '../hooks/useFavorites'
import { useHistoryAuth } from '../hooks/useHistoryAuth'
import { useHistoryDb } from '../hooks/useHistoryDb'
import {
	useIsCurrentEvent,
	useQeuryEid,
	useQueryInit,
} from '../hooks/useQueryEid'
import { useStart } from '../hooks/useStart'
import { History } from '../types'
import { formatDate } from '../util'
import { safeRegex } from '../util/regex'
import { CopyButton } from './BookPage/CopyButton'
import CountsPage from './CountsPage'
import Address from './HistoryPage/Address'
import Schedule from './HistoryPage/Schedule'
import { SettingPage } from './HistoryPage/SettingPage'
import { TableItem } from './HistoryPage/TableItem'
import { HistorySearchForm } from './HistorySearchForm'
import { Toast } from './Toast'
import { CheckBox } from './common/CheckBox'
import { TabPanel, Tabs } from './common/Tab'

const getNamedGroups = (str: RegExp) => {
	const ast = regexpTree.parse(str, {
		// captureLocations: true,
	})
	let name: null | string = null
	regexpTree.traverse(ast, {
		Group({ node }) {
			if (node.capturing && node.name) name = node.name
		},
	})
	return name
}

const searchHit = (
	search: string,
	text: string,
	r: RegExp | false
): { hit: boolean; name?: string } => {
	if (r) {
		const res = r.exec(text)
		if (res === null) return { hit: false }
		return {
			hit: true,
			name: res.groups ? Object.keys(res.groups)[0] : undefined,
		}
		// (?<hoge>) 名前付きグループに対応する
	}
	return {
		hit: text.toLowerCase().includes(search.toLowerCase()),
	}
}

const searchFilter = (
	searchs: string[],
	rangedHists: History[]
): [History[], Record<string, number> | null, Record<string, string>] => {
	if (searchs.length === 0) return [rangedHists, null, {}]

	const preHists = rangedHists

	const result: Record<string, number> = {}
	const resultAlias: Record<string, string> = {}

	const searchParts = searchs.map((s) => {
		result[s] = 0
		const ok = safeRegex(s)

		const r = new RegExp(s, 'iu')
		const name = getNamedGroups(r)
		if (name) resultAlias[s] = name
		return [s, ok && r] as const
	})
	const histories: History[] = []

	preHists.forEach((v) => {
		const hits = searchParts.map(([s, r]) => {
			const { hit } = searchHit(s, v.title, r)

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

	return [histories, result, resultAlias]
}

const rangeFilter = (range: Range, time: number) => {
	if (range === null) return true
	return range.start <= time && time <= range.end
}

type Range = null | { start: number; end: number }
function HistoryPage() {
	const ready = useStart()
	const { authed, submit } = useHistoryAuth()
	const isCurrent = useIsCurrentEvent()
	console.log({ isCurrent, authed })

	if (!ready) return null
	if (!isCurrent && !authed) {
		return (
			<div style={{ padding: '1rem' }}>
				pass: <input type="password" onChange={(e) => submit(e.target.value)} />
			</div>
		)
	}

	return <HistoryPageBase />
}

const sortKeyConv: Record<string, keyof History> = {
	by_n: 'n',
	by_b: 'b',
	by_g: 'g',
}
function HistoryPageBase() {
	const { fixDb, histories, counts, countsSong } = useHistoryDb()
	const eid = useQeuryEid()

	const [searchs, setSearchs] = useState<string[]>([])
	const [copyMode, setCopyMode] = useState<boolean>(false)
	const [wrapMode, setWrapMode] = useState<boolean>(true)
	const [sortBy, setSort] = useState<'none' | 'by_n' | 'by_b' | 'by_g'>('none')
	const [range, setRange] = useState<Range>(null)
	const [viewAll, setViewAll] = useState<boolean>(false)
	const [tab, setTab] = useState<number>(0)
	const { favorites, toggleFavorites } = useFavorites()

	useQueryInit(
		(q) => setSearchs([q]),
		(tab) => setTab(tab)
	)

	const sortedHists = useMemo(() => {
		if (sortBy === 'none') return histories

		const sortKey: keyof History = sortKeyConv[sortBy] || 'n'
		const sort = (a, b) => (b[sortKey] ?? -1) - (a[sortKey] ?? -1)

		const arr = [...histories].sort(sort)
		return arr.sort()
	}, [histories, sortBy])

	const [rangedHists] = useMemo(() => {
		if (range === null) return [sortedHists]
		const rangeFiltered = sortedHists.filter((v) => rangeFilter(range, v.time))

		return [rangeFiltered]
	}, [sortedHists, range])

	const [filteredHists, searchResult, sAlias] = useMemo(() => {
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

	const searchResultTexts = [
		`履歴検索 ${eid}`,
		...searchs.map((s) => `${sAlias[s] || s}: ${searchResult?.[s]}件`),
	]
	const index2bText = (b: boolean, i: number) =>
		b ? '済' : `${i + 1}`.padStart(2, '0')
	const searchResultTexts2 = searchs.map(
		(s, i) => index2bText(!!searchResult?.[s], i) + ' ' + (sAlias[s] || s)
	)
	const toggleSort = (k: 'none' | 'by_n' | 'by_b' | 'by_g') =>
		setSort((v) => (v === k ? 'none' : k))

	return (
		<Wrap>
			<h3>{eid}</h3>
			<p>
				<a href="./bg">戻る</a>
			</p>
			<Schedule setFilter={(v) => setRange(v)} />
			<Tabs
				tab={tab}
				items={[{ label: '履歴' }, { label: 'カウント' }, { label: '設定' }]}
				onChange={setTab}
			/>

			<Toast />
			<TabPanel value={tab} index={0}>
				<div>
					<h3>履歴</h3>
					<div>
						<HistorySearchForm
							search={(text) => {
								setSearchs(text.trim().split('\n').filter(Boolean))
							}}
							searchs={searchs}
							setSearchs={setSearchs}
						/>
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
								<div className="link-like" onClick={() => toggleSort('by_b')}>
									<div className="tooltip">
										<span className="tooltip-text">ブクマ数</span>★
									</div>
								</div>
							</div>
						</div>

						{viewHists.map((reco) => (
							<TableItem
								key={reco.time}
								reco={reco}
								favorited={!!favorites[reco.title]}
								toggleFavorites={() => toggleFavorites(reco.title)}
							/>
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
				<SettingPage />
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
	}

	[data-copy-mode='true'],
	.option-box-word {
		border: solid 1px orange;
		background: var(--color-bg-sub);
		button {
			box-shadow: none;
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
			grid-template-columns: 188px 1fr 1.5rem 2rem;
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
				grid-template-columns: 188px 1fr;
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

export default HistoryPage
