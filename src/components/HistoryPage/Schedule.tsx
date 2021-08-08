import React from 'react'
import { useScheduleDb } from '../../hooks/useHistoryDb'

type Props = {}
function Schedule(props: Props) {
	const { schedule, setSchedule } = useScheduleDb()
	return (
		<div>
			<h1>Schedule</h1>
		</div>
	)
}
export default Schedule
