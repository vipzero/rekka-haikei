export type SongMiss = {
	icy: string
	albumName?: string
	copyright?: string
	artworkUrl100?: string
	itunesUrl?: string
	imageLinks?: string[]
	singer?: string
	composer?: string
	writer?: string
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

export type History = {
	title: string
	time: number
	timeStr: string
	timeCate: string // for style (hour % 10)
}

export type Count = {
	title: string
	times: number[]
	timesStr: string[]
}
