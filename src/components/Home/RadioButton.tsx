import React from 'react'

type Props = {
	value: number
	current: number
	label: string
	onClick: () => void
}

export const RadioButton = ({ value, label, current, onClick }: Props) => (
	<>
		<input
			checked={current === value}
			onChange={() => {}}
			id={`radio-${value}`}
			type="radio"
			onClick={onClick}
		/>
		<label htmlFor={`theme${value}`}>{label}</label>
	</>
)
