import React from 'react'

type Props = {
	value: number
	current: number
	label: string
	labelKey?: string
	onClick: () => void
}

export const RadioButton = ({
	value,
	label,
	current,
	onClick,
	labelKey,
}: Props) => {
	const id = `radio-${labelKey}-${value}`

	return (
		<>
			<input
				id={id}
				checked={current === value}
				onChange={() => {}}
				type="radio"
				onClick={onClick}
			/>
			<label htmlFor={id}>{label}</label>
		</>
	)
}

RadioButton.defaulValue = { labelKey: '_' }
