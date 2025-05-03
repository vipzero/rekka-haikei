import React from 'react'
import styled from 'styled-components'
import { rakuproStyles } from './RakuproEx.styles'

const StyledRakuproContainer = styled.div`
	${rakuproStyles}
`

export const RakuproEx = () => (
	<StyledRakuproContainer id="rakupro">
		{/* Rakupro specific content can be added here if needed */}
	</StyledRakuproContainer>
)

// export default RakuproEx // Keep or remove default export based on usage
