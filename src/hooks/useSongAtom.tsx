import { atom, useAtom } from 'jotai'
import { Song } from '../types'
import { currentEvent } from '../config'

const songAtom = atom<Song>({
	icy: (currentEvent?.label || '') + ' - loading',
	time: 0,
	wordCounts: {},
	wordCountsAna: [],
	imageSearchWord: '',
	hasMinImg: false,
})

export const useSong = () => useAtom(songAtom)
const loadedAtom = atom(false)
export const useLoaded = () => useAtom(loadedAtom)
