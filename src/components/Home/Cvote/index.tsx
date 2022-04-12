import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { AnimeVotes, useCvoteDb } from './useCvoteDb'

export type Char = {
	id: string
	name: string
	color: string
}
type CharVote = Char & {
	count: number
	newCount: number
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
	votedChars: Record<string, boolean>,
	votes: AnimeVotes,
	voteNorm: AnimeVotes,
	initVotes: AnimeVotes
): CharVote => {
	const count = votes[char.id] || 0
	const newCount = count - (initVotes[char.id] || 0)
	return {
		...char,
		count,
		newCount,
		voteNorm: voteNorm[char.id] || 0,
		selected: !!votedChars[char.id],
	}
}

function CVote({ animeId, chars, sid, disabled }: Props) {
	const { loaded, votes, vote, votedChars, votesNorm, initVotes } = useCvoteDb(
		animeId,
		sid
	)
	const [countMode, setCountMode] = useState<boolean>(false)

	const charVotes = useMemo(
		() =>
			chars.map((c) => toCharVote(c, votedChars, votes, votesNorm, initVotes)),
		[chars, votes, votedChars, votesNorm, initVotes]
	)

	if (!loaded) return null

	return (
		<Container data-voteend={disabled}>
			{charVotes.map((char) => (
				<button
					key={`char-${char.id}`}
					data-voted={char.selected}
					disabled={disabled || char.selected}
					onClick={() => vote(char.id)}
					style={{
						borderColor: char.color,
						marginTop: `${(1 - char.voteNorm) * 10}px`,
					}}
				>
					<div>
						<div className="symbol" style={{ background: char.color }}></div>
						<div>
							{char.name}: {countMode ? char.count : `+${char.newCount}`}
						</div>
					</div>
				</button>
			))}
			<button onClick={() => setCountMode(!countMode)}>
				{countMode ? 'Total' : 'Show'}
			</button>
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
		width: 56px;
		height: min-content;
		padding: 0;
		text-align: center;
		font-size: 0.6rem;

		&[data-voted='true'] {
			border-style: double;
			animation: bound-anim 1s;
		}
		&[data-voted='false'] {
			margin: 3px;
			border-style: solid !important;
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
		height: 0.5rem;
	}

	&[data-voteend='false'] {
		button {
			cursor: pointer;
		}
	}
`

export default CVote
