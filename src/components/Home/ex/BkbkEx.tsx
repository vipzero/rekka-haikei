import React from 'react'
import styled, { keyframes } from 'styled-components'
import { range } from '../../../util'
import { bkbkStyles } from './BkbkEx.styles'

const up = keyframes`
  100% {
    transform: translateY(-100vh);
  }
`

// plasma keyframes seems unused in the original #bkbk style block,
// but including it here for completeness if needed later.
const plasma = keyframes`
  0% {
    transform: scale(6) translate3d(20px, 0, 0);
  }
  50% {
    transform: scale(1) translate3d(-60px, 0, 0);
  }
  100% {
    transform: scale(6) translate3d(20px, 0, 0);
  }
`

const StyledBkbkContainer = styled.div`
	${bkbkStyles}
`

export const BkbkEx = () => (
	<StyledBkbkContainer id="bkbk">
		{range(20).map((i) => (
			<div
				className="bubbles"
				key={i}
				style={{
					left: `${Math.random() * 100}vw`,
					opacity: `${Math.random() * 0.5 + 0.5}`,
					// animation property removed, handled by styled-components now
					// We only need to set the random duration inline
					animationDuration: `${Math.random() * 10 + 4}s`,
					transform: `scale(${Math.random() * 0.5 + 0.1})`,
				}}
			>
				{/* Inner div might be for additional styling or content */}
				<div style={{}}></div>
			</div>
		))}
	</StyledBkbkContainer>
)

// export default BkbkEx // Keep or remove default export based on usage
