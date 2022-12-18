import {
	faEye,
	faEyeSlash,
	faStar,
	faTimesCircle,
	IconDefinition,
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
	checked?: boolean
	onClick: () => void
	className?: string
	text?: string
	helpText: string
	icon?: IconDefinition
	children?: ReactNode
}

export const ConfButton = ({
	onClick,
	children,
	className,
	helpText,
	icon,
	checked = undefined,
	text = '',
}: Props) => {
	return (
		<Style className={className} onClick={onClick} data-checked={checked}>
			{icon && <FontAwesomeIcon icon={icon} />}
			{typeof checked === 'boolean' && (
				<FontAwesomeIcon icon={checked ? faEye : faEyeSlash} />
			)}
			<span className="help">{helpText}</span>
			{text}
		</Style>
	)
}

export const Style = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2px;
	font-family: 'Roboto Mono', monospace;
	.help-text {
		display: none;
	}

	cursor: pointer;
	svg {
		padding: 2px 0;
		height: 1.1rem;
	}

	&[data-checked='true'] {
		background: var(--btn-bg-checked-color) !important;
	}
`
