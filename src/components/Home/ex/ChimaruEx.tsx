import React from 'react'
import styled from 'styled-components'
import { chimaruStyles } from './ChimaruEx.styles'

const StyledChimaruContainer = styled.div`
	${chimaruStyles}
`

export const ChimaruEx = () => (
	<StyledChimaruContainer id="chimaru">
		{/* Chimaru specific content can be added here if needed */}
	</StyledChimaruContainer>
)

// export default ChimaruEx // Keep or remove default export based on usage
