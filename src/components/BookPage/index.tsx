import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import config from '../../config'
import { useBookDb } from '../../hooks/useBookDb'
import { useFavorites, useSyncFavorite } from '../../hooks/useFavorites'
import { useHistoryDb } from '../../hooks/useHistoryDb'
import { Tab, TabPanel, Tabs } from '../common/Tab'
import { BookmarkList } from './BookmarkList'

function Page() {
	return (
		<Wrap>
			<CountTable />
		</Wrap>
	)
}

function CountTable() {
	const [books, postCount, wordCounts] = useBookDb()
	const { favorites } = useFavorites()

	const [synced, doSync] = useSyncFavorite()
	const { histories } = useHistoryDb()
	const [tab, setTab] = useState<number>(0)

	const histLib = useMemo(() => {
		const lib: Record<string, boolean> = {}
		histories.forEach((h) => {
			lib[h.title] = true
		})
		return lib
	}, [histories.length])

	return (
		<div>
			<h3>ブックマーク</h3>
			<p>
				<a href="./bg">戻る</a>
			</p>

			<Tabs
				items={[{ label: 'リスト' }, { label: '投票' }]}
				onChange={setTab}
			/>
			<TabPanel value={tab} index={0}>
				{!synced && (
					<div>
						<p>
							自分のブックマーク({Object.keys(favorites).length})
							件を投票しますか？
							<button
								onClick={() => {
									doSync(favorites).then(() => {
										alert('投票しました')
									})
								}}
							>
								送信する(1回のみ)
							</button>
						</p>
					</div>
				)}
				<BookmarkList />
			</TabPanel>
			<TabPanel value={tab} index={1}>
				<p>投票数: {postCount}</p>
				<table className="count">
					<thead>
						<tr>
							<th>タイトル</th>
							<th>人数</th>
						</tr>
					</thead>
					<tbody>
						{books.slice(0, config.visibleRecordLimit).map((count, i) => (
							<tr key={i}>
								<td>{count.icy}</td>
								<td>{count.count}</td>
							</tr>
						))}
					</tbody>
				</table>
				{books.length >= 100 && <p>100件までのみ表示しています</p>}
				<h3>人気タグ</h3>
				<table className="count">
					<thead>
						<tr>
							<th>タグ</th>
							<th>pt</th>
						</tr>
					</thead>
					<tbody>
						{wordCounts.slice(0, config.visibleRecordLimit).map((count, i) => (
							<tr key={i}>
								<td>{count.word}</td>
								<td>{count.count}</td>
							</tr>
						))}
					</tbody>
				</table>
			</TabPanel>
		</div>
	)
}

const Wrap = styled.div`
	display: grid;
	padding: 16px;

	table {
		width: 100%;
	}
	table td {
		border-top: solid 1px;
	}
`

function BookPage() {
	return <Page />
}

export default BookPage
