import styled from 'styled-components'
import { ScheduleRow } from './Schedule'

function ScheduleTable({
	rows,
	setFilter,
}: {
	rows: Record<string, ScheduleRow>
	setFilter?: (range: { start: number; end: number }) => void
}) {
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
										return <td key={i} className="emp"></td>
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
												{item.memo?.substring(0, 8)}
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
	width: 100%;
	table-layout: fixed;
	th {
		width: 4%;
		&:first-child {
			width: 7%;
		}
	}
	td {
		text-align: center;
		padding: 2px;
		&.filled {
			border: solid 1px;
			overflow: hidden;
			white-space: nowrap;
			&:hover {
				cursor: pointer;
				background: rgba(0, 0, 0, 0.3);
			}
		}
	}
`

const toMd = (ymd: string) => {
	const [y, m, d] = ymd.split('/')
	return `${m || '-'}/${d || '-'}`
}

export default ScheduleTable
