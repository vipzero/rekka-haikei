import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
	checked: boolean
	onClick: () => void
	className?: string
}

const ToggleButton: FC<Props> = ({ onClick, checked, children, className }) => (
	<ConfButton className={className} onClick={onClick} data-checked={checked}>
		{children}
	</ConfButton>
)

export const ConfButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2px;
	cursor: pointer;
	svg {
		padding: 2px 0;
	}

	&[data-checked='true'] {
		background: var(--checked-bg) !important;
	}
`

export default ToggleButton
