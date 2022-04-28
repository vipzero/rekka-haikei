import { useMemo } from 'react'
import { createGlobalStyle } from 'styled-components'
import { FloatingBox, RainbowFont, RainbowFontCool } from '../'
import { useSettings, useSettingsEe } from '../../hooks/useSettings'
import { uaHash } from '../../util'
import CVote from '../Home/Cvote'
import { CVOTE_PROFILES, Eekey } from '../Home/Cvote/constants'

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

export const Lain = createGlobalStyle<{ r: number }>`
* {
	color: hsla(0,50%,50%) !important;
}
#button-grid-panel {
	grid-template-areas:
	'bk bk bk bk th th th'
	'bk bk bk bk bl lk lk'
	'bk bk bk bk bl lk lk'
	'hl hl hl -- bl ha ha' // hl
	'tg tg tg aw cl ha ha'
	'tg tg tg dl dl dl dl'
	'fd hi hi hi tl tl tl' !important
}
#bg > div {
	transform: rotate(${(p) => p.r % 360}deg)

}
#mask {
	display: block;
	background: hsla(${(p) => p.r % 256},50%,50%,0.4);
}
/* *:focus {
	background: red !important;
	border: solid blue 8px !important;
} */
`

function SteinsBg() {
	return (
		<>
			<div id="cog-box">
				{/* <div id="cog1" className="cog" /> */}
				<div id="cog2" className="cog" />
				<div id="cog3" className="cog" />
				<div id="cog4" className="cog" />
				<div id="cog5" className="cog" />
			</div>
		</>
	)
}

const workLinks: ([string] | [string, string])[] = [
	[
		'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/hellowork.html',
		'https://www.hellowork.go.jp/',
	],
	['https://www.green-japan.com/'],
	['https://jp.indeed.com/'],
	['https://www.bizreach.jp/lp/bizreach-07/pc', 'https://www.bizreach.jp'],
	['https://www.r-agent.com/entry/ts/', 'https://www.r-agent.com'],
	['https://mynavi-job20s.jp/lp/fm/', 'https://mynavi-job20s.jp'],
]

function ExCompMain({ eeKey }: { eeKey: Eekey }) {
	if (eeKey === 'steinsgate') {
		return <SteinsBg />
	} else if (eeKey === 'nonnon') {
		return <EmbedWindow url="https://nyanpass.com/" />
	} else if (eeKey === 'mia') {
		return <EmbedWindow url="https://click.abyss.fun/" />
	} else if (eeKey === 'masshiro') {
		return <MasshiroEx />
	} else if (eeKey === 'halowa') {
		return (
			<div style={{ display: 'grid' }}>
				{workLinks.map(([link, label]) => (
					<RainbowFontCool key={link}>
						<a href={link} target="_blank" rel="noreferrer">
							{label || link}
						</a>
					</RainbowFontCool>
				))}
			</div>
		)
	} else if (eeKey === 'lain') {
		return <Lain r={uaHash()} />
	} else if (eeKey === 'sakurasou') {
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
function getEx(eeKey: Eekey, sid: string, rand: number, eeSim: boolean) {
	if (!eeKey) return null
	const cvote = CVOTE_PROFILES.find((p) => p.id === eeKey)

	return (
		<>
			{cvote && (
				<CVote animeId={eeKey} sid={sid} chars={cvote.chars} disabled={eeSim} />
			)}
			<ExCompMain eeKey={eeKey} />
		</>
	)
}
type Props = {
	sid: string
}
export function ExtraComp({ sid }: Props) {
	const { eeKey, eeSim } = useSettingsEe()

	return useMemo(() => getEx(eeKey, sid, Math.random(), eeSim), [eeKey, sid])
}
