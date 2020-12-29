import { padStart } from 'lodash'
import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { Count, History } from '../../types'

function formatDate(time: number) {
	const date = new Date(time)

	const yyyy = date.getFullYear()
	const mm = String(date.getMonth() + 1).padStart(2, '0')
	const dd = String(date.getDate()).padStart(2, '0')
	const h = String(date.getHours()).padStart(2, '0')
	const m = String(date.getMinutes()).padStart(2, '0')
	const s = String(date.getSeconds()).padStart(2, '0')

	return `${yyyy}-${mm}-${dd} ${h}:${m}:${s}`
}

export function useHistoryDb(eventId) {
	const [histories, setHistories] = useState<History[]>([])
	const [counts, setCounts] = useState<Count[]>([])

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
					const v = snap.data()

					return {
						title: v.title,
						time: v.time,
						timeStr: formatDate(v.time),
					}
				})

				histories.reverse()
				setHistories(histories)
				const o: Record<string, number[]> = {}

				histories.forEach((history) => {
					if (!o[history.title]) o[history.title] = []
					o[history.title].push(history.time)
				})
				const ents = Object.entries(o)

				ents.sort((a, b) => b[1].length - a[1].length)
				const counts = ents.map(([title, times]) => {
					times.sort((a, b) => a - b)
					return { title, times, timesStr: times.map(formatDate) }
				})

				setCounts(counts)
			})
	}, [])

	return [histories, counts] as const
}
