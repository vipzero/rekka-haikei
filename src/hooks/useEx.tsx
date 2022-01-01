import { useEffect, useMemo } from 'react'
import { FloatingBox } from '../components'
import CVote from '../components/Home/Cvote'
import {
	CVOTE_PROFILES,
	TITLE_EX_PATTERNS,
} from '../components/Home/Cvote/constants'
import { isSongFull, Song } from '../types'
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
function getEx(ex: string | false, sid: string) {
	if (!ex) return null
	const cvote = CVOTE_PROFILES.find((p) => p.id === ex)
	if (cvote) {
		return <CVote animeId={ex} sid={sid} chars={cvote.chars} />
	}
	if (ex === 'nonnon') {
		return <EmbedWindow url="https://nyanpass.com/" />
	} else if (ex === 'mia') {
		return <EmbedWindow url="https://click.abyss.fun/" />
	} else if (ex === 'masshiro') {
		return <MasshiroEx />
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
	const sid = String(song.time)

	const exkey = useMemo(() => checkEx(song), [song])

	useEffect(() => {
		const exColor = exKeyToColor(exkey)

		setAbyssEx(exColor)
	}, [exkey])

	return [useMemo(() => getEx(exkey, sid), [exkey, sid]), exkey] as const
}

const hasTitle = (q: string, song: Song) => song.animeTitle?.includes(q)
const icyHit = (q: string, icy: string) => icy.split(' - ').includes(q)

const isSpin = (icy: string) =>
	icy.includes('回レ') || icyHit('ノルニル', icy) || icyHit('スクランブル', icy)
const isRakupro = (icy: string) => icyHit('楽園PROJECT', icy)
const isMasshiro = (icy: string) => icyHit('まっしろわーるど', icy)

export function checkEx(song: Song): string | false {
	const { icy } = song

	if (!icy) return false
	if (isSpin(icy)) {
		return 'spin'
	} else if (isRakupro(icy)) {
		return 'rakupro'
	} else if (isMasshiro(icy)) {
		return 'masshiro'
	}
	if (!isSongFull(song)) return false

	const hit = TITLE_EX_PATTERNS.find(([q, ex]) => hasTitle(q, song))

	return hit?.[1] || false
}
