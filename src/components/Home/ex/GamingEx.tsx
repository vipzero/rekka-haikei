import React from 'react'
import styled from 'styled-components'
import { gamingStyles } from './GamingEx.styles'

const StyledGamingContainer = styled.div`
	${gamingStyles}
`

export const GamingEx = () => (
	<StyledGamingContainer id="gaming">
		{/* Gaming specific content can be added here if needed */}
	</StyledGamingContainer>
)

// export default GamingEx // Keep or remove default export based on usage
