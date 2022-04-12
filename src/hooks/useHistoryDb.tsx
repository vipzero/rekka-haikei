import { useEffect, useState } from 'react'
import { getHistories, loadTable, saveTable } from '../../service/firebase'
import { Count, History, Schedule } from '../types'
import { formatDate } from '../util'
import { useQeuryEid } from './useQueryEid'
import { useLocalStorage } from './useLocalStorage'

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
		return { title, times, timesStr: times.map((t) => formatDate(t)) }
	})
}

export function useHistoryDb() {
	const eventId = useQeuryEid()
	console.log(eventId)

	const [histories, setHists] = useLocalStorage<History[]>(
		`hists__${eventId}`,
		[]
	)
	useEffect(() => {
		console.log({ eventId })
		console.log(histories.length)
	}, [])

	const [counts, setCounts] = useState<Count[]>([])
	const [countsSong, setCountsSong] = useState<Count[]>([])

	useEffect(() => {
		let any = false
		const histOld = histories
			.filter((h) => {
				if (any) return true
				const b = h.n !== null
				any = b
				return b
			})
			.map((h) => {
				// migration
				if (typeof h.timeCate === 'number') return h
				return { ...h, timeCate: new Date(h.time).getHours() }
			})
		console.log(histOld[0])

		getHistories(eventId, histOld[0]?.time || 0).then((snaps) => {
			const newHists = snaps.docs.map((snap) => {
				const { time, title, n } = snap.data()
				const timeStr = formatDate(time)

				return {
					title,
					time,
					n,
					timeStr,
					timeCate: Number(timeStr.substring(11, 13)),
				}
			})

			console.log(newHists.length)

			const hists = [...newHists, ...histOld]
			setHists(hists)

			const counts = makeCounts(hists)
			const countsSong = makeCounts(
				hists.map((h) => {
					const [artist, songTitle] = h.title.split(' - ')
					const key = songTitle || artist || 'none'

					return { ...h, title: key }
				})
			)

			setCounts(counts)
			setCountsSong(countsSong)
		})
	}, [eventId])

	return { histories, counts, countsSong } as const
}

export function useScheduleDb() {
	const [schedule, setSchedule] = useState<Schedule>({ text: '' })

	const eventId = useQeuryEid()

	useEffect(() => {
		loadTable(eventId).then(async (snap) => {
			if (snap.exists()) {
				const schedule = snap.data() as Schedule
				setSchedule(schedule)
			} else {
				setSchedule({ text: '' })
			}
		})
	}, [eventId])

	const save = () => {
		saveTable(eventId, schedule)
	}

	return { schedule, setSchedule, save } as const
}
