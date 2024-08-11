import { atom, useAtom, useAtomValue } from 'jotai'
import { Song } from '../types'
import { currentEvent } from '../config'

const initialSong: Song = {
	icy: (currentEvent?.label || '') + ' - loading',
	time: 0,
	wordCounts: {},
	wordCountsAna: [],
	imageSearchWord: '',
	hasMinImg: false,
}

const songAtom = atom<Song>(initialSong)
export const useSongManage = () => useAtom(songAtom)
export const useSong = () => useAtomValue(songAtom)

const loadedAtom = atom(false)
export const useLoadedManage = () => useAtom(loadedAtom)
export const useLoaded = () => useAtomValue(loadedAtom)
