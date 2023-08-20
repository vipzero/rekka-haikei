import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
	checked?: boolean | `none`
	onClick: () => void
	className?: string
	text?: string
	helpText?: string
	icon?: IconDefinition
	children?: ReactNode
	showToggleIcon?: boolean
	disabled?: boolean
	areaKey?: string // grid-area用一意な2文字
	mini?: boolean
	variant?: 'toggle' | 'cycle' | 'action'
}

export const ConfButton = ({
	onClick,
	children,
	className,
	icon,
	areaKey,
	helpText = '',
	checked = `none`,
	showToggleIcon = false,
	disabled = false,
	text = '',
	mini = false,
	variant = checked === `none` ? `action` : `toggle`,
}: Props) => {
	return (
		<Style
			className={`${className} `}
			onClick={onClick}
			data-checked={checked}
			data-disabled={disabled}
			data-mini={mini}
			data-variant={variant}
			style={{ gridArea: areaKey }}
		>
			<div className="deco" />
			{icon && (
				<IconWrap>
					<FontAwesomeIcon icon={icon} />
				</IconWrap>
			)}
			{/* {showToggleIcon && (
				<IconWrap>
					<FontAwesomeIcon icon={checked ? faToggleOn : faToggleOff} />
				</IconWrap>
			)} */}
			{children}
			<span className="help-text">{helpText}</span>
			{text}
		</Style>
	)
}

const IconWrap = styled.span`
	/* width: 1.3rem; */
`
const Style = styled.button`
	position: relative;
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

	.deco {
		position: absolute;
		border: solid 1px var(--btn-bo);
		width: calc(100% - 4px);
		height: calc(100% - 4px);
	}
	&[data-variant='toggle'] {
		&[data-checked='false'] {
			&,
			.deco {
				border-radius: 4px 12px 12px 4px;
			}
			.deco {
				border-left: solid 4px var(--btn-bo);
			}
		}
		&[data-checked='true'] {
			&,
			.deco {
				border-radius: 12px 4px 4px 12px;
			}
			.deco {
				border-color: var(--btn-bo-checked);
				border-right: solid 4px var(--btn-bo-checked);
			}
		}
	}
	&[data-variant='cycle'] {
		&,
		.deco {
			border-radius: 12px 0px 12px 0px;
		}
		.deco {
			border: dashed 1px var(--btn-bo);
		}
	}

	&[data-checked='true'] {
		background: var(--btn-bg-checked-color) !important;
		svg {
			animation: var(--animation-bounce);
			animation-iteration-count: 1;
		}
	}

	&[data-disabled='true'] {
		/* background-blend-mode: multiply; */
		opacity: 0.2;
		cursor: default;
	}

	&[data-mini='true'] {
		margin: 0;
	}
`
