import { uaHash } from '../../../util'
import { EeOpt, Eekey } from '../Cvote/constants'
import { BirthdayEx } from './BirthdayEx'
import { BkbkEx } from './BkbkEx'
import { EmbedWindow } from './EmbedWindow'
import { HalowaEx } from './HalowaEx'
import { KokakuEx } from './KokakuEx'
import { Lain } from './Lain'
import { MasshiroEx } from './MasshiroEx'
import { Masso } from './Masso'
import { MtsEx } from './MtsEx'
import { PsychopassEx } from './PsychopassEx'
import { RainEx } from './RainEx'
import { SakurasouEx } from './SakurasouEx'
import { Yrings } from './Yrings'

// ShanimasEx.styles.tsx の内容を統合

type ExCompMainProps = {
	eeKey: Eekey
	eeOpt: EeOpt
	rand: number
	eeMemo: Record<string, string>
}

export const ExCompMain = ({ eeKey, rand, eeOpt, eeMemo }: ExCompMainProps) => {
	if (eeKey === 'nonnon') {
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
		return <HalowaEx />
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
		return <SakurasouEx />
	} else if (eeKey === 'bkbk') {
		return <BkbkEx />
	}
	return null
}

export default ExCompMain
