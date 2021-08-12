import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
	checked: boolean
	onClick: () => void
	className?: string
}

const ToggleButton: FC<Props> = ({ onClick, checked, children, className }) => (
	<Wrap className={className} onClick={onClick} data-checked={checked}>
		{children}
	</Wrap>
)

const Wrap = styled.button`
	text-align: left;
	> * {
		padding: 0 2px;
	}
	&[data-checked='true'] {
		background: var(--checked-bg) !important;
		> * {
			padding: 2px 2px;
		}
	}
`

export default ToggleButton
