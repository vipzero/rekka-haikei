import React, { useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { useLocalStorage } from './useLocalStorage'

type Props = {
	src: string
}

function isHTMLMediaElement(e: object): e is HTMLMediaElement {
	return typeof e['volume'] === 'number'
}

function Player({ src }: Props) {
	const [volume, setVolume] = useLocalStorage<number>('player-volume', 0.5)

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
	)
}
export default Player
