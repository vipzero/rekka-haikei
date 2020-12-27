import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { Song } from '../../types'

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

				while (song.imageLinks && song.imageLinks.length > 5) {
					song.imageLinks.pop()
				}
				setSong(song)
				setLoaded(true)
			})
	}, [])

	return [loaded, song] as const
}
