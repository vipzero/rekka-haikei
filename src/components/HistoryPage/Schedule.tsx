import copy from 'copy-to-clipboard'
import { useState } from 'react'
import { useScheduleDb } from '../../hooks/useHistoryDb'
import { CopyButton } from '../BookPage/CopyButton'
import { TabPanel, Tabs } from '../common/Tab'
import NextSchedule from './NextSchedule'
import ScheduleTable from './ScheduleTable'

type Props = {
	setFilter?: (_range: { start: number; end: number }) => void
}
function ScheduleComp(props: Props) {
	const { schedule, setSchedule, save, todayText, rows } = useScheduleDb()

	const [tab, setTab] = useState<number>(0)

	return (
		<div>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
				<ScheduleTable rows={rows} setFilter={props.setFilter} />
				<div>
					<Tabs
						items={[{ label: 'テキスト' }, { label: '編集' }]}
						onChange={setTab}
					/>

					<TabPanel value={tab} index={0}>
						<code>
							<pre>{todayText}</pre>
						</code>
						<CopyButton onClick={() => copy(todayText)} />
					</TabPanel>
					<TabPanel value={tab} index={1}>
						<div>
							<textarea
								style={{ width: '100%', fontFamily: `'Roboto Mono'` }}
								value={schedule.text}
								rows={4}
								placeholder={`
カンマ区切り (start,end,name,memo)
2000/8/8,18,19,りんご,DJ
2000/8/8,19,20,ばなな,
`.trim()}
								onChange={(e) => setSchedule({ text: e.target.value })}
							></textarea>
							<button
								onClick={() => confirm('共有されます 保存しますか？') && save()}
							>
								保存
							</button>
							<NextSchedule rows={rows} />
						</div>
					</TabPanel>
				</div>
			</div>
		</div>
	)
}

export default ScheduleComp
