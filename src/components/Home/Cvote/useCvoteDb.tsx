import { useEffect, useState } from 'react'
import { readCvote, voteChar } from '../../../service/firebase'
import { useLocalStorage } from '../../../hooks/useLocalStorage'

export type AnimeVotes = Record<string, number>
export type AnaVotes = Record<string, { perAll: number; perTop: number }>
const normalizeVotes = (votes: AnimeVotes) => {
	const normalized = {} as AnaVotes
	const top = Object.values(votes).reduce((a, b) => Math.max(a, b))
	const total = Object.values(votes).reduce((a, b) => a + b)
	Object.keys(votes).forEach((id) => {
		normalized[id] = { perTop: votes[id] / top, perAll: votes[id] / total }
	})
	return normalized
}

export function useCvoteDb(animeId: string, sid: string, charNum: number) {
	const [loaded, setLoaded] = useState<boolean>(false)
	const [votes, setVotes] = useState<AnimeVotes>({})
	const [max, setMax] = useState<number>(1)
	const [initVotes, setInitVotes] = useState<AnimeVotes>({})
	const [votesNorm, setVotesNorm] = useState<AnaVotes>({})
	const [[lastVote, votedChars], setLastVote] = useLocalStorage<
		[string, Record<string, boolean>]
	>('last-cvote', ['-', {}])

	useEffect(() => {
		if (lastVote === sid) return
		setLastVote([sid, {}])
		setMax((Number(sid) % Math.ceil(Math.sqrt(charNum))) + 1)
	}, [sid, charNum])

	useEffect(() => {
		if (loaded) setInitVotes(votes)
	}, [animeId, loaded])

	useEffect(() => {
		const si = readCvote(animeId, (votes) => {
			setVotes(votes)
			setVotesNorm(normalizeVotes(votes))

			setLoaded(true)
		})

		return () => {
			setLoaded(false)
			si()
		}
	}, [animeId])
	const votedNum = Object.values(votedChars).length
	const voteEnd = votedNum >= max

	const sendVote = async (charId: string) => {
		if (votedChars[charId] || voteEnd) {
			console.warn('no stream setup')
			return
		}

		setLastVote(([sid, vc]) => [sid, { ...vc, [charId]: true }])
		await voteChar(animeId, charId)
	}

	return {
		max,
		loaded,
		votes,
		sendVote,
		votedChars,
		votesNorm,
		initVotes,
		voteEnd,
		votedNum,
	}
}
