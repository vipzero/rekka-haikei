import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useSettingsEe } from '../../hooks/useSettings'
import { Eekey, eekeyGroups } from './Cvote/constants'

type EeDot = {
	get: boolean
	char: string
	key: Eekey
	label: string
}

const hint = (s: string, group: number) => {
	const full = s.replace(/./, '.')
	const head = s[0] + '~'
	const tails = '~' + s[s.length - 1]
	const shima = s.replace(/.(.)?/g, '.$1')

	return [head, full, tails, shima][group]
}
const makeDot = (
	key: Eekey,
	comps: Record<string, true>,
	hintGroup: number
): EeDot => {
	const get = !!comps?.[key]
	if (get) return { get, char: '*', key, label: key }
	return { get, char: '-', key, label: hint(key, hintGroup) || '.' }
}

export const EeSelector = () => {
	const { ee: comps, eeKey, toggleEekeySimulate } = useSettingsEe()

	const eeSawGroups = useMemo(
		() => eekeyGroups.map((eeg, i) => eeg.map((key) => makeDot(key, comps, i))),
		[comps]
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
								<span className="tooltip-text">{b.label}</span>

								{b.char}
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
