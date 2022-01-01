import { useEffect, useState } from 'react'
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
	const [[lastVote, votedChar], setLastVote] = useLocalStorage<
		[string, string]
	>('last-cvote', ['-', '-'])
	const voted = sid === lastVote

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
		if (voted) return
		const fdb = getFirestore()

		setLastVote([sid, charId])
		await fdb
			.collection('cvote')
			.doc(animeId)
			.update({
				[charId]: firebase.firestore.FieldValue.increment(1),
			})
	}

	return { loaded, votes, vote, voted, votedChar, votesNorm }
}
