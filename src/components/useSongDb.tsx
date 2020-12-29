import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { History, isSongFull, Song } from '../../types'
import { formatDate } from '../util'

export function useSongDb() {
	const [loaded, setLoaded] = useState<boolean>(false)
	const [histories, setHistories] = useState<History[]>([])
	const [song, setSong] = useState<Song>({ icy: '' })

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
				// while (song.imageLinks && song.imageLinks.length > 5) {
				// 	song.imageLinks.pop()
				// }
				setSong(song)
				setLoaded(true)
			})

		fdb
			.collection('hist')
			.doc('2020nematu')
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

	return [loaded, song, histories] as const
}
