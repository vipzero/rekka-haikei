import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useScheduleDb } from '../../hooks/useHistoryDb'
import { Schedule } from '../../types'

type Props = {
	setFilter?: (range: { start: number; end: number }) => void
}
function ScheduleComp(props: Props) {
	const { schedule, setSchedule, save } = useScheduleDb()

	return (
		<div>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
				<ScheduleTable schedule={schedule} setFilter={props.setFilter} />
				<div>
					<textarea
						style={{ width: '100%' }}
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
				</div>
			</div>
		</div>
	)
}

const fills: Record<number, boolean> = [...Array(24).keys()].reduce(
	(p, c) => ({ ...p, [c]: false }),
	{}
)

type FillCell = { start: Date; end: Date; hn: number }
type ScheduleCell = FillCell | 'skip' | 'emp'
type ScheduleRow = {
	day: string
	items: ScheduleCell[]
}
function ScheduleTable({
	schedule,
	setFilter,
}: {
	schedule: Schedule
	setFilter?: (range: { start: number; end: number }) => void
}) {
	const rows = useMemo(() => {
		const rows: Record<string, ScheduleRow> = {}

		try {
			schedule.text
				.trim()
				.split('\n')
				.filter(Boolean)
				.forEach((line) => {
					const [day, s, e, name, memo] = line.split(',')
					const start = new Date(`${day} ${s}:00:00`)
					const end = new Date(`${day} ${e}:00:00`)
					if (!rows[day]) rows[day] = { day, items: [] }
					const hn = Number(e) - Number(s)

					rows[day].items.push({ start, end, hn })
				})
			const rows2: Record<string, ScheduleRow> = {}
			const empCells: ScheduleCell[] = Object.values(fills).map(
				() => 'emp' as const
			)

			for (const [day, row] of Object.entries(rows)) {
				const cells = [...empCells]
				row.items.forEach((item) => {
					if (item === 'emp' || item === 'skip') return
					cells[item.start.getHours()] = item
					for (
						let i = item.start.getHours() + 1;
						i < item.end.getHours();
						i++
					) {
						cells[i] = 'skip'
					}
				})
				rows2[day] = { day, items: cells }
			}
			return rows2
		} catch (e) {}
		return {}
	}, [schedule.text])
	return (
		<div>
			<Table>
				<thead>
					<tr>
						{['day', ...Array(24).keys()].map((d, i) => (
							<th key={d}>{d}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Object.entries(rows).map(([day, row]) => (
						<tr key={day}>
							<th>{toMd(day)}</th>
							{row.items.map((item, i) => {
								switch (item) {
									case 'emp':
										return <td className="emp"></td>
									case 'skip':
										return null
									default:
										return (
											<td
												key={i}
												className="filled"
												colSpan={item.hn}
												onClick={() =>
													setFilter &&
													setFilter({ start: +item.start, end: +item.end })
												}
											>
												◆
											</td>
										)
								}
							})}
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}
const Table = styled.table`
	font-size: 0.5rem;
	th {
		width: 4%;
	}
	td {
		text-align: center;
		&.filled {
			border: solid 1px;
			&:hover {
				cursor: pointer;
				background: rgba(0, 0, 0, 0.3);
			}
		}
	}
`

export default ScheduleComp

const toMd = (ymd: string) => {
	const [y, m, d] = ymd.split('/')
	return `${m || '-'}/${d || '-'}`
}
