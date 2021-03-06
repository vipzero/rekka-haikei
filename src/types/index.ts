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
	writer?: string
	wordCounts: Record<string, number>
	wordCountsAna: { name: string; label: string; count: number }[]
}

export type SongFull = SongMiss & {
	title: string
	artist: string
	animeTitle: string
	opOrEd: string
	spInfo: string
	songId: string
	category: string
	gameType: string
	chapNum: number
	date: string
}

export type Song = SongFull | SongMiss

export const isSongFull = (song: Song): song is SongFull => 'animeTitle' in song

export type HistoryRaw = {
	title: string
	time: number
}
export type History = {
	title: string
	time: number
	timeStr: string
	timeCate: string // for style (hour % 10)
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
	showLyrics: boolean
	sideMode: boolean
	lockBg: boolean
	feedBackText: string
}

export type Event = {
	id: string
	label: string
}
