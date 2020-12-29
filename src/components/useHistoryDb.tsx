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

function makeCounts(histories: History[]) {
	const o: Record<string, number[]> = {}

	histories.forEach((history) => {
		if (!o[history.title]) o[history.title] = []
		o[history.title].push(history.time)

		const [artist, songTitle] = history.title.split('-')
		const key = songTitle || artist || 'none'
	})
	const ents = Object.entries(o)

	ents.sort((a, b) => b[1].length - a[1].length)
	return ents.map(([title, times]) => {
		times.sort((a, b) => a - b)
		return { title, times, timesStr: times.map(formatDate) }
	})
}

export function useHistoryDb(eventId) {
	const [histories, setHistories] = useState<History[]>([])
	const [counts, setCounts] = useState<Count[]>([])
	const [countsSong, setCountsSong] = useState<Count[]>([])

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
					const { time, title } = snap.data()
					const timeStr = formatDate(time)

					return {
						title,
						time,
						timeStr,
						timeCate: timeStr.substring(12, 13),
					}
				})

				histories.reverse()
				setHistories(histories)

				const counts = makeCounts(histories)
				const countsSong = makeCounts(
					histories.map((h) => {
						const [artist, songTitle] = h.title.split('-')
						const key = songTitle || artist || 'none'

						return { ...h, title: key }
					})
				)

				setCounts(counts)
				setCountsSong(countsSong)
			})
	}, [])

	return [histories, counts, countsSong] as const
}
