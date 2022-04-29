import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const DownloadButton = ({
	url,
	filename,
}: {
	url: string
	filename: string
}) => {
	return (
		<div style={{ width: '100%', height: '100%', position: 'relative' }}>
			<a href={url} download={filename} style={{ color: 'var(--font-color)' }}>
				<FontAwesomeIcon icon={faDownload} />
				<img
					src={url}
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						top: 0,
						left: 0,
						objectFit: 'fill',
						opacity: 0,
					}}
				/>
			</a>
		</div>
	)
}
