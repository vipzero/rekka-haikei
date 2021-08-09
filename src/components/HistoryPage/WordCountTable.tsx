import { useCountDb } from '../../hooks/useCountDb'

export function WordCountTable() {
	const [counts] = useCountDb()

	return (
		<div>
			<h3>タグカウント</h3>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
				{counts.map((v, i) => (
					<div key={i}>
						<span>{v.word}</span>
						<span>({v.count})</span>
					</div>
				))}
			</div>
		</div>
	)
}
