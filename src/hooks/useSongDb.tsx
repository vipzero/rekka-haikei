import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { currentEvent, featcherVersion } from '../config'
import {
	incSongBookCount,
	readSong,
	saveSongBg,
	watchHistSong,
} from '../service/firebase'
import { HistoryRaw, Song } from '../types'
import { formatCount } from '../util'
import { useBingo } from './useBingo'
import { useQeuryEid } from './useQueryEid'

export function useSongDb(online = true) {
	const [loaded, setLoaded] = useState<boolean>(false)
	const eventId = useQeuryEid()
	const [song, setSong] = useState<Song>({
		icy: (currentEvent?.label || '') + ' - loading',
		time: 0,
		wordCounts: {},
		wordCountsAna: [],
		imageSearchWord: '',
		hasMinImg: false,
	})
	const { checkHit } = useBingo()

	useEffect(() => {
		if (!online) return
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
			if (song.frontVersion && song.frontVersion.ver > featcherVersion) {
				const { msg } = song.frontVersion
				setTimeout(() => {
					toast.info(msg, { autoClose: false })
				}, 1000)
			}
			checkHit(song.icy + ' _ ' + song.animeTitle || '')
			setLoaded(true)
		})

		return () => si()
	}, [eventId, online])

	const setBg = async (url, sid) => {
		saveSongBg(url, eventId, sid)
	}

	return [loaded, song, setBg] as const
}

const defaultConfig = {
	bookCount: 0,
	addCount: () => {},
}

export function useBookCountDb(songId: number | undefined) {
	const [yo, setYo] = useState<HistoryRaw | null>(null)
	const eventId = useQeuryEid()

	useEffect(() => {
		if (!songId) return
		const si = watchHistSong(eventId, songId, (hist) => setYo(hist))

		return () => si()
	}, [eventId, songId])
	const addCount = () => {
		if (!songId) return
		incSongBookCount(eventId, songId)
	}

	return { bookCount: yo?.b || 0, addCount }
}
