import React from 'react'
import { useRecoilState } from 'recoil'
import { settingState } from '../../atom/SettingAtom'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { useRecentHistoryDb } from '../../hooks/useRecentHistoryDb'

function RecentHistoryList() {
	const [{ showHistory: visible }, setSetting] = useRecoilState(settingState)
	const closeHistory = () => setSetting((v) => ({ ...v, showHistory: false }))
	const eventId = useQeuryEid()
	const histories = useRecentHistoryDb(eventId)

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
					{hist.timeStr}: {hist.title}
				</p>
			))}
		</div>
	)
}
export default RecentHistoryList
