import { useState } from 'react'
import styled from 'styled-components'
import { TabPanel, Tabs } from '../common/Tab'
import { BookmarkList } from './BookmarkList'

function Page() {
	return (
		<Wrap>
			<CountTable />
		</Wrap>
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
