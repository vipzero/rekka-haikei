import { Abyss } from './../config/index'
export type SongMiss = {
	icy: string
	time: number
	albumName?: string
	copyright?: string
	artworkUrl100?: string
	trackTimeMillis?: number
	itunesUrl?: string
	imageLinks?: string[]
	singer?: string
	composer?: string
	arranger?: string
	writer?: string
	animeTitle?: string
	wordCounts: Record<string, number>
	wordCountsAna: { name: string; label: string; count: number }[]
	imageSearchWord: string
}

export type SongFull = SongMiss & {
	title: string
	artist: string
	opOrEd: string
	spInfo: string
	songId: string
	category: string
	gameType: string
	chapNum: number
	date: string
}

export type Song = SongFull | SongMiss

export const isSongFull = (song: Song): song is SongFull => 'spInfo' in song

export type HistoryRaw = {
	title: string
	time: number
	n: number | null
}
export type History = {
	title: string
	n: number | null
	time: number
	timeStr: string
	timeCate: number // for style (hour % 10)
}
export type WordCount = {
	count: number
	word: string
}

export type Count = {
	title: string
	times: number[]
	timesStr: string[]
}

export type Schedule = {
	text: string
}

export type BookCount = {
	icy: string
	count: number
}

export type ThemeId = number
export type Theme = {
	id: ThemeId
	key: string
}

export type Setting = {
	showSetting: boolean
	showBookmark: boolean
	showCounts: boolean
	showHistory: boolean
	sideMode: boolean
	lockBg: boolean
	showTool: boolean
	showHelp: boolean
	feedBackText: string
	abyss: Abyss // fade change background color: ;
	abyssEx: Abyss | null
}

export type Event = {
	id: string
	label: string
	current?: true
}
