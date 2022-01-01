import { useEffect, useState } from 'react'
import { getFirestore } from '../../../../service/firebase'
import firebase from 'firebase/app'
import { useLocalStorage } from '../../../hooks/useLocalStorage'

type AnimeVotes = Record<string, number>

export function useCvoteDb(animeId: string, sid: string) {
	const [loaded, setLoaded] = useState<boolean>(false)
	const [votes, setVotes] = useState<AnimeVotes>({})
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
				setVotes(snap.data() as AnimeVotes)
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

	return { loaded, votes, vote, voted, votedChar }
}
