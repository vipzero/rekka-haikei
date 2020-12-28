import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { isSongFull, Song } from '../../types'

export function useSongDb() {
	const [loaded, setLoaded] = useState<boolean>(false)
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
	}, [])

	return [loaded, song] as const
}
