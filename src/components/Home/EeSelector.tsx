import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useSettings } from '../../hooks/useSettings'
import { eekeys } from './Cvote/constants'

type Props = {}

export const EeSelector = (props: Props) => {
	const { ee, eeKey, setEekey } = useSettings()
	const eeSaw = useMemo(() => eekeys.map((key) => ee?.[key] || false), [ee])

	return (
		<Style>
			<div className="head">ee:</div>
			{eeSaw.map((b, i) => (
				<div
					key={i}
					data-active={eeKey === eekeys[i]}
					onClick={() => {
						if (!b) return
						setEekey(eekeys[i], true)
					}}
				>
					{b ? '*' : '-'}
				</div>
			))}
		</Style>
	)
}

const Style = styled.div`
	display: flex;
	> div:not(.head) {
		cursor: default;
		&:hover {
			background: gray;
			filter: invert(1);
		}
		&[data-active='true'] {
			background: orange;
		}
	}
`
