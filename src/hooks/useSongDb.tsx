import { useEffect, useState } from 'react'
import {
	incSongBookCount,
	readSong,
	saveSongBg,
	watchHistSong,
} from '../service/firebase'
import { HistoryRaw } from '../types'
import { updateCheck, wordCount } from '../util/song'
import { useBingo } from './useBingo'
import { useFetcher } from './useFetch'
import { useQeuryEid } from './useQueryEid'
import { useLoadedManage, useSongManage } from './useSongAtom'

export function useSongDb(online = true) {
	const [, setLoaded] = useLoadedManage()
	const eventId = useQeuryEid()
	const [, setSong] = useSongManage()
	const { checkHit } = useBingo()
	const main = useFetcher()

	useEffect(() => {
		if (!main) return
		if (!online) return

		const si = readSong(eventId, (song) => {
			setSong({ ...song, wordCountsAna: wordCount(song) })
			updateCheck(song)

			checkHit(song.icy + ' _ ' + song.animeTitle || '')
			setLoaded(true)
		})

		return () => {
			si()
		}
	}, [eventId, online, main])
}

export const useBg = () => {
	const eventId = useQeuryEid()

	return {
		setBg: async (url: string, sid: number) => {
			saveSongBg(url, eventId, sid)
		},
	}
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
