export type SongFull = {
	icy: string
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
	imageLinks?: string[]
}
export type SongMiss = {
	icy: string
	imageLinks?: string[]
}
export type Song = SongFull | SongMiss
export const isSongFull = (song: Song): song is SongFull => 'animeTitle' in song
