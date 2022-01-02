import { useMemo } from 'react'
import styled from 'styled-components'
import { AnimeVotes, useCvoteDb } from './useCvoteDb'

export type Char = {
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
	disabled: boolean
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

function CVote({ animeId, chars, sid, disabled }: Props) {
	const { loaded, votes, vote, voted, votedChar, votesNorm } = useCvoteDb(
		animeId,
		sid
	)

	const charVotes = useMemo(
		() => chars.map((c) => toCharVote(c, votedChar, votes, votesNorm)),
		[chars, votes, votedChar]
	)

	if (!loaded) return null

	return (
		<Container data-voteend={disabled || !!voted}>
			{charVotes.map((char) => (
				<button
					key={`char-${char.id}`}
					data-voted={char.selected}
					disabled={disabled}
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
	flex-wrap: wrap;

	button {
		margin: 0;
		width: 72px;
		height: min-content;
		padding: 0;
		text-align: center;

		&[data-voted='true'] {
			border-style: double;
			animation: bound-anim 1s;
		}
		&[data-voted='false'] {
			margin: 3px;
		}

		@keyframes bound-anim {
			0%,
			100% {
				transform: scale(1), translateY(0);
			}
			30% {
				top: -60%;
				transform: scale(0.96, 1.04) translateY(-20px);
			}
			60% {
				transform: scale(1);
			}
			90% {
				top: 0;
				transform: scale(1.15, 0.9);
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
