import { EekeyState, EeOpt } from '../components/Home/Cvote/constants'
import { Abyss } from './../config/index'

export type SongMiss = {
	icy: string
	time: number
	hasMinImg: boolean
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
	frontVersion?: { ver: number; msg: string }
	hedwig?: string
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
export type Emol = { text: string }

export const isSongFull = (song: Song): song is SongFull => 'spInfo' in song

export type HistoryRaw = {
	title: string
	time: number
	n?: number
	b?: number
}

export type History = {
	title: string
	time: number
	n: number | null
	b: number | null
	g: number
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

export type ShapeId = number
export type ThemeId = number | string
export type Theme = {
	id: ThemeId
	key: string
}
export type Shape = {
	id: ShapeId
	key: string
	detailOptLock?: boolean
}

export type Setting = {
	theme: ThemeId
	shape: ShapeId
	showSetting: boolean
	showBookmark: boolean
	showArtwork: boolean
	showCounts: boolean
	showHistory: boolean
	blockGif: boolean
	sideMode: 'r' | 'l' | 'wide' | 'br' | 'bl' | 'bw'
	lockBgNum: 0 | 1 | 10
	showTool: boolean
	showHelp: boolean
	feedBackText: string
	enableFakeBar: 'off' | 'on'
	abyss: Abyss // fade change background color: ;
	abyssEx: Abyss | null
	ee: Record<string, number>
	eeKey: EekeyState
	eeOpt: EeOpt
	eeSim: boolean
	eeMemo: Record<string, string>
	customTheme: string
	showEmol: boolean
	bingo: string
}

export type Event = {
	id: string
	label: string
	current?: true
}

export type Yo = {
	bookCount?: number
}

export type Snap = {
	icy: string
	words: string[]
	animeTitle: string
	url: string
	time: number
}
