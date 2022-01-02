import { useEffect, useMemo } from 'react'
import { createGlobalStyle } from 'styled-components'
import { FloatingBox } from '../components'
import CVote from '../components/Home/Cvote'
import {
	CVOTE_PROFILES,
	Eekey,
	eekeys,
	TITLE_EX_PATTERNS,
} from '../components/Home/Cvote/constants'
import { isSongFull, Song } from '../types'
import { uaHash } from '../util'
import { useSettings } from './useSettings'

const EmbedWindow = ({ url }: { url: string }) => (
	<div style={{ height: '50vh' }}>
		<iframe style={{ width: '100%', height: '100%' }} src={url} />
	</div>
)
const MasshiroEx = () => (
	<div id="mashiros">
		<div>
			<img id="mashiro-a" src="/static/mashiro-a.png" />
			<img id="mashiro-b" src="/static/mashiro-b.png" />
		</div>
	</div>
)

export const Lain = createGlobalStyle<{ r256: number }>`
* {
	color: hsla(${(p) => p.r256},50%,50%) !important;
}
#button-grid-panel {
	grid-template-areas:
	'bk bk bk bk th th th'
	'bk bk bk bk bl lk lk'
	'bk bk bk bk bl lk lk'
	'hl hl hl -- bl ha ha' // hl
	'tg tg tg -- cl ha ha'
	'tg tg tg dl dl dl dl'
	'fd hi hi hi tl tl tl' !important
}
#bg > div {
transform: rotate(90deg)
}
/* *:focus {
	background: red !important;
	border: solid blue 8px !important;
} */
`

function getEx(ex: Eekey, sid: string, rand: number, eeSim: boolean) {
	if (!ex) return null
	const cvote = CVOTE_PROFILES.find((p) => p.id === ex)
	if (cvote) {
		return <CVote animeId={ex} sid={sid} chars={cvote.chars} disabled={eeSim} />
	}
	if (ex === 'nonnon') {
		return <EmbedWindow url="https://nyanpass.com/" />
	} else if (ex === 'mia') {
		return <EmbedWindow url="https://click.abyss.fun/" />
	} else if (ex === 'masshiro') {
		return <MasshiroEx />
	} else if (ex === 'lain') {
		return <Lain r256={Math.floor(uaHash() % 256)} />
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
export function calcAbyss() {}

export function useEx(song: Song) {
	const { setEekey, eeKey, eeSim } = useSettings()
	const sid = String(song.time)

	useEffect(() => {
		const eeKey = checkEx(song)
		setEekey(eeKey)
	}, [song])

	return useMemo(() => getEx(eeKey, sid, Math.random(), eeSim), [eeKey, sid])
}

const hasTitle = (q: string | RegExp, song: Song) =>
	[song.animeTitle, song.albumName].some((v) => new RegExp(q).exec(v || ''))

const matchTitle = (q: string, song: Song) => song.animeTitle === q
const icyHit = (q: string, icy: string) => icy.split(' - ').includes(q)

const isSpin = (icy: string) =>
	icy.includes('回レ') || icyHit('ノルニル', icy) || icyHit('スクランブル', icy)
const isRakupro = (icy: string) => icyHit('楽園PROJECT', icy)
const isMasshiro = (icy: string) => icyHit('まっしろわーるど', icy)

export function checkEx(song: Song): Eekey {
	return 'toaru'
	const { icy } = song

	if (!icy) return false
	if (isSpin(icy)) {
		return 'spin'
	} else if (isRakupro(icy)) {
		return 'rakupro'
	} else if (isMasshiro(icy)) {
		return 'masshiro'
	}

	if (matchTitle('人生', song)) return 'jinsei'

	const hit = TITLE_EX_PATTERNS.find(([q]) => hasTitle(q, song))

	return hit?.[1] || false
}
