import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { History, HistoryRaw } from '../../types'
import { formatDate } from '../util'

function toHistory({ title, time }: HistoryRaw): History {
	const timeStr = formatDate(time)
	const timeCate = timeStr.substring(12, 13)

	return { title, time, timeStr, timeCate }
}

export function useRecentHistoryDb(eventId: string) {
	const [histories, setHistories] = useState<History[]>([])

	useEffect(() => {
		const fdb = getFirestore()

		fdb
			.collection('hist')
			.doc(eventId)
			.collection('songs')
			.orderBy('time', 'desc')
			.limit(10)
			.onSnapshot((snaps) => {
				const histories = snaps.docs.map((snap) =>
					toHistory(snap.data() as HistoryRaw)
				)

				setHistories(histories)
			})
	})
	return histories
}
