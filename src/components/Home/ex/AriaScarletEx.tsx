import React from 'react'
import styled from 'styled-components'
import { ariascarletStyles } from './AriaScarletEx.styles'

const StyledAriaScarletContainer = styled.div`
	${ariascarletStyles}
`

export const AriaScarletEx = () => {
	return (
		<StyledAriaScarletContainer id="ariascarlet">
			{/* AriaScarlet固有のコンテンツがあれば追加 */}
		</StyledAriaScarletContainer>
	)
}

export default AriaScarletEx
