import React from 'react'
import { range } from '../../../util'

export const BkbkEx = () => (
	<div id="bkbk">
		{range(20).map((i) => (
			<div
				className="bubbles"
				key={i}
				style={{
					left: `${Math.random() * 100}vw`,
					opacity: `${Math.random() * 0.5 + 0.5}`,
					animation: `up ${Math.random() * 10 + 4}s linear infinite`,
					transform: `scale(${Math.random() * 0.5 + 0.1})`,
				}}
			>
				<div style={{}}></div>
			</div>
		))}
	</div>
)

export default BkbkEx
