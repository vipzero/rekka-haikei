import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
	onChange: (checked: boolean) => void
	children: ReactNode
	checked: boolean
}

export const CheckBox = ({ onChange, children, checked }: Props) => {
	return (
		<Style>
			<label>
				<input
					type="checkbox"
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
				/>
				{children}
			</label>
		</Style>
	)
}

const Style = styled.div`
	padding: 4px 12px;
	margin: 2px;
	border: 1px solid #ffc3cf;
	border-radius: 4px;

	input {
		margin-right: 2px;
	}
`
