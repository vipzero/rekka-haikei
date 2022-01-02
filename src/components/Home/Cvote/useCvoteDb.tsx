import { useEffect, useMemo, useState } from 'react'
import { getFirestore } from '../../../../service/firebase'
import firebase from 'firebase/app'
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
		const fdb = getFirestore()

		const si = fdb
			.collection('cvote')
			.doc(animeId)
			.onSnapshot((snap) => {
				if (!snap.exists) return
				const votes = snap.data() as AnimeVotes
				setVotes(votes)
				setVotesNorm(normalizeVotes(votes))
				setLoaded(true)
			})

		return () => si()
	}, [animeId])

	const vote = async (charId: string) => {
		if (votedChars[charId]) return
		const fdb = getFirestore()

		setLastVote(([sid, vc]) => [sid, { ...vc, [charId]: true }])
		await fdb
			.collection('cvote')
			.doc(animeId)
			.update({
				[charId]: firebase.firestore.FieldValue.increment(1),
			})
	}

	return { loaded, votes, vote, votedChars, votesNorm }
}
