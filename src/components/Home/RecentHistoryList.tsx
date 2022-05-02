import React from 'react'
import { useRecentHistoryDb } from '../../hooks/useRecentHistoryDb'
import { useSettingsShowHistory } from '../../hooks/useSettings'
import { formatDate } from '../../util'

function RecentHistoryList() {
	const { visible, closeHistory } = useSettingsShowHistory()

	const histories = useRecentHistoryDb(visible)

	if (!histories) return <p>loading</p>

	return (
		<div
			className="recenthistory"
			onClick={(e) => e.stopPropagation()}
			style={{ display: visible ? 'block' : 'none' }}
		>
			<p>
				■履歴
				<span className="moc" style={{ float: 'right' }} onClick={closeHistory}>
					x
				</span>
			</p>
			{histories.map((hist, i) => (
				<p key={i}>
					{formatDate(hist.time)}: {hist.title}
				</p>
			))}
		</div>
	)
}

export default RecentHistoryList
