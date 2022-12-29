import styled from 'styled-components'
import { useCountDb } from '../../hooks/useCountDb'

export function WordCountTable() {
	const [counts, [ytags, ytn], [stags, stn]] = useCountDb()

	return (
		<Style>
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
			<div className="time-tags">
				<section>
					<h3>年</h3>
					<div>
						{ytags.map(({ word, count }) => (
							<div key={word} className="tag-graph">
								<span>{word}</span>
								<progress value={count} max={ytn} />
							</div>
						))}
					</div>
				</section>
				<section>
					<h3>シーズン</h3>
					<div
						style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}
					>
						{stags.map(({ word, count }) => (
							<div key={word} className="tag-graph">
								<span>{word}</span>
								<progress value={count} max={stn} />
							</div>
						))}
					</div>
				</section>
			</div>
		</Style>
	)
}

const Style = styled.div`
	.time-tags {
		display: grid;
		grid-template-columns: 1fr 2fr;
	}
	.tag-graph {
		span {
			font-family: ui-monospace;
			width: 100px;
		}
	}
`
