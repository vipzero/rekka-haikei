import React from 'react'
import { useMouse } from 'rooks'

export const KokakuEx = () => {
	const mouse = useMouse()

	return (
		<img
			id="kokaku-pointer"
			style={{
				position: 'absolute',
				top: (mouse.pageY || -100) + Math.random() * 15 - 20,
				left: (mouse.pageX || -100) + Math.random() * 20 - 20,
			}}
			src="/static/sac-min.png"
		/>
	)
}

export default KokakuEx
