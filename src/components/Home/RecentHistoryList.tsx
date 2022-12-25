import { useRecentHistoryDb } from '../../hooks/useRecentHistoryDb'
import { useSettingsShowHistory } from '../../hooks/useSettings'
import { formatTime } from '../../util'

function RecentHistoryList() {
	const { visible, closeHistory } = useSettingsShowHistory()

	const histories = useRecentHistoryDb(visible)

	if (!histories) return <p>loading</p>

	return (
		<div
			className="co-recenthist"
			data-co
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
					<span className="mono">{formatTime(hist.time)}</span>
					<span>{hist.title}</span>
				</p>
			))}
		</div>
	)
}

export default RecentHistoryList
