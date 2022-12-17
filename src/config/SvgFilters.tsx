import React from 'react'

export const SvgFilters = () => (
	<>
		<svg style={{ display: 'none' }}>
			<filter id="wavy">
				<feTurbulence
					x="-100"
					y="-100"
					baseFrequency="0.009"
					numOctaves="5"
					seed="2"
				>
					<animate
						attributeName="baseFrequency"
						dur="60s"
						values="0.02;0.005;"
						rotate="90"
						repeatCount="indefinite"
					/>
				</feTurbulence>
				<feDisplacementMap in="SourceGraphic" scale="30" />
			</filter>
		</svg>
	</>
)
