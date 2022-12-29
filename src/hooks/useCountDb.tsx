import { useEffect, useState } from 'react'
import { getCounts } from '../service/firebase'
import { WordCount } from '../types'
import { isTimeSeasonTag, isTimeTag, isTimeYearTag } from '../util'
import { useQeuryEid } from './useQueryEid'

export function useCountDb() {
	const eventId = useQeuryEid()
	// const [monthTags, setMonthTags] = useState<WordCount[]>([])
	const [yearTags, setYearTags] = useState<[WordCount[], number]>([[], 1])
	const [seasonTags, setSeasonTags] = useState<[WordCount[], number]>([[], 1])
	const [counts, setCounts] = useState<WordCount[]>([])

	useEffect(() => {
		getCounts(eventId).then((snaps) => {
			const counts = snaps.docs.map((snap) => snap.data() as WordCount)

			setCounts(counts.filter((v) => !isTimeTag(v.word)))
			// const mtags = counts.filter((v) => isTimeMonthTag(v.word))
			// mtags.sort((a, b) => a.word.localeCompare(b.word))
			// setMonthTags(mtags)
			const ytags = counts.filter((v) => isTimeYearTag(v.word))
			ytags.sort((a, b) => a.word.localeCompare(b.word))
			const ytc = ytags.reduce((a, b) => Math.max(a, b.count), 0)

			setYearTags([ytags, ytc])
			const stags = counts.filter((v) => isTimeSeasonTag(v.word))
			stags.sort((a, b) => a.word.localeCompare(b.word))
			const stc = stags.reduce((a, b) => Math.max(a, b.count), 0)
			setSeasonTags([stags, stc])
		})
	}, [eventId])

	return [counts, yearTags, seasonTags] as const
}
