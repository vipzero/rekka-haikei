import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'

export type SongFull = {
	animeTitle: string
	opOrEd: string
	spInfo: string
	songId: string
	title: string
	artist: string
	imageLinks?: string[]
}
export type SongMiss = {
	title: string
	artist: string
	imageLinks?: string[]
}
export type Song = SongFull | SongMiss
export const isSongFull = (song: Song): song is SongFull => 'animeTitle' in song

export function useSongDb() {
	const [loaded, setLoaded] = useState<boolean>(false)
	const [song, setSong] = useState<Song>({ title: '', artist: '' })

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
