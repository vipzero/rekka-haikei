import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { History } from '../../types'

export function useHistoryDb(eventId) {
	const [histories, setHistories] = useState<History[]>([])
	const [counts, setCounts] = useState<Record<string, number[]>>({})

	useEffect(() => {
		const fdb = getFirestore()

		fdb
			.collection('hist')
			.doc(eventId)
			.collection('songs')
			.orderBy('time')
			.get()
			.then((snaps) => {
				const histories = snaps.docs.map((snap) => {
					return snap.data() as History
				})

				setHistories(histories)
				const counts: Record<string, number[]> = {}

				histories.forEach((history) => {
					if (!counts[history.title]) counts[history.title] = []
					counts[history.title].push(history.time)
				})
				setCounts(counts)
			})
	}, [])

	return [histories, counts] as const
}
