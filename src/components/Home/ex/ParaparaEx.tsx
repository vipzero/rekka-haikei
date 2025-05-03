import React from 'react'
import styled from 'styled-components'
import { paraparaStyles } from './ParaparaEx.styles'

const StyledParaparaContainer = styled.div`
	${paraparaStyles}
`

export const ParaparaEx = () => (
	<StyledParaparaContainer id="parapara">
		{/* Parapara specific content can be added here if needed */}
	</StyledParaparaContainer>
)

// export default ParaparaEx // Keep or remove default export based on usage
