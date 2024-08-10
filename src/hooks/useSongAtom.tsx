import { atom, useAtom } from 'jotai'
import { Song } from '../types'
import { currentEvent } from '../config'

export const songAtom = atom<Song>({
	icy: (currentEvent?.label || '') + ' - loading',
	time: 0,
	wordCounts: {},
	wordCountsAna: [],
	imageSearchWord: '',
	hasMinImg: false,
})

export const useSong = () => useAtom(songAtom)
