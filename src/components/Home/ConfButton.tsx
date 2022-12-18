import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
	checked?: boolean
	onClick: () => void
	className?: string
	text?: string
	helpText: string
	icon?: IconDefinition
	children?: ReactNode
	showToggleIcon?: boolean
	areaKey: string // grid-area用一意な2文字
}

export const ConfButton = ({
	onClick,
	children,
	className,
	helpText,
	icon,
	areaKey,
	checked = undefined,
	showToggleIcon = false,
	text = '',
}: Props) => {
	return (
		<Style
			className={`${className} `}
			onClick={onClick}
			data-checked={checked}
			style={{ gridArea: areaKey }}
		>
			{icon && (
				<IconWrap>
					<FontAwesomeIcon icon={icon} />
				</IconWrap>
			)}
			{showToggleIcon && (
				<IconWrap className={`faa-parent animated-hover`}>
					<FontAwesomeIcon
						className="faa-ring animated"
						icon={checked ? faToggleOn : faToggleOff}
					/>
				</IconWrap>
			)}
			<span className="help-text">{helpText}</span>
			{text}
			{children}
		</Style>
	)
}

const IconWrap = styled.span`
	width: 1.3rem;
`
const Style = styled.button`
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
