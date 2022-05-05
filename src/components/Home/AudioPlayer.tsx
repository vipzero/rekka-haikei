import React from 'react'
import ReactAudioPlayer from 'react-audio-player'
import styled from 'styled-components'
import { URL_PLAYER_API } from '../../config'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { isValidUrl } from '../../util'

type Props = {
	src: string
}

function isHTMLMediaElement(e: object): e is HTMLMediaElement {
	return typeof e['volume'] === 'number'
}

function AudioPlayer({ src }: Props) {
	const [volume, setVolume] = useLocalStorage<number>('player-volume', 0.5)

	if (!isValidUrl(src)) return null
	// const url = `${URL_PLAYER_API}?url=${encodeURIComponent(src)}`
	// const url = `https://www.google.com/search?q=${encodeURIComponent(src)}`

	return (
		<ReactAudioPlayer
			src={src}
			controls
			volume={volume}
			onVolumeChanged={(e) => {
				const t = e.target

				if (!!t && isHTMLMediaElement(t)) {
					setVolume(t.volume)
				}
			}}
		/>
		// <Style>
		// 	<iframe src={url} />
		// </Style>
	)
}
const Style = styled.div``

export default AudioPlayer
