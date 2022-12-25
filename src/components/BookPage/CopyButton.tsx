import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styled from 'styled-components'

type Props = {
	onClick: () => void
	label?: string
}
export const CopyButton = ({ onClick }: Props) => {
	return (
		<Button onClick={onClick}>
			<FontAwesomeIcon icon={faCopy} />
		</Button>
	)
}

const Button = styled.button`
	/* max-width: 2.4rem; */
	margin-left: 4px;
`
