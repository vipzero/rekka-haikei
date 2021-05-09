import React from 'react'
import styled from 'styled-components'
import config from '../config'
import { useBookDb } from '../hooks/useBookDb'
import { useFavorites, useSyncFavorite } from '../hooks/useFavorites'

function Page() {
	// const lastTime = useIsLastTime()

	// if (!lastTime) return <p>23時までまってね...</p>

	return (
		<Wrap>
			<CountTable />
		</Wrap>
	)
}

function CountTable() {
	const [books, postCount] = useBookDb(config.eventId)
	const { favorites } = useFavorites()
	const [synced, doSync] = useSyncFavorite()

	if (!favorites) return <p>loading</p>

	return (
		<div>
			<h3>人気ブックマーク</h3>
			{!synced && (
				<p>
					自分のブックマーク({Object.keys(favorites).length}) 件を投票しますか？
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

function PopularContainer() {
	return <Page />
}

export default PopularContainer
