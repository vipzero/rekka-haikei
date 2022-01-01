import styled from 'styled-components'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { useCvoteDb } from './useCvoteDb'

type Char = {
	id: string
	name: string
	color: string
}
type Props = {
	animeId: string
	sid: string
	chars: Char[]
}

function CVote({ animeId, chars, sid }: Props) {
	const { loaded, votes, vote, voted, votedChar } = useCvoteDb(animeId, sid)

	if (!loaded) return null

	return (
		<Container data-voteend={!!voted}>
			{chars.map(({ id, name, color }) => (
				<button
					key={`char-${id}`}
					data-voted={votedChar === id}
					onClick={() => vote(id)}
					style={{ borderColor: color }}
				>
					<div>
						<div className="symbol" style={{ background: color }}></div>
						<div>
							{name}: {votes[id] || 0}
						</div>
					</div>
				</button>
			))}
		</Container>
	)
}
const Container = styled.div`
	display: flex;
	padding: 0;

	button {
		width: 72px;
		padding: 0;
		text-align: center;

		&[data-voted='true'] {
			border-style: double;
			animation: jump 0.3s alternate ease-in-out;
		}
		&[data-voted='false'] {
			margin: 3px;
		}
		@keyframes jump {
			100% {
				transform: translateY(-20px);
			}
		}
	}
	.symbol {
		width: 100%;
		height: 1rem;
	}

	&[data-voteend='false'] {
		button {
			cursor: pointer;
		}
	}
`

export default CVote
