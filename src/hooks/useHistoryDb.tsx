import { useEffect, useState } from 'react'
import { getHistories } from '../../service/firebase'
import { Count, History } from '../types'
import { formatDate } from '../util'
import { useQeuryEid } from './useQueryEid'

function makeCounts(histories: History[]) {
	const o: Record<string, number[]> = {}

	histories.forEach((history) => {
		if (!o[history.title]) o[history.title] = []
		o[history.title].push(history.time)
	})
	const ents = Object.entries(o)

	ents.sort((a, b) => b[1].length - a[1].length)
	return ents.map(([title, times]) => {
		times.sort((a, b) => a - b)
		return { title, times, timesStr: times.map(formatDate) }
	})
}

export function useHistoryDb() {
	const [histories, setHistories] = useState<History[]>([])
	const [counts, setCounts] = useState<Count[]>([])
	const [countsSong, setCountsSong] = useState<Count[]>([])
	const eventId = useQeuryEid()

	useEffect(() => {
		getHistories(eventId).then((snaps) => {
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

			setHistories(histories)

			const counts = makeCounts(histories)
			const countsSong = makeCounts(
				histories.map((h) => {
					const [artist, songTitle] = h.title.split(' - ')
					const key = songTitle || artist || 'none'

					return { ...h, title: key }
				})
			)

			setCounts(counts)
			setCountsSong(countsSong)
		})
	}, [eventId])

	return [histories, counts, countsSong] as const
}
