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
import groupBy from 'lodash/groupBy'

const fills: Record<number, boolean> = [...Array(24).keys()].reduce(
	(p, c) => ({ ...p, [c]: false }),
	{}
)

type FillCellPrimary = {
	start: Date
	end: Date
	memo: string
	name: string
}
type FillCell = FillCellPrimary & {
	day: string
	hn: number
	mn: number
	rangeStr: string
}
type ScheduleCell = FillCell | 'skip' | 'emp'
export type ScheduleRow = {
	day: string
	items: ScheduleCell[]
}

const guardHm = (hm: string) => {
	const [h, m] = hm.split(':')
	return [Number(h) % 24, Number(m || 0), Number(h) > 24 ? 1 : 0]
}

function makeRows(text: string) {
	const cells: FillCellPrimary[] = []

	const lines = text.trim().split('\n').filter(Boolean)

	let dayPrev = ''
	let ePrev = ''
	lines.forEach((line, i) => {
		const [day0, sRaw, eRaw, name, memo] = line.split(',')
		const day = day0 || dayPrev
		const [sh, sm] = sRaw ? guardHm(sRaw) : guardHm(ePrev)
		const [eh, em, upDay] = guardHm(eRaw)

		const start = new Date(`${day} ${sh}:${sm}`)
		const end = new Date(`${day} ${eh}:${em}`)
		end.setDate(end.getDate() + upDay)

		cells.push({ start, end, memo: memo || `#${i}`, name })
		dayPrev = day
		ePrev = eRaw
	})
	const cells2 = cells
		.map((cell) => {
			const { start, end } = cell
			if (start.getDate() === end.getDate())
				return [{ ...cell, isBase: true, isSplit: true }]
			const midDay = new Date(end)
			midDay.setHours(0, 0)
			return [
				{ ...cell, isBase: true, isSplit: false },
				{ ...cell, end: midDay, isBase: false, isSplit: true },
				{ ...cell, start: midDay, isBase: false, isSplit: true },
			]
		})
		.flat()
		.map((cell) => {
			const { start, end } = cell
			const day = formatYmdSlash(+cell.start)

			// const s = (s0 || ePrev).padStart(2, '0')
			// const e = Number(e0) % 24
			const sh = start.getHours()
			const sm = start.getMinutes()
			const eh = end.getHours()
			const em = end.getMinutes()

			const ehr = eh + (sh > eh ? 24 : 0)

			const hn = (eh - sh + 24) % 24
			const mn = (em - sm + 60) % 60

			const rangeStr = `${pad2(sh)}:${pad2(sm)}〜${pad2(ehr)}:${pad2(em)}`
			return {
				...cell,
				day,
				hn,
				mn,
				rangeStr,
			}
		})

	const makeScheduleMap = (cells: FillCell[]) =>
		Object.fromEntries(
			Object.entries(groupBy(cells, (v) => v.day)).map(([day, items]) => [
				day,
				{ day, items },
			])
		)
	const rowsBase = makeScheduleMap(cells2.filter((v) => v.isBase))
	const rowsSplit = makeScheduleMap(cells2.filter((v) => v.isSplit))

	const rows2: Record<string, ScheduleRow> = {}
	const empCells: ScheduleCell[] = Object.values(fills).map(
		() => 'emp' as const
	)

	for (const [day, row] of Object.entries(rowsSplit)) {
		const cells = [...empCells]
		row.items.forEach((item) => {
			cells[item.start.getHours()] = item
			for (let i = item.start.getHours() + 1; i < item.end.getHours(); i++) {
				cells[i] = 'skip'
			}
		})
		rows2[day] = { day, items: cells }
	}
	return { rowsBase, rowsSplit: rows2 }
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
			if (tod <= v.end && v.start <= tom) {
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

	const { rowsBase, rowsSplit } = useMemo(() => {
		try {
			return makeRows(schedule.text)
		} catch (e) {
			console.log(e)
		}
		return { rowsBase: {}, rowsSplit: {} }
	}, [schedule.text])

	const todayText = makeText(rowsBase)

	return {
		schedule,
		setSchedule,
		save,
		todayText,
		rowsBase,
		rowsSplit,
	} as const
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
