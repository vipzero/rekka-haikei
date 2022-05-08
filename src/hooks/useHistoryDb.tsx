import { useCallback, useEffect, useMemo, useState } from 'react'
import {
	getHistoriesDb,
	getHistoriesDbRange,
	getHistoriesStorage,
	loadTable,
	saveTable,
	toHistory,
	calcG,
} from '../../service/firebase'
import { Count, History, HistoryRaw, Schedule } from '../types'
import { formatDate, formatYmdSlash, mergeArr, pad2 } from '../util'
import { useQeuryEid } from './useQueryEid'
import { useLocalStorage } from './useLocalStorage'
import { currentEvent, events, finishTime } from '../config'
import { parse } from 'csv-parse/sync'
import { textNormalize } from '../util/serverCodeUtils'

const fills: Record<number, boolean> = [...Array(24).keys()].reduce(
	(p, c) => ({ ...p, [c]: false }),
	{}
)

type FillCell = {
	start: Date
	end: Date
	hn: number
	memo: string
	rangeStr: string
	name: string
	startKey: string
	endKey: string
}
type ScheduleCell = FillCell | 'skip' | 'emp'
export type ScheduleRow = {
	day: string
	items: ScheduleCell[]
}

function makeRows(text: string) {
	const rows: Record<string, ScheduleRow> = {}

	text
		.trim()
		.split('\n')
		.filter(Boolean)
		.forEach((line) => {
			const [day, s, e, name, memo] = line.split(',')
			const start = new Date(`${day} ${s}:00:00`)
			const end = new Date(`${day} ${e}:00:00`)
			if (!rows[day]) rows[day] = { day, items: [] }
			const hn = Number(e) - Number(s)
			const rangeStr = `${s}:00〜${e}:00`
			const startKey = `${day}:${s}`
			const endKey = `${day}:${e}`

			rows[day].items.push({
				start,
				end,
				hn,
				memo,
				name,
				rangeStr,
				startKey,
				endKey,
			})
		})
	const rows2: Record<string, ScheduleRow> = {}
	const empCells: ScheduleCell[] = Object.values(fills).map(
		() => 'emp' as const
	)

	for (const [day, row] of Object.entries(rows)) {
		const cells = [...empCells]
		row.items.forEach((item) => {
			if (item === 'emp' || item === 'skip') return
			cells[item.start.getHours()] = item
			for (let i = item.start.getHours() + 1; i < item.end.getHours(); i++) {
				cells[i] = 'skip'
			}
		})
		rows2[day] = { day, items: cells }
	}
	return rows2
}

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
export function useEventHisotry(eventId: string) {
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
async function getHistories(
	eventId: string,
	from: number,
	histOld: History[] = []
) {
	const archivedEvent = currentEvent?.id !== eventId
	if (!archivedEvent) {
		const snaps = await getHistoriesDb(eventId, from)
		const newHists = snaps.docs.map((snap) =>
			toHistory(snap.data() as HistoryRaw)
		)

		console.log(`nl:${newHists.length}`)

		return [...newHists, ...histOld.map((v) => ({ ...v, g: calcG(v.n, v.b) }))] // TODO: remove
	}
	const csv = await getHistoriesStorage(eventId)
	const res = parse(csv) as [string, string, string, string | undefined][]

	return res
		.map(([time, title, n, b]) =>
			toHistory({
				time: Number(time),
				title,
				n: Number(n),
				b: b ? Number(b) : 0,
			})
		)
		.reverse()
}

export function useHistoryDb() {
	const eventId = useQeuryEid()
	const { histories, setHists } = useEventHisotry(eventId)

	const [loaded, setLoaded] = useState<boolean>(false)
	const [counts, setCounts] = useState<Count[]>([])
	const [countsSong, setCountsSong] = useState<Count[]>([])

	useEffect(() => {
		let any = false
		// n を取得していない部分までは再取得する
		const histOld = histories.filter((h) => {
			if (any) return true
			const b = h.n !== null
			any = b
			return b
		})

		getHistories(eventId, histOld[0]?.time || 0, histOld).then((hists) => {
			setHists(hists)

			const counts = makeCounts(hists)
			const countsSong = makeCounts(
				hists.map((h) => {
					const [artist, songTitle] = h.title
						.split(' - ')
						.map((s) => textNormalize(s.trim()))
					const key = songTitle || artist || 'none'

					return { ...h, title: key }
				})
			)

			setCounts(counts)
			setCountsSong(countsSong)
			setLoaded(true)
		})
	}, [eventId])

	const fixDb = () => {
		if (!loaded) return

		const lost0501 = 1651344231000
		const findLost0501 = histories.find((v) => v.time === lost0501)
		if (eventId !== '2022gw' && !findLost0501) {
			// TODO: remove
			;(async () => {
				const start = 1651344231000 - 1
				const end = 1651357830000 + 1
				const snaps = await getHistoriesDbRange(eventId, start, end)
				const newHists = snaps.docs.map((snap) =>
					toHistory(snap.data() as HistoryRaw)
				)

				setHists(mergeArr(histories, newHists, (a) => -a.time)) // counts の整合性はこのタイミングだけなくなる
				alert('2022/05/01 のデータを修正しました')
			})()
		}
		const hists: typeof histories = []
		histories.reduce((a, b) => {
			if (a.title !== b.title) {
				hists.push(a)
			}
			return b
		})
		if (hists.length !== histories.length) {
			alert(
				`重複しているデータを修正しました ${histories.length - hists.length}`
			)
			setHists(hists)
		}
	}

	return { histories, counts, countsSong, fixDb } as const
}

const dayFormat = (day: Date) =>
	`${day.getMonth() + 1}月${day.getDate()}日(${`日月火水木金土`[day.getDay()]})`
const makeText = (rows: Record<string, ScheduleRow>) => {
	const lines: string[] = []
	const tod = new Date()
	const tom = new Date(+tod + 24 * 60 * 60 * 1000)
	const todStr = dayFormat(tod)
	const tomStr = dayFormat(tom)
	const todYmd = formatYmdSlash(+tod)
	const tomYmd = formatYmdSlash(+tom)

	const fromTimeKey = `${todYmd}:${pad2(tod.getHours())}`
	const toTimeKey = `${tomYmd}:${pad2(tod.getHours())}`

	const viewDays = [
		[rows[todYmd] || { day: todStr, items: [] }, todStr] as const,
		[rows[tomYmd] || { day: tomStr, items: [] }, tomStr] as const,
	]

	viewDays.forEach(([row, str]) => {
		if (row.day >= formatYmdSlash(finishTime)) {
			return lines.push('=====終了=====')
		}
		lines.push(str)
		const dayLines: string[] = []
		row.items.forEach((v) => {
			if (v === 'emp' || v === 'skip') return
			if (fromTimeKey <= v.endKey && v.startKey <= toTimeKey) {
				dayLines.push(`${v.rangeStr}　　${v.name}${v.memo ? `※${v.memo}` : ''}`)
			}
		})

		dayLines.forEach((v) => lines.push(v))
	})
	const lastEnd = /〜(..:..)/.exec(lines[lines.length - 1] || '')?.[1] || ''
	lines.push(`${lastEnd}~**:**　　24時間前になるまで待ってね`)

	return lines.join('\n')
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

	const rows = useMemo(() => {
		try {
			return makeRows(schedule.text)
		} catch (e) {
			console.log(e)
		}
		return {}
	}, [schedule.text])

	const todayText = makeText(rows)

	return { schedule, setSchedule, save, todayText, rows } as const
}

const keyBy = <T,>(list: Count[]) => {
	const res: Record<string, Count> = {}

	list.forEach((c) => {
		res[c.title] = c
	})

	return res
}

export function useHistoryAnaCounts(counts: Count[]) {
	const pastCounts = usePastHistoryCounts()
	return useMemo(() => {
		if (pastCounts.length === 0) return false
		console.log('ana start')

		performance.mark('countcalc-a')
		console.log('a')

		const countsByTitle = keyBy(counts)
		const pastCountsByTitle = keyBy(pastCounts)
		console.log('b')

		const newSongs: SongCountDiff[] = []
		const nonSongs: SongCountDiff[] = []

		Array.from(
			new Set([
				...Object.keys(countsByTitle),
				...Object.keys(pastCountsByTitle),
			])
		).forEach((title) => {
			const pp = pastCountsByTitle[title]?.times.length || 0
			const cp = countsByTitle[title]?.times.length || 0
			const song = { title, pt: cp - pp, total: cp + pp, cp, pp }
			if (pp === 0) newSongs.push(song)
			if (cp === 0 && pp >= 3) nonSongs.push(song)
		})
		console.log('c')

		performance.mark('sort-a')

		nonSongs.sort((a, b) => a.pt - b.pt)
		newSongs.sort((a, b) => b.pt - a.pt)
		performance.mark('sort-b')
		performance.measure('sort', 'sort-a', 'sort-b')
		console.info(performance.getEntriesByName('sort').pop())

		performance.mark('countcalc-b')
		performance.measure('countcalc', 'countcalc-a', 'countcalc-b')
		console.info(performance.getEntriesByName('countcalc').pop())
		return { nonSongs, newSongs }
	}, [counts.length, Object.values(pastCounts).length])
}

type SongCountDiff = {
	title: string
	pt: number
	pp: number
	cp: number
	total: number
}

export function usePastHistoryCounts() {
	const [countsSong, setCountsSong] = useState<Count[]>([])

	useEffect(() => {
		Promise.all(
			events.filter((v) => !v.current).map((ev) => getHistories(ev.id, 0))
		).then((res) => {
			const hists = res.flat()

			setCountsSong(
				makeCounts(
					hists.map((h) => {
						const [artist, songTitle] = h.title
							.split(' - ')
							.map((v) => textNormalize(v.trim()))

						const key = songTitle || artist || 'none'
						return { ...h, title: key }
					})
				)
			)
		})
	}, [])
	return countsSong
}
