import React from 'react'
import styled from 'styled-components'
import { susuStyles } from './SusuEx.styles'

const StyledSusuContainer = styled.div`
	${susuStyles}
`

export const SusuEx = () => (
	<StyledSusuContainer id="susu">
		{/* Susu specific content can be added here if needed */}
	</StyledSusuContainer>
)

// export default SusuEx // Keep or remove default export based on usage
