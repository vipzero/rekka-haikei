import { useEffect, useState } from 'react'
import { getCounts } from '../service/firebase'
import { WordCount } from '../types'
import { useQeuryEid } from './useQueryEid'

export function useCountDb() {
	const eventId = useQeuryEid()
	const [counts, setCounts] = useState<WordCount[]>([])

	useEffect(() => {
		getCounts(eventId).then((snaps) => {
			const counts = snaps.docs.map((snap) => snap.data() as WordCount)

			setCounts(counts)
		})
	}, [eventId])

	return [counts] as const
}
