import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useSettingsEe } from '../../hooks/useSettings'
import { eekeyGroups, eekeys } from './Cvote/constants'

type Props = {}

const range = (start: number, end: number) =>
	Array.from({ length: end - start }, (_, i) => i + start)

export const EeSelector = (props: Props) => {
	const { ee, eeKey, toggleEekeySimulate } = useSettingsEe()
	const eeSawGroups = useMemo(
		() => eekeyGroups.map((eeg) => eeg.map((key) => ee?.[key] || false)),
		[ee]
	)

	return (
		<Style>
			<div>ee:</div>
			<div className="eeg">
				{eeSawGroups.map((eeSaw, j) => (
					<div key={j}>
						{eeSaw.map((b, i) => (
							<span
								key={i}
								className="tooltip"
								style={{ gridArea: `egg${i}` }}
								data-active={eeKey === eekeys[i]}
								onClick={() => {
									if (!b) return
									toggleEekeySimulate(eekeys[i])
								}}
							>
								<span className="tooltip-text">
									{b
										? eekeys[i]
										: eekeys[i][0] + eekeys[i].substring(1).replace(/./g, '.')}
								</span>
								{b ? '*' : '-'}
							</span>
						))}
					</div>
				))}
			</div>
		</Style>
	)
}

const Style = styled.div`
	display: flex;
	.eeg {
		display: grid;
		grid-template-areas: '1fr 1fr';
		justify-content: space-between;
		> div {
			display: flex;
			&:nth-of-type(2n + 1) {
				justify-content: start;
			}
			&:nth-of-type(2n) {
				justify-content: end;
			}
		}
	}
`
