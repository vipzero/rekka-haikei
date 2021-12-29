import { useEffect } from 'react'
import { useMemo, useState } from 'react'
import { FloatingBox } from '../components'
import { Abyss, abyssColors, abyssColorsEx } from '../config'
import { isSongFull, Song } from '../types'
import { useSettings } from './useSettings'

const EmbedWindow = ({ url }: { url: string }) => (
	<div style={{ height: '50vh' }}>
		<iframe style={{ width: '100%', height: '100%' }} src={url} />
	</div>
)
function getEx(ex: string | false) {
	if (ex === 'nonnon') {
		return <EmbedWindow url="https://nyanpass.com/" />
	} else if (ex === 'mia') {
		return <EmbedWindow url="https://click.abyss.fun/" />
	} else if (ex === 'sakurasou') {
		return (
			<div style={{ height: '30vh' }}>
				<FloatingBox>
					<a href="http://sakurasou.tv/" target="_blanck">
						<img src="/maid-chan.png"></img>
					</a>
				</FloatingBox>
			</div>
		)
	}
	return null
}
function exKeyToColor(exkey: string | false) {
	if (exkey === 'higurashi' || exkey === 'mia') return '#f00'
	if (exkey === 'sakurasou') return '#fde'
	return null
}

export function calcAbyss() {}

export function useEx(song: Song) {
	const { setAbyssEx } = useSettings()

	const exkey = useMemo(() => checkEx(song), [song])

	useEffect(() => {
		const exColor = exKeyToColor(exkey)

		setAbyssEx(exColor)
	}, [exkey])

	return [useMemo(() => getEx(exkey), [exkey]), exkey] as const
}

const has = (q: string, song: Song) => song.animeTitle?.includes(q)
const icyHit = (q: string, icy: string) => icy.split(' - ').includes(q)

const isNonnon = (s) => has('のんのんびより', s)
const isMaidInAbyss = (s) => has('アビス', s)
const isSakuraso = (s) => has('さくら荘', s)
const isHigurashi = (s) => has('ひぐらしの', s)
const isLain = (s) => has('experiments lain', s)
const isCodeGeass = (s) => has('コードギアス', s)
const isKokaku = (s) => has('攻殻機動隊', s)
const isPsychoPass = (s) => has('サイコパス', s)

const isSpin = (icy: string) =>
	icy.includes('回レ') || icyHit('ノルニル', icy) || icyHit('スクランブル', icy)
const isRakupro = (icy: string) => icyHit('楽園PROJECT', icy)

export function checkEx(song: Song): string | false {
	const { icy } = song

	if (!icy) return false
	if (isSpin(icy)) {
		return 'spin'
	} else if (isRakupro(icy)) {
		return 'rakupro'
	}
	if (!isSongFull(song)) return false

	if (isNonnon(song)) {
		return 'nonnon'
	} else if (isMaidInAbyss(song)) {
		return 'mia'
	} else if (isSakuraso(song)) {
		return 'sakurasou'
	} else if (isHigurashi(song)) {
		return 'higurashi'
	} else if (isLain(song)) {
		return 'lain'
	} else if (isKokaku(song)) {
		return 'kokaku'
	} else if (isCodeGeass(song)) {
		return 'codegeass'
	} else if (isPsychoPass(song)) {
		return 'psychopass'
	}
	return false
}
