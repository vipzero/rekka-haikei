import config from '../../config'
import { useHistoryAnaCounts } from '../../hooks/useHistoryDb'
import { Count } from '../../types'

type Props = {
	counts: Count[]
}

export function ComparePage({ counts }: Props) {
	const res = useHistoryAnaCounts(counts)
	if (!res) return <p> loading</p>
	const { newSongs, nonSongs } = res

	return (
		<div>
			<h3>流れてない曲</h3>
			<table className="count">
				<thead>
					<tr>
						<th>タイトル</th>
						<th>今回 - 前回</th>
					</tr>
				</thead>
				<tbody>
					{nonSongs.slice(0, 200).map((count, i) => (
						<tr key={i}>
							<td>{count.title}</td>
							<td>{count.pt}</td>
						</tr>
					))}
				</tbody>
			</table>
			<p>200件までかつ3回以上のみ表示しています</p>

			<h3>初めて流れた曲</h3>
			<table className="count">
				<thead>
					<tr>
						<th>タイトル</th>
						<th>今回 - 前回</th>
					</tr>
				</thead>
				<tbody>
					{newSongs.slice(0, config.visibleRecordLimit).map((count, i) => (
						<tr key={i}>
							<td>{count.title}</td>
							<td>{count.pt}</td>
						</tr>
					))}
				</tbody>
			</table>
			<p>100件までのみ表示しています</p>
		</div>
	)
}
