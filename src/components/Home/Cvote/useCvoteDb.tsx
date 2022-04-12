import { useEffect, useState } from 'react'
import { readCvote, voteChar } from '../../../../service/firebase'
import { useLocalStorage } from '../../../hooks/useLocalStorage'

export type AnimeVotes = Record<string, number>
const normalizeVotes = (votes: AnimeVotes) => {
	const normalized = {} as AnimeVotes
	const max = Object.values(votes).reduce((a, b) => Math.max(a, b))
	Object.keys(votes).forEach((id) => {
		normalized[id] = votes[id] / max
	})
	return normalized
}

export function useCvoteDb(animeId: string, sid: string) {
	const [loaded, setLoaded] = useState<boolean>(false)
	const [votes, setVotes] = useState<AnimeVotes>({})
	const [votesNorm, setVotesNorm] = useState<AnimeVotes>({})
	const [[lastVote, votedChars], setLastVote] = useLocalStorage<
		[string, Record<string, boolean>]
	>('last-cvote', ['-', {}])

	useEffect(() => {
		if (lastVote === sid) return
		setLastVote([sid, {}])
	}, [sid])

	useEffect(() => {
		const si = readCvote(animeId, (votes) => {
			setVotes(votes)
			setVotesNorm(normalizeVotes(votes))
			const firstLoad = !loaded
			if (firstLoad) {
				//
			}
			setLoaded(true)
		})

		return () => si()
	}, [animeId])

	const vote = async (charId: string) => {
		if (votedChars[charId]) {
			console.warn('no stream setup')
			return
		}

		setLastVote(([sid, vc]) => [sid, { ...vc, [charId]: true }])
		await voteChar(animeId, charId)
	}

	return { loaded, votes, vote, votedChars, votesNorm }
}
