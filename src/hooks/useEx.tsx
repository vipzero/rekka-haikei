import { useEffect, useMemo } from 'react'
import { FloatingBox } from '../components'
import CVote from '../components/Home/Cvote'
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
function getEx(ex: string | false) {
	if (ex === 'nonnon') {
		return <EmbedWindow url="https://nyanpass.com/" />
	} else if (ex === 'mia') {
		return <EmbedWindow url="https://click.abyss.fun/" />
	} else if (ex === 'masshiro') {
		return <MasshiroEx />
	} else if (ex === 'gotoyome') {
		return (
			<CVote
				animeId="gotoyome"
				chars={[
					{ id: '1', name: '一花', color: '#E4A9B0' },
					{ id: '2', name: '二乃', color: '#DC6A79' },
					{ id: '3', name: '三玖', color: '#CF5A4A' },
					{ id: '4', name: '四葉', color: '#CD5B3D' },
					{ id: '5', name: '五月', color: '#D15D4D' },
				]}
			/>
		)
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

const hasTitle = (q: string, song: Song) => song.animeTitle?.includes(q)
const icyHit = (q: string, icy: string) => icy.split(' - ').includes(q)

const titleExPatterns: [string, string][] = [
	['のんのんびより', 'nonnon'],
	['アビス', 'mia'],
	['さくら荘', 'sakurasou'],
	['ひぐらしの', 'higurashi'],
	['experiments lain', 'lain'],
	['コードギアス', 'codegeass'],
	['攻殻機動隊', 'kokaku'],
	['PSYCHO-PASS', 'psychopass'],
	['廻って', 'spin'],
	['Steins;Gate', 'steinsgate'],
	['五等分の花嫁', 'gotoyome'],
]

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

	const hit = titleExPatterns.find(([q, ex]) => hasTitle(q, song))

	return hit?.[1] || false
}
