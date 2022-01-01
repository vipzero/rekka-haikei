import { useMemo } from 'react'
import styled from 'styled-components'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { AnimeVotes, useCvoteDb } from './useCvoteDb'

type Char = {
	id: string
	name: string
	color: string
}
type CharVote = Char & {
	count: number
	voteNorm: number
	selected: boolean
}
type Props = {
	animeId: string
	sid: string
	chars: Char[]
}
const toCharVote = (
	char: Char,
	votedChar: string,
	votes: AnimeVotes,
	voteNorm: AnimeVotes
): CharVote => ({
	...char,
	count: votes[char.id] || 0,
	voteNorm: voteNorm[char.id] || 0,
	selected: char.id === votedChar,
})

function CVote({ animeId, chars, sid }: Props) {
	const { loaded, votes, vote, voted, votedChar, votesNorm } = useCvoteDb(
		animeId,
		sid
	)

	const charVotes = useMemo(
		() => chars.map((c) => toCharVote(c, votedChar, votes, votesNorm)),
		[chars, voted]
	)

	if (!loaded) return null

	return (
		<Container data-voteend={!!voted}>
			{charVotes.map((char) => (
				<button
					key={`char-${char.id}`}
					data-voted={char.selected}
					onClick={() => vote(char.id)}
					style={{
						borderColor: char.color,
						marginTop: `${(1 - char.voteNorm) * 10}px`,
					}}
				>
					<div>
						<div className="symbol" style={{ background: char.color }}></div>
						<div>
							{char.name}: {char.count}
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
	margin-top: 8px;

	button {
		margin: 0;
		width: 72px;
		height: min-content;
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
