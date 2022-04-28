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
const icyHit = (q: string, icy: string) => icy.split(' - ').includes(q)

const isSakasa = (icy: string) => icy.includes('逆さま')
const isSpin = (icy: string) =>
	icy.includes('回レ') || icyHit('ノルニル', icy) || icyHit('スクランブル', icy)
const isRakupro = (icy: string) => icyHit('楽園PROJECT', icy)
const isShanimas = (icy: string) => icyHit('シャイニーカラーズ', icy)
const isMasshiro = (icy: string) => icyHit('まっしろわーるど', icy)

export function checkEx(song: Song): Eekey {
	const { icy } = song

	if (!icy) return false
	if (isSpin(icy)) {
		return 'spin'
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
