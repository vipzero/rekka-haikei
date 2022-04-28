import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useSettingsEe } from '../../hooks/useSettings'
import { eekeys } from './Cvote/constants'

type Props = {}

const range = (start: number, end: number) =>
	Array.from({ length: end - start }, (_, i) => i + start)

export const EeSelector = (props: Props) => {
	const { ee, eeKey, setEekeySimulate } = useSettingsEe()
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
						setEekeySimulate(eekeys[i])
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

	.tooltip {
		position: relative;
		cursor: pointer;
		&:hover {
			background: gray;
			filter: invert(1);
		}
		&[data-active='true'] {
			background: orange;
		}
	}

	.tooltip-text {
		opacity: 0;
		visibility: hidden;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -60px;
		display: inline-block;
		padding: 4px;
		white-space: nowrap;
		font-size: 0.8rem;
		line-height: 1.3;
		background: #333;
		color: #fff;
		border-radius: 4px;
		transition: 0.3s ease-in;
	}

	.tooltip:hover .tooltip-text {
		opacity: 1;
		visibility: visible;
	}
`
