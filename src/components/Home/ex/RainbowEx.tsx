import React from 'react'
import styled from 'styled-components'
import { rainbowStyles } from './RainbowEx.styles'

const StyledRainbowContainer = styled.div`
	${rainbowStyles}
`

export const RainbowEx = () => (
	<StyledRainbowContainer id="rainbow">
		{/* Rainbow specific content can be added here if needed */}
	</StyledRainbowContainer>
)

// export default RainbowEx // Keep or remove default export based on usage
