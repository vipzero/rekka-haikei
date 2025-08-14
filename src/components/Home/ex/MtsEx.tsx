import React from 'react'
import styled from 'styled-components'
import { base64toBools } from '../../../util'
import { zIndex } from '../../../config'
import { ImasBoard } from './ImasBoard'
import { ImasMilionTl } from './ImasMilionTl'
import { Trump } from './Trump'

const MtsStyle = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 4px;
	z-index: ${zIndex.layerFrontEx};
`

export const MtsEx = ({ s }: { s: string }) => {
	if (!s) return null
	const lineUp = (s: string) => {
		if (s === '') return false
		const [os, ss, dols] = s.split(':')
		const opens = os ? os.split('').map((c) => c === '1') : null
		return {
			opens,
			cd: ss ? { [ss]: true } : (false as const),
			dols: dols ? dols.split(',').map(base64toBools) : [],
		}
	}
	const res = lineUp(s)

	if (!res) return null
	const { opens, cd, dols } = res
	return (
		<MtsStyle>
			{opens && <Trump opens={opens} />}
			{cd && <ImasMilionTl cd={cd} />}
			{dols && <ImasBoard bools={dols} />}
		</MtsStyle>
	)
}

export default MtsEx
