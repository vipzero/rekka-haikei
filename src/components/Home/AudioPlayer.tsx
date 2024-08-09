import ReactAudioPlayer from 'react-audio-player'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { isValidUrl } from '../../util'
import { useStreamUrl } from '../../hooks/useStreamUrl'

const isHTMLMediaElement = (e: object): e is HTMLMediaElement =>
	typeof e['volume'] === 'number'

function AudioPlayer() {
	const [volume, setVolume] = useLocalStorage<number>('player-volume', 0.5)
	const [src] = useStreamUrl()

	if (!isValidUrl(src)) return null

	return (
		<div id="player-box" data-visible={!!src}>
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
		</div>
	)
}

export default AudioPlayer
