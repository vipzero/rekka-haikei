import config from '../../config'
import { Count } from '../../types'

type Props = {
	title: string
	counts: Count[]
}

export function CountTable({ counts, title }: Props) {
	return (
		<div>
			<h3>{title}</h3>
			<table className="count">
				<thead>
					<tr>
						<th>タイトル</th>
						<th>回数</th>
						<th>日時</th>
					</tr>
				</thead>
				<tbody>
					{counts.slice(0, config.visibleRecordLimit).map((count, i) => (
						<tr key={i}>
							<td>{count.title}</td>
							<td>{count.times.length}</td>
							<td>
								<ul>
									{count.timesStr.map((s) => (
										<li key={s}>{s}</li>
									))}
								</ul>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{counts.length >= 100 && <p>100件までのみ表示しています</p>}
		</div>
	)
}
