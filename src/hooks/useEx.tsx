import { useEffect } from 'react'
import { Eekey, TITLE_EX_PATTERNS } from '../components/Home/Cvote/constants'
import { Song } from '../types'
import { useSettingsEe } from './useSettings'

export function calcAbyss() {}

export function useEx(song: Song) {
	const { setEekey } = useSettingsEe()

	useEffect(() => {
		const eeKey = checkEx(song)

		setEekey(eeKey)
	}, [song])
}

const hasTitle = (q: string | RegExp, song: Song) =>
	[song.animeTitle, song.albumName].some((v) => new RegExp(q).exec(v || ''))

const matchTitle = (q: string, song: Song) => song.animeTitle === q
const icyJustMatch = (q: string, icy: string) =>
	icy.split(' - ').some((w) => w.trim().includes(q))

const isBullet = (icy: string) => icy.match(/bull['e]/)
const isSakasa = (icy: string) => icy.includes('逆さま')
const isRodo = (icy: string) => icy.includes('労働')
const isSpin = (icy: string) =>
	icy.includes('回レ') ||
	icy.includes('ぐるぐる') ||
	icyJustMatch('ノルニル', icy) ||
	icyJustMatch('スクランブル', icy)
const isFlip = (icy: string) =>
	icy.match(/return/i) || icy.includes('ウラオモテ')
const isRakupro = (icy: string) => icyJustMatch('楽園PROJECT', icy)
const isShanimas = (icy: string) => icyJustMatch('シャイニーカラーズ', icy)
const isMasshiro = (icy: string) => icyJustMatch('まっしろわーるど', icy)

export function checkEx(song: Song): Eekey {
	const { icy } = song

	if (!icy) return false

	if (isSpin(icy)) {
		return 'spin'
	} else if (isFlip(icy)) {
		return 'flip'
	} else if (isRodo(icy)) {
		return 'rodo'
	} else if (isBullet(icy)) {
		return 'ariascarlet'
	} else if (isRakupro(icy)) {
		return 'rakupro'
	} else if (isMasshiro(icy)) {
		return 'masshiro'
	} else if (isSakasa(icy)) {
		return 'patema'
	} else if (isShanimas(icy)) {
		return 'shanimas'
	}

	if (matchTitle('人生', song)) return 'jinsei'

	const hit = TITLE_EX_PATTERNS.find(([q]) => hasTitle(q, song))

	return hit?.[1] || false
}
