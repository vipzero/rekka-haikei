import React from 'react'
import { zIndex } from '../../../config'

export const EmbedWindow = ({ url }: { url: string }) => (
	<div style={{ height: '50vh', zIndex: zIndex.layerFrontEx }}>
		<iframe style={{ width: '100%', height: '100%' }} src={url} />
	</div>
)

export default EmbedWindow
