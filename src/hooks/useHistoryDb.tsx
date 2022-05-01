import { useCallback, useEffect, useState } from 'react'
import {
	getHistoriesDb,
	getHistoriesStorage,
	loadTable,
	saveTable,
} from '../../service/firebase'
import { Count, History, HistoryRaw, Schedule } from '../types'
import { formatDate } from '../util'
import { useQeuryEid } from './useQueryEid'
import { useLocalStorage } from './useLocalStorage'
import { currentEvent } from '../config'
import { parse } from 'csv-parse/sync'

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
function useEventHisotry(eventId: string) {
	const archivedEvent = currentEvent?.id !== eventId
	const [fileHists, setFilehists] = useState<History[]>([])
	const [historiesBase, setHistsBase] = useLocalStorage<{
		[eid: string]: History[]
	}>(`hists_v2`, {})
	const setHists = useCallback(
		(hits: History[]) => {
			setHistsBase((v) => ({ ...v, [eventId]: hits }))
		},
		[eventId]
	)

	return archivedEvent
		? { histories: fileHists, setHists: setFilehists }
		: { histories: historiesBase[eventId] || [], setHists }
}
export const toHist = (history: HistoryRaw): History => {
	const timeStr = formatDate(history.time)
	return {
		...history,
		timeStr,
		timeCate: Number(timeStr.substring(11, 13)),
	}
}

async function getHistories(eventId: string, from: number, histOld: History[]) {
	if (currentEvent?.id === eventId) {
		const snaps = await getHistoriesDb(eventId, from)
		const newHists = snaps.docs.map((snap) => toHist(snap.data() as HistoryRaw))

		console.log(`nl:${newHists.length}`)

		return [...newHists, ...histOld]
	}
	const csv = await getHistoriesStorage(eventId)
	const res = parse(csv) as [string, string, string][]

	return res
		.map(([time, title, n]) =>
			toHist({ time: Number(time), title, n: Number(n) })
		)
		.reverse()
}

export function useHistoryDb() {
	const eventId = useQeuryEid()
	const { histories, setHists } = useEventHisotry(eventId)

	const [counts, setCounts] = useState<Count[]>([])
	const [countsSong, setCountsSong] = useState<Count[]>([])

	useEffect(() => {
		let any = false
		console.log(histories.length)
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

		getHistories(eventId, histOld[0]?.time || 0, histOld).then((hists) => {
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
