export const SvgFilters = () => (
	<>
		<svg style={{ display: 'none' }}>
			<filter
				id="wavy"
				x="-100%"
				y="-100%"
				width="400%"
				height="400%"
				filterUnits="objectBoundingBox"
			>
				<feTurbulence
					// type="fractalNoise"
					baseFrequency="0.009"
					numOctaves="5"
					seed="2"
				>
					<animate
						attributeName="baseFrequency"
						dur="60s"
						values="0.01;0.020;0.01"
						repeatCount="indefinite"
					/>
				</feTurbulence>
				<feOffset dx="500" dy="100" in="BackgroundImage" />
				<feDisplacementMap in="SourceGraphic" scale="30" />
			</filter>
		</svg>
		<svg style={{ display: 'none' }}>
			<defs>
				<filter id="goo">
					<feGaussianBlur in="SourseGraphic" stdDeviation="10" result="name">
						<animate
							attributeName="stdDeviation"
							dur="60s"
							values="10;0;10"
							repeatCount="indefinite"
						/>
					</feGaussianBlur>
					<feColorMatrix
						in="name"
						type="matrix"
						values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 18 -13"
					/>
				</filter>
			</defs>
		</svg>
	</>
)
