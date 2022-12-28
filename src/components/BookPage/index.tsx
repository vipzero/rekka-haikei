import { useState } from 'react'
import styled from 'styled-components'
import { useSnaps } from '../../hooks/useFavorites'
import { TabPanel, Tabs } from '../common/Tab'
import { BookmarkList } from './BookmarkList'
import { SnapReplica } from './SnapReplica'

function Page() {
	return (
		<Wrap>
			<CountTable />
		</Wrap>
	)
}

export function Snaps() {
	const { snaps, removeSnap } = useSnaps()

	return (
		<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
			{snaps.map((snap, i) => (
				<SnapReplica key={i} snap={snap} onDelete={() => removeSnap(i)} />
			))}
		</div>
	)
}

function CountTable() {
	const [tab, setTab] = useState<number>(0)

	return (
		<div>
			<h3>ブックマーク</h3>
			<p>
				<a href="./bg">戻る</a>
			</p>
			{/* <Snaps /> */}

			<Tabs items={[{ label: 'リスト' }]} onChange={setTab} />
			<TabPanel value={tab} index={0}>
				<BookmarkList />
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
