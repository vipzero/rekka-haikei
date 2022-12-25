

type Props<T> = {
	value: T
	current: T
	label: string
	labelKey?: string
	onClick: () => void
}

export const RadioButton = <T=number>({
	value,
	label,
	current,
	onClick,
	labelKey,
}: Props<T>) => {
	const id = `radio-${labelKey}-${value}`

	return (
		<div>
			<input
				id={id}
				checked={current === value}
				onChange={() => {}}
				type="radio"
				onClick={onClick}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	)
}

RadioButton.defaulValue = { labelKey: '_' }
