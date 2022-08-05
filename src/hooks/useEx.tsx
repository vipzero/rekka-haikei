import { useEffect } from 'react'
import { Char } from '../components/Home/Cvote'
import {
	Eekey,
	EX_PATTERNS_CUSTOM,
	EX_PATTERNS_ANIME_OR_ALBUM,
	EX_PATTERNS_JUST_ICY,
	EX_PATTERNS_ICY,
	EekeyState,
	EeOpt,
} from '../components/Home/Cvote/constants'
import { getIdles } from '../components/Home/Cvote/imasSong'
import { Song } from '../types'
import { useSettingsEe } from './useSettings'

export function calcAbyss() {}

export function useEx(song: Song) {
	const { setEekey } = useSettingsEe()

	useEffect(() => {
		const res = checkEx(song)
		if (res === false) {
			setEekey(false)
			return
		}
		setEekey(res[0], false, res[1] ?? null)
	}, [song])
}

const hasTitle = (q: string | RegExp, song: Song) =>
	[song.animeTitle, song.albumName].some((v) => new RegExp(q).exec(v || ''))

const icyJustMatch = (q: string, icy: string) =>
	icy.split(' - ').some((w) => w.trim().includes(q))

export function checkEx(song: Song): false | [EekeyState, EeOpt] {
	const { icy } = song

	if (!icy) return false

	const match =
		EX_PATTERNS_CUSTOM.find(([checker]) => checker(song))?.[1] ||
		EX_PATTERNS_ANIME_OR_ALBUM.find(([q]) => hasTitle(q, song))?.[1] ||
		EX_PATTERNS_JUST_ICY.find(([q]) => icyJustMatch(q, icy))?.[1] ||
		EX_PATTERNS_ICY.find(([q]) => icy.match(q))?.[1]
	if (match) return [match, null]
	const im = getIdles(icy.split(' - ')[0])
	if (im) return ['imasml', { chars: im }]

	return false
}
