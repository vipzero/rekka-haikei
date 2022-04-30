import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useSettingsEe } from '../../hooks/useSettings'
import { eekeys } from './Cvote/constants'

type Props = {}

const range = (start: number, end: number) =>
	Array.from({ length: end - start }, (_, i) => i + start)

export const EeSelector = (props: Props) => {
	const { ee, eeKey, toggleEekeySimulate } = useSettingsEe()
	const eeSaw = useMemo(() => eekeys.map((key) => ee?.[key] || false), [ee])

	return (
		<Style>
			<div className="head">ee:</div>
			{eeSaw.map((b, i) => (
				<div
					key={i}
					className="tooltip"
					data-active={eeKey === eekeys[i]}
					onClick={() => {
						if (!b) return
						toggleEekeySimulate(eekeys[i])
					}}
				>
					<div className="tooltip-text">
						{b
							? eekeys[i]
							: eekeys[i][0] + eekeys[i].substring(1).replace(/./g, '.')}
					</div>
					{b ? '*' : '-'}
				</div>
			))}
		</Style>
	)
}

const Style = styled.div`
	display: flex;
`
