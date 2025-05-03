import React from 'react'
import styled from 'styled-components'
import { gkgurashiStyles } from './GkgurashiEx.styles'

const StyledGkgurashiContainer = styled.div`
	${gkgurashiStyles}
`

export const GkgurashiEx = () => (
	<StyledGkgurashiContainer id="gkgurashi">
		{/* Gkgurashi specific content can be added here if needed */}
	</StyledGkgurashiContainer>
)

// export default GkgurashiEx // Keep or remove default export based on usage
