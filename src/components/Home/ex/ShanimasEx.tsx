import React from 'react'
import styled from 'styled-components'
import { shanimasStyles } from './ShanimasEx.styles'

const StyledShanimasContainer = styled.div`
	${shanimasStyles}
`

export const ShanimasEx = () => (
	<StyledShanimasContainer id="shanimas">
		{/* Shanimas specific content can be added here if needed */}
	</StyledShanimasContainer>
)

// export default ShanimasEx // Keep or remove default export based on usage
