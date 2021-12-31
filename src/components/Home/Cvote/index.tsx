import styled from 'styled-components'
import { useCvoteDb } from './useCvoteDb'

type Char = {
	id: string
	name: string
	color: string
}
type Props = {
	animeId: string
	chars: Char[]
}

function CVote({ animeId, chars }: Props) {
	const { loaded, votes, vote, voted } = useCvoteDb(animeId)

	if (!loaded) return null

	return (
		<Container data-voteend={!!voted}>
			{chars.map(({ id, name, color }) => (
				<button
					key={`char-${id}`}
					data-voted={voted === id}
					onClick={() => {
						vote(id)
					}}
					style={{ borderColor: color }}
				>
					<div>
						<div className="symbol" style={{ background: color }}></div>
						<div>
							{name}[{votes[id] || 0}]
						</div>
					</div>
				</button>
			))}
		</Container>
	)
}
const Container = styled.div`
	display: flex;
	button > div {
		display: grid;
		justify-content: center;
		place-items: center;
		padding: 4px 2px;
	}
	&[data-voteend='true'] {
	}
	button[data-voted='true'] {
		border: solid;
	}
	.symbol {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}
	&[data-voteend='false'] {
		button {
			cursor: pointer;
		}
	}
`

export default CVote
