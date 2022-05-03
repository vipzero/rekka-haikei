import React, { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
	checked: boolean
	onClick: () => void
	className?: string
	children?: ReactNode
}

const ToggleButton = ({ onClick, checked, children, className }: Props) => (
	<ConfButton className={className} onClick={onClick} data-checked={checked}>
		{children}
	</ConfButton>
)

export const ConfButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2px;
	font-family: 'Roboto Mono', monospace;

	cursor: pointer;
	svg {
		padding: 2px 0;
	}

	&[data-checked='true'] {
		background: var(--btn-bg-checked-color) !important;
	}
`

export default ToggleButton
