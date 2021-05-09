import _ from 'lodash'
import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { History, isSongFull, Song } from '../../types'
import config from '../config'
import { formatDate } from '../util'

export function useSongDb() {
	const [loaded, setLoaded] = useState<boolean>(false)
	const [histories, setHistories] = useState<History[]>([])
	const [song, setSong] = useState<Song>({
		icy: '',
		time: 1,
		wordCounts: {},
		wordCountsAna: [],
	})

	useEffect(() => {
		const fdb = getFirestore()

		fdb
			.collection('song')
			.doc('current')
			.onSnapshot((snap) => {
				const song = snap.data() as Song

				if (isSongFull(song)) {
					song.imageLinks?.reverse()
				}

				const wordCountsAna = Object.entries(song.wordCounts)
					.filter(([k]) => k !== song.icy)
					.map(([name, count]) => ({
						name,
						count,
						label: `[${name} (${count === 1 ? '初' : `${count} 回目`})]`,
					}))

				// タイトル・番組名はソートせず先頭に
				// const heads: typeof wordCountsAna = [wordCountsAna.shift() || ]

				// if (isSongFull(song) && song.animeTitle) {
				// 	heads.push(wordCountsAna.shift())
				// }

				song.wordCountsAna = _.sortBy(wordCountsAna, ['count'])

				// while (song.imageLinks && song.imageLinks.length > 5) {
				// 	song.imageLinks.pop()
				// }
				setSong(song)
				setLoaded(true)
			})

		fdb
			.collection('hist')
			.doc(config.eventId)
			.collection('songs')
			.orderBy('time', 'desc')
			.limit(10)
			.onSnapshot((snaps) => {
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
			})
	}, [])
	const setBg = async (url) => {
		const fdb = getFirestore()
		const song = (
			await fdb.collection('song').doc('current').get()
		).data() as Song
		const imageLinks = song.imageLinks || []

		// song cahnged guard
		if (imageLinks[0] === url || !imageLinks.includes(url)) return

		fdb
			.collection('song')
			.doc('current')
			.update({
				imageLinks: [url, ...imageLinks.filter((v) => v !== url)],
			})
	}

	return [loaded, song, histories, setBg] as const
}
