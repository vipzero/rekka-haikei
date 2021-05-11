import { useEffect, useState } from 'react'
import { getCounts } from '../../service/firebase'
import { WordCount } from '../types'

export function useCountDb(eventId) {
	const [counts, setCounts] = useState<WordCount[]>([])

	useEffect(() => {
		getCounts(eventId).then((snaps) => {
			const counts = snaps.docs.map((snap) => snap.data() as WordCount)

			setCounts(counts)
		})
	}, [])

	return [counts] as const
}
