import _ from 'lodash'
import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { isSongFull, Song } from '../types'

export function useSongDb() {
	const [loaded, setLoaded] = useState<boolean>(false)

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
			.doc('current')
			.onSnapshot((snap) => {
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

	return [loaded, song, setBg] as const
}
