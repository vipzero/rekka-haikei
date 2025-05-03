import React from 'react'
import styled from 'styled-components'
import { issyuukanfrStyles } from './IssyuukanfrEx.styles'

const StyledIssyuukanfrContainer = styled.div`
	${issyuukanfrStyles}
`

export const IssyuukanfrEx = () => (
	<StyledIssyuukanfrContainer id="issyuukanfr">
		{/* Issyuukanfr specific content can be added here if needed */}
	</StyledIssyuukanfrContainer>
)

// export default IssyuukanfrEx // Keep or remove default export based on usage
