import React from 'react'
import styled from 'styled-components'
import { steinsGateStyles } from './SteinsGateEx.styles'

const StyledSteinsGateContainer = styled.div`
	${steinsGateStyles}
`

export const SteinsGateEx = () => (
	<StyledSteinsGateContainer id="steinsgate">
		{/* SteinsGate specific content can be added here if needed */}
	</StyledSteinsGateContainer>
)

// export default SteinsGateEx // Keep or remove default export based on usage
