import React from 'react'
import styled from 'styled-components'
import { sakasaStyles } from './SakasaEx.styles'

const StyledSakasaContainer = styled.div`
	${sakasaStyles}
`

export const SakasaEx = () => (
	<StyledSakasaContainer id="sakasa">
		{/* Sakasa specific content can be added here if needed */}
	</StyledSakasaContainer>
)

// export default SakasaEx // Keep or remove default export based on usage
