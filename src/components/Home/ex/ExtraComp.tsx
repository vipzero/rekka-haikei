import { useMemo } from 'react'
import { useSettingsEe } from '../../../hooks/useSettings'
import { getEx } from './getEx'

type Props = {
	sid: string
}

export function ExtraComp({ sid }: Props) {
	const { eeKey, eeSim, eeOpt, eeMemo } = useSettingsEe()

	return useMemo(
		() => getEx(eeKey, sid, Math.random(), eeSim, eeOpt, eeMemo),
		[eeKey, sid]
	)
}

export default ExtraComp
