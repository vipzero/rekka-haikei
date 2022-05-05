import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { AnaVotes, AnimeVotes, useCvoteDb } from './useCvoteDb'

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
	votePer: number
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
	voteNorm: AnaVotes,
	initVotes: AnimeVotes
): CharVote => {
	const count = votes[char.id] || 0
	const newCount = count - (initVotes[char.id] || 0)
	return {
		...char,
		count,
		newCount,
		voteNorm: voteNorm[char.id]?.perTop || 0,
		votePer: voteNorm[char.id]?.perAll || 0,
		selected: !!votedChars[char.id],
	}
}

const TOTL_MODE = 'totl'
const PLUS_MODE = 'plus'
const HIDE_MODE = 'hide'
const modes = [TOTL_MODE, PLUS_MODE, HIDE_MODE] as const
type Mode = typeof modes[number]
const modeLabel: Record<Mode, string> = {
	totl: '投票(合計)',
	plus: '投票(差分)',
	hide: '投票を開く',
}

function CVote({ animeId, chars, sid, disabled }: Props) {
	const {
		loaded,
		votes,
		vote,
		votedChars,
		votesNorm,
		initVotes,
		voteEnd,
		votedNum,
	} = useCvoteDb(animeId, sid)
	const [mode, setMode] = useState<Mode>(modes[0])
	const cycleMode = () =>
		setMode((v) => modes[(modes.indexOf(v) + 1) % modes.length])

	const charVotes = useMemo(
		() =>
			chars.map((c) => toCharVote(c, votedChars, votes, votesNorm, initVotes)),
		[chars, votes, votedChars, votesNorm, initVotes]
	)

	if (!loaded) return null

	return (
		<Container>
			<button
				className="btn-main"
				onClick={(e) => {
					cycleMode()
					e.stopPropagation()
				}}
			>
				{modeLabel[mode]}[{votedNum}/1]
			</button>

			<div
				className="votes"
				data-voteend={disabled}
				data-util-hide={mode === 'hide'}
			>
				{charVotes.map((char) => (
					<button
						key={`char-${char.id}`}
						data-voted={char.selected}
						disabled={disabled || char.selected || voteEnd}
						onClick={() => vote(char.id)}
						style={{
							borderColor: char.color,
							marginTop: `${(1 - char.voteNorm) * 10}px`,
						}}
					>
						<div>
							<div>
								{char.name}:{' '}
								{mode === 'totl' ? char.count : `+${char.newCount}`}
							</div>
						</div>
					</button>
				))}
			</div>
			<div data-util-hide={mode === 'hide'}>
				<Bar cvotes={charVotes}></Bar>
			</div>
		</Container>
	)
}

const Bar = ({ cvotes }: { cvotes: CharVote[] }) => {
	return (
		<div style={{ display: 'flex', fontSize: '10px', color: 'transparent' }}>
			{cvotes.map((cv) => (
				<div
					className="tooltip"
					key={cv.id}
					style={{ width: `${cv.votePer * 100}%`, background: cv.color }}
				>
					<div className="tooltip-text">{cv.name}</div>
					{'.'}
				</div>
			))}
		</div>
	)
}

const Container = styled.div`
	.btn-main {
		font-size: 0.6rem;
		border-bottom: solid 4px gray;
		padding: 0 12px;
	}

	.votes {
		display: flex;
		padding: 0;
		margin-top: 8px;
		flex-wrap: wrap;
		> button {
			margin: 0;
			width: 56px;
			height: min-content;
			padding: 0;
			text-align: center;
			font-size: 0.6rem;
			border-top-width: 8px !important;

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
	}

	&[data-voteend='false'] {
		button {
			cursor: pointer;
		}
	}
`

export default CVote
