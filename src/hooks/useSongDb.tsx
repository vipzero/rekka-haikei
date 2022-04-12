import { useEffect, useState } from 'react'
import { readSong, saveSongBg } from '../../service/firebase'
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
		const si = readSong(eventId, (song) => {
			const wordCountsAna = Object.entries(song.wordCounts)
				.filter(([k]) => k !== song.icy)
				.map(([name, count]) => ({
					name,
					count,
					label: `[${name} (${formatCount(count)})]`,
				}))

			song.wordCountsAna = [...wordCountsAna].sort((a, b) => a.count - b.count)

			setSong(song)
			setLoaded(true)
		})

		return () => si()
	}, [eventId])

	const setBg = async (url, sid) => {
		saveSongBg(url, eventId, sid)
	}

	return [loaded, song, setBg] as const
}
