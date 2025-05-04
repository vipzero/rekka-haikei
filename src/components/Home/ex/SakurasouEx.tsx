import React from 'react'
import { FloatingBox } from '../..'
import { zIndex } from '../../../config'

export function SakurasouEx() {
	return (
		<div style={{ height: '30vh', zIndex: zIndex.layerFrontEx }}>
			<FloatingBox>
				<a href="http://sakurasou.tv/" target="_blanck">
					<img src="/maid-chan.png"></img>
				</a>
			</FloatingBox>
		</div>
	)
}

export default SakurasouEx
