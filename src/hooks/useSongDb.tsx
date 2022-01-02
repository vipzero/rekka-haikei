import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { Song } from '../types'
import { formatCount } from '../util'
import { useQeuryEid } from './useQueryEid'

export function useSongDb() {
	const [loaded, setLoaded] = useState<boolean>(false)
	const eventId = useQeuryEid()
	const [song, setSong] = useState<Song>({
		icy: '',
		time: 1,
		wordCounts: {},
		wordCountsAna: [],
		imageSearchWord: '',
	})

	useEffect(() => {
		const fdb = getFirestore()

		const si = fdb
			.collection('song')
			.doc(eventId)
			.onSnapshot((snap) => {
				if (!snap.exists) {
					console.warn('no stream setup')

					return
				}
				const song = snap.data() as Song

				const wordCountsAna = Object.entries(song.wordCounts)
					.filter(([k]) => k !== song.icy)
					.map(([name, count]) => ({
						name,
						count,
						label: `[${name} (${formatCount(count)})]`,
					}))

				song.wordCountsAna = [...wordCountsAna].sort(
					(a, b) => a.count - b.count
				)

				setSong(song)
				setLoaded(true)
			})

		return () => si()
	}, [eventId])

	const setBg = async (url, sid) => {
		const fdb = getFirestore()
		const songRef = fdb.collection('song').doc(eventId)

		fdb.runTransaction((transaction) => {
			// This code may get re-run multiple times if there are conflicts.
			return transaction.get(songRef).then((doc) => {
				const song = doc.data() as Song
				const imageLinks = song.imageLinks || []

				// song changed guard
				if (song.time !== sid) return
				transaction.update(songRef, {
					imageLinks: [url, ...imageLinks.filter((v) => v !== url)],
				})
			})
		})
	}

	return [loaded, song, setBg] as const
}
