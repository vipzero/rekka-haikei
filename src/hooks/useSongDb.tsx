import _ from 'lodash'
import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { Song } from '../types'
import { useQeuryEid } from './useQueryEid'

export function useSongDb() {
	const [loaded, setLoaded] = useState<boolean>(false)
	const eventId = useQeuryEid()
	const [song, setSong] = useState<Song>({
		icy: '',
		time: 1,
		wordCounts: {},
		wordCountsAna: [],
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
						label: `[${name} (${count === 1 ? '初' : `${count} 回目`})]`,
					}))

				song.wordCountsAna = _.sortBy(wordCountsAna, ['count'])

				setSong(song)
				setLoaded(true)
			})

		return () => si()
	}, [eventId])
	const setBg = async (url) => {
		const fdb = getFirestore()
		const song = (
			await fdb.collection('song').doc(eventId).get()
		).data() as Song
		const imageLinks = song.imageLinks || []

		// song cahnged guard
		if (imageLinks[0] === url || !imageLinks.includes(url)) return

		fdb
			.collection('song')
			.doc(eventId)
			.update({
				imageLinks: [url, ...imageLinks.filter((v) => v !== url)],
			})
	}

	return [loaded, song, setBg] as const
}
