import React from 'react'
import styled from 'styled-components'
import { offlineStyles } from './OfflineEx.styles'

const StyledOfflineContainer = styled.div`
	${offlineStyles}
`

export const OfflineEx = () => {
	return (
		<StyledOfflineContainer id="offline">
			{/* グレースケールフィルター効果は#bgに適用されます */}
		</StyledOfflineContainer>
	)
}

export default OfflineEx
