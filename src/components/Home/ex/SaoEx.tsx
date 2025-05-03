import React from 'react'
import styled from 'styled-components'
import { saoStyles } from './SaoEx.styles'

const StyledSaoContainer = styled.div`
	${saoStyles}
`

export const SaoEx = () => {
	return (
		<StyledSaoContainer id="sao">
			{/* SAO固有のコンテンツがあれば追加 */}
		</StyledSaoContainer>
	)
}

export default SaoEx
