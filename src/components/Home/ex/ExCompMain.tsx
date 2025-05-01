import React from 'react'
import { FloatingBox, RainbowFontCool } from '../..'
import { uaHash } from '../../../util'
import { EeOpt, Eekey } from '../Cvote/constants'
import { BirthdayEx } from './BirthdayEx'
import { BkbkEx } from './BkbkEx'
import { EmbedWindow } from './EmbedWindow'
import { ImasBoard } from './ImasBoard'
import { ImasMilionTl } from './ImasMilionTl'
import { KokakuEx } from './KokakuEx'
import { Lain } from './Lain'
import { Masso } from './Masso'
import { MasshiroEx } from './MasshiroEx'
import { MtsEx } from './MtsEx'
import { RainEx } from './RainEx'
import { Trump } from './Trump'
import { Yrings } from './Yrings'

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

type ExCompMainProps = {
	eeKey: Eekey
	eeOpt: EeOpt
	rand: number
	eeMemo: Record<string, string>
}

export const ExCompMain = ({ eeKey, rand, eeOpt, eeMemo }: ExCompMainProps) => {
	if (eeKey === 'steinsgate') {
		return null
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
	} else if (eeKey === 'yojitsu') {
		return (
			<div id="yrings">
				<Yrings />
			</div>
		)
	} else if (eeKey === 'lain') {
		// Lainはグローバルスタイルコンポーネントなので、
		// Reactフラグメントで囲んで返す
		return (
			<>
				<Lain r={uaHash()} />
			</>
		)
	} else if (eeKey === 'mts10') {
		return (
			<MtsEx s={(eeOpt?.id !== 'text' ? eeMemo['mts10'] : eeOpt.s) || ''} />
		)
	} else if (eeKey === 'birth') {
		return (
			<BirthdayEx
				s={(eeOpt?.id !== 'text' ? eeMemo['birth'] : eeOpt.s) || ''}
			/>
		)
	} else if (eeKey === 'masso') {
		return (
			<div id="masso">
				<Masso seed={rand} />
			</div>
		)
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
	} else if (eeKey === 'bkbk') {
		return <BkbkEx />
	}
	return null
}

export default ExCompMain
