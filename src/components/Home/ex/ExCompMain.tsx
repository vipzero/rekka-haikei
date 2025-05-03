import styled, { css } from 'styled-components'
import { FloatingBox, RainbowFontCool } from '../..'
import { uaHash } from '../../../util'
import { EeOpt, Eekey } from '../Cvote/constants'
import { AriaScarletEx } from './AriaScarletEx'
import { SaoEx } from './SaoEx'
import { Sha3yoEx } from './3sha3yoEx'
import { BirthdayEx } from './BirthdayEx'
import { BkbkEx } from './BkbkEx'
import { ChimaruEx } from './ChimaruEx'
import { EmbedWindow } from './EmbedWindow'
import { FlipEx } from './FlipEx'
import { GamingEx } from './GamingEx'
import { GkgurashiEx } from './GkgurashiEx'
import { ImascdEx } from './ImascdEx'
import { IssyuukanfrEx } from './IssyuukanfrEx'
import { KokakuEx } from './KokakuEx'
import { Lain } from './Lain'
import { MasshiroEx } from './MasshiroEx'
import { Masso } from './Masso'
import { MtsEx } from './MtsEx'
import { OfflineEx } from './OfflineEx'
import { ParaparaEx } from './ParaparaEx'
import { PsychopassEx } from './PsychopassEx'
import { RainbowEx } from './RainbowEx'
import { RainEx } from './RainEx'
import { SpinEx } from './SpinEx'
import { SteinsGateEx } from './SteinsGateEx'
import { SusuEx } from './SusuEx'
import { Yrings } from './Yrings'

// ShanimasEx.styles.tsx の内容を統合
const shanimasStyles = css`
	#mask {
		display: block;
		opacity: 0.5;
		animation: rainbow-anim 20s linear infinite alternate;
		mask-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
	}
`

// ShanimasEx.tsx の内容を統合
const StyledShanimasContainer = styled.div`
	${shanimasStyles}
`

const ShanimasEx = () => (
	<StyledShanimasContainer id="shanimas">
		{/* Shanimas specific content can be added here if needed */}
	</StyledShanimasContainer>
)

// RakuproEx.styles.tsx の内容を統合
const rakuproStyles = css`
	#mask {
		display: block;
		opacity: 0.2;
		animation: aurora-anim 20s linear infinite alternate;
	}

	/* background-size: 400% 400%; */
	#mask2 {
		/* background: linear-gradient(to top, #e700fcaa, transparent); */
		/* background: linear-gradient(to top, #fffa, transparent); */
	}
`

// RakuproEx.tsx の内容を統合
const StyledRakuproContainer = styled.div`
	${rakuproStyles}
`

const RakuproEx = () => (
	<StyledRakuproContainer id="rakupro">
		{/* Rakupro specific content can be added here if needed */}
	</StyledRakuproContainer>
)

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
		return <SteinsGateEx />
	} else if (eeKey === 'nonnon') {
		return <EmbedWindow url="https://nyanpass.com/" />
	} else if (eeKey === 'mia') {
		return <EmbedWindow url="https://click.abyss.fun/" />
	} else if (eeKey === 'masshiro') {
		return <MasshiroEx />
	} else if (eeKey === 'kokaku') {
		return <KokakuEx />
	} else if (eeKey === 'psychopass') {
		return <PsychopassEx />
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
	} else if (eeKey === 'chimaru') {
		return <ChimaruEx />
	} else if (eeKey === 'susu') {
		return <SusuEx />
	} else if (eeKey === 'flip') {
		return <FlipEx />
	} else if (eeKey === 'spin') {
		return <SpinEx />
	} else if (eeKey === 'gaming') {
		return <GamingEx />
	} else if (eeKey === 'rainbow') {
		return <RainbowEx />
	} else if (eeKey === 'gkgurashi') {
		return <GkgurashiEx />
	} else if (eeKey === 'parapara') {
		return <ParaparaEx />
	} else if (eeKey === 'issyuukanfr') {
		return <IssyuukanfrEx />
	} else if (eeKey === ('shanimas' as Eekey)) {
		return <ShanimasEx />
	} else if (eeKey === ('rakupro' as Eekey)) {
		return <RakuproEx />
	} else if (eeKey === 'ariascarlet') {
		return <AriaScarletEx />
	} else if (eeKey === 'sao') {
		return <SaoEx />
	} else if (eeKey === ('3sha3yo' as Eekey)) {
		return <Sha3yoEx />
	} else if (eeKey === ('imascd' as Eekey)) {
		return <ImascdEx />
	} else if (eeKey === 'offline') {
		return <OfflineEx />
	}
	return null
}

export default ExCompMain
