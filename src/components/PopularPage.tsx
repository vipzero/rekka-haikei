import React, { useMemo } from 'react'
import styled from 'styled-components'
import config from '../config'
import { useBookDb } from '../hooks/useBookDb'
import { useFavorites, useSyncFavorite } from '../hooks/useFavorites'
import { useHistoryDb } from '../hooks/useHistoryDb'

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

	const histLib = useMemo(() => {
		const lib: Record<string, boolean> = {}
		histories.forEach((h) => {
			lib[h.title] = true
		})
		return lib
	}, [histories])

	return (
		<div>
			<h3>人気ブックマーク</h3>
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
					{Object.keys(favorites).map((id) => (
						<p key={id} style={{ lineHeight: '1.0rem', margin: '8px' }}>
							{id}
							{histLib[id] || '(現行曲になし!!)'}
						</p>
					))}
				</div>
			)}
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
`

function PopularPage() {
	return <Page />
}

export default PopularPage
