import { faHurricane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo } from 'react'
import { useMouse } from 'rooks'
import { createGlobalStyle } from 'styled-components'
import { FloatingBox, RainbowFontCool } from '../..'
import { useSettingsEe } from '../../../hooks/useSettings'
import { range, uaHash } from '../../../util'
import CVote from '../Cvote'
import { CVOTE_PROFILES } from '../Cvote/charProfiles'
import { Eekey, EekeyState, EeOpt } from '../Cvote/constants'

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

const KokakuEx = () => {
	const mouse = useMouse()

	return (
		<img
			id="kokaku-pointer"
			style={{
				position: 'absolute',
				top: (mouse.pageY || -100) + Math.random() * 15 - 20,
				left: (mouse.pageX || -100) + Math.random() * 20 - 20,
			}}
			src="/static/sac-min.png"
		/>
	)
}

export const Lain = createGlobalStyle<{ r: number }>`
* {
	color: hsla(0,50%,50%) !important;
}
#button-grid-panel {
	grid-template-areas:
		'fd va bb ss dd _h'
		'fd va bb ss dd _h'
		'fd vt _d lk la _h'
		'vh vt _d lk la ha'
		'vh vb rr th pp ha'
		'vh vb rr th pp ha' !important;

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

const RainEx = () => {
	return (
		<div id="rains-box">
			<div className="rains">
				{range(20).map((i) => (
					<span key={i} />
				))}
			</div>
		</div>
	)
}

function ExCompMain({ eeKey }: { eeKey: Eekey }) {
	if (eeKey === 'steinsgate') {
	} else if (eeKey === 'nonnon') {
		return <EmbedWindow url="https://nyanpass.com/" />
	} else if (eeKey === 'mia') {
		return <EmbedWindow url="https://click.abyss.fun/" />
	} else if (eeKey === 'masshiro') {
		return <MasshiroEx />
	} else if (eeKey === 'kokaku') {
		return <KokakuEx />
	} else if (eeKey === 'rain') {
		return <RainEx />
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
	} else if (eeKey === '3sha3yo') {
		return (
			<div className="hurricane">
				<div className="hurricane-s">
					<FontAwesomeIcon icon={faHurricane} />
				</div>
			</div>
		)
		// } else if (eeKey === 'imascd') {
		// 	return (
		// 		<div id="imascd">
		// 			<div>
		// 				<img src="/static/clock-hands.svg" />
		// 			</div>
		// 		</div>
		// 	)
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
function getEx(
	eeKey: EekeyState,
	sid: string,
	rand: number,
	eeSim: boolean,
	eeOpt: EeOpt
) {
	if (!eeKey) return null
	const cvote = CVOTE_PROFILES.find((p) => p.id === eeKey)
	const chars = (eeOpt?.id === 'cvote' && eeOpt?.chars) || cvote?.chars || []

	return (
		<>
			{cvote && (
				<CVote animeId={eeKey} sid={sid} chars={chars} disabled={eeSim} />
			)}
			<ExCompMain eeKey={eeKey} />
		</>
	)
}
type Props = {
	sid: string
}
export function ExtraComp({ sid }: Props) {
	const { eeKey, eeSim, eeOpt } = useSettingsEe()

	return useMemo(
		() => getEx(eeKey, sid, Math.random(), eeSim, eeOpt),
		[eeKey, sid]
	)
}
