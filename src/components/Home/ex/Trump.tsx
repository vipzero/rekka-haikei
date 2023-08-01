import { useEffect, useState } from 'react'
import styled from 'styled-components'

const cards = '🂪,🂭,🂭,🂮,🂡'.split(',')
const cardsBack = '🂠'

type Props = {
	opens: [boolean, boolean, boolean, boolean, boolean]
}
export const Trump = (props: Props) => {
	return (
		<Style>
			{props.opens.map((v, i) => (
				<div key={i} data-v={v ? 1 : 0}>
					{v ? cards[i] : cardsBack}
				</div>
			))}
		</Style>
	)
}

const Style = styled.div`
	position: absolute;
	overflow: hidden;
	top: 0;
	left: 0;
	display: grid;

	height: 100vmax;
	grid-template-columns: repeat(13, 1fr);
	filter: url(#goo);
	mix-blend-mode: difference;
	gap: 2px;

	[data-v] {
	}
`
