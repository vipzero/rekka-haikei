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
		() =>
			eekeyGroups.map((eeg) => eeg.map((key) => ({ get: !!ee?.[key], key }))),
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
								key={b.key}
								className="tooltip"
								data-active={b.key === eeKey}
								onClick={() => {
									if (!b.get) return
									toggleEekeySimulate(b.key)
								}}
							>
								{b.get && <span className="tooltip-text">{b.key}</span>}
								{b.get ? '*' : '-'}
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
