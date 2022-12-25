import ReactAudioPlayer from 'react-audio-player'
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

export default AudioPlayer
