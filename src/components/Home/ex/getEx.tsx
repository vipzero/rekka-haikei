import React from 'react'
import { EeOpt, Eekey, EekeyState } from '../Cvote/constants'
import { CVOTE_PROFILES } from '../Cvote/charProfiles'
import CVote from '../Cvote'
import { ExCompMain } from './ExCompMain'

export function getEx(
	eeKey: EekeyState,
	sid: string,
	rand: number,
	eeSim: boolean,
	eeOpt: EeOpt,
	eeMemo: Record<string, string>
) {
	if (!eeKey) return null
	const cvote = CVOTE_PROFILES.find((p) => p.id === eeKey)
	const chars = (eeOpt?.id === 'cvote' && eeOpt?.chars) || cvote?.chars || []

	return (
		<>
			{cvote && (
				<CVote animeId={eeKey} sid={sid} chars={chars} disabled={eeSim} />
			)}
			<ExCompMain eeKey={eeKey} eeOpt={eeOpt} rand={rand} eeMemo={eeMemo} />
		</>
	)
}

export default getEx
