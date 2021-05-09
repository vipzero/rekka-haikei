import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { WordCount } from '../../types'

export function useCountDb(eventId) {
	const [counts, setCounts] = useState<WordCount[]>([])

	useEffect(() => {
		const fdb = getFirestore()

		fdb
			.collection('hist')
			.doc(eventId)
			.collection('counts')
			.orderBy('count', 'desc')
			.limit(200)
			.get()
			.then((snaps) => {
				const counts = snaps.docs.map((snap) => snap.data() as WordCount)

				setCounts(counts)
			})
	}, [])

	return [counts] as const
}
