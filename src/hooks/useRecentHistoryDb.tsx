import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { History, HistoryRaw } from '../types'
import { formatDate } from '../util'
import { useQeuryEid } from './useQueryEid'

function toHistory({ title, time }: HistoryRaw): History {
	const timeStr = formatDate(time)
	const timeCate = timeStr.substring(12, 13)

	return { title, time, timeStr, timeCate }
}

export function useRecentHistoryDb(enabled: boolean) {
	const [histories, setHistories] = useState<History[]>([])
	const eventId = useQeuryEid()

	useEffect(() => {
		if (!enabled) return

		const fdb = getFirestore()
		const si = fdb
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

		return () => si()
	}, [eventId, enabled])
	return histories
}
