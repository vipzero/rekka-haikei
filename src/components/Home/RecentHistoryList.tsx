import { useRecentHistoryDb } from '../../hooks/useRecentHistoryDb'
import { useSettingsShowHistory } from '../../hooks/useSettings'
import { formatTimes } from '../../util'

function RecentHistoryList() {
	const { visible, closeHistory } = useSettingsShowHistory()

	const histories = useRecentHistoryDb(visible)

	if (!histories) return <p>loading</p>

	return (
		<div
			className="co-recenthist co-panel"
			onClick={(e) => e.stopPropagation()}
			style={{ display: visible ? 'block' : 'none' }}
		>
			<p>
				■履歴
				<span className="moc" onClick={closeHistory}>
					x
				</span>
			</p>
			{histories.map((hist, i) => {
				const { h, m, s } = formatTimes(hist.time)
				const hs = String(Number(h)).padStart(2, '\u00A0')
				const pHist = histories[i + 1]
				const { h: ph } = pHist ? formatTimes(pHist.time) : { h: '--' }

				return (
					<p key={i}>
						<span className="mono">
							<span className="hh" style={{ opacity: ph === h ? 0.3 : 1 }}>
								{hs}:
							</span>
							<span className="mm">{m}</span>
							<span className="ss">:{s}</span>
							&nbsp;
						</span>
						<span>{hist.title}</span>
					</p>
				)
			})}
		</div>
	)
}

export default RecentHistoryList
