import React from 'react'
import styled from 'styled-components'
import { sha3yoStyles } from './3sha3yoEx.styles'

const StyledSha3yoContainer = styled.div`
	${sha3yoStyles}
`

export const Sha3yoEx = () => {
	return (
		<StyledSha3yoContainer id="sha3yo">
			{/* SVGフィルター定義 */}
			<svg width="0" height="0">
				<filter id="wavy">
					<feTurbulence
						type="turbulence"
						baseFrequency="0.01"
						numOctaves="3"
						result="turbulence"
					/>
					<feDisplacementMap
						in2="turbulence"
						in="SourceGraphic"
						scale="30"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
			</svg>

			{/* ハリケーンエフェクト */}
			<div className="hurricane">3sha3yo</div>

			{/* 回転するSVG */}
			<div className="hurricane-s">
				<svg width="100" height="100" viewBox="0 0 100 100">
					<path d="M50 10 L90 50 L50 90 L10 50 Z" fill="#505" />
				</svg>
			</div>
		</StyledSha3yoContainer>
	)
}

export default Sha3yoEx
