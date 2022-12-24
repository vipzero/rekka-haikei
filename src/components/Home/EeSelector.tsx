import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useSettingsEe } from '../../hooks/useSettings'
import { Setting } from '../../types'
import { Eekey, eekeyGroups, EekeyState } from './Cvote/constants'

type EeDot = {
	get: boolean
	char: string
	key: Eekey
	label: string
}

const hint = (s: string, group: number) => {
	const full = s.replace(/./, '.')
	const head = s[0] + '~'
	// const tails = '~' + s[s.length - 1]
	const stripe = s.replace(/(.).?/g, '$1.')
	const shima = s.replace(/.(.)?/g, '.$1')

	return [head, full, stripe, shima][group]
}
const makeDot = (
	key: Eekey,
	comps: Setting['ee'],
	hintGroup: number
): EeDot => {
	const get = comps?.[key]
	if (get === 2) return { get: true, char: '#', key, label: key }
	if (get) return { get: true, char: '*', key, label: key }
	return { get: false, char: '-', key, label: hint(key, hintGroup) || '.' }
}

export const EeSelectorConnected = () => {
	const { ee: comps, eeKey, toggleEekeySimulate } = useSettingsEe()

	return (
		<EeSelector
			comps={comps}
			eeKey={eeKey}
			toggleSimulate={toggleEekeySimulate}
		/>
	)
}

type Props = {
	toggleSimulate: (key: Eekey) => void
	eeKey: EekeyState
	comps: Setting['ee']
}
export const EeSelector = ({ comps, eeKey, toggleSimulate }: Props) => {
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
						{eeSaw.map((b) => (
							<span
								key={b.key}
								className="tooltip"
								data-active={b.key === eeKey}
								onClick={() => {
									if (!b.get) return
									toggleSimulate(b.key)
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
