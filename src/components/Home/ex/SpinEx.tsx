import React from 'react'
import styled from 'styled-components'
import { spinStyles } from './SpinEx.styles'

const StyledSpinContainer = styled.div`
	${spinStyles}
`

export const SpinEx = () => (
	<StyledSpinContainer id="spin">
		{/* Spin specific content can be added here if needed */}
	</StyledSpinContainer>
)

// export default SpinEx // Keep or remove default export based on usage
