import React from 'react'
import styled from 'styled-components'
import { flipStyles } from './FlipEx.styles'

const StyledFlipContainer = styled.div`
	${flipStyles}
`

export const FlipEx = () => (
	<StyledFlipContainer id="flip">
		{/* Flip specific content can be added here if needed */}
	</StyledFlipContainer>
)

// export default FlipEx // Keep or remove default export based on usage
