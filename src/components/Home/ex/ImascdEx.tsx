import React from 'react'
import styled from 'styled-components'
import { imascdStyles } from './ImascdEx.styles'

const StyledImascdContainer = styled.div`
	${imascdStyles}
`

export const ImascdEx = () => {
	return (
		<StyledImascdContainer id="imascd">
			<div>
				{/* 時計回転アニメーションと画像配置 */}
				<img src="/static/imascd.png" alt="imascd" />
			</div>
		</StyledImascdContainer>
	)
}

export default ImascdEx
