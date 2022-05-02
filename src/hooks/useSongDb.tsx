import React, {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react'
import {
	incBookCount,
	readSong,
	saveSongBg,
	watchYo,
} from '../../service/firebase'
import { currentEvent } from '../config'
import { Song, Yo } from '../types'
import { formatCount } from '../util'
import { useQeuryEid } from './useQueryEid'

export function useSongDb() {
	const [loaded, setLoaded] = useState<boolean>(false)
	const eventId = useQeuryEid()
	const [song, setSong] = useState<Song>({
		icy: currentEvent?.label || '',
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

const defaultConfig = {
	bookCount: 0,
	addCount: () => {},
}

export function useBookCountDb() {
	const [yo, setYo] = useState<Required<Yo>>(defaultConfig)

	useEffect(() => {
		const si = watchYo((yo) => {
			setYo({ bookCount: 0, ...yo })
		})

		return () => si()
	}, [])
	const addCount = () => {
		incBookCount()
	}

	return { bookCount: yo.bookCount, addCount }
}

export type YoState = ReturnType<typeof useBookCountDb>

const YoContext = createContext<YoState>(defaultConfig)

export const YoProvider = ({ children }: PropsWithChildren<{}>) => {
	const state = useYo()

	return <YoContext.Provider value={state}>{children}</YoContext.Provider>
}

export const useYo = () => useContext(YoContext)
