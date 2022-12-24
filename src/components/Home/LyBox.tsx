import { useEmolDb } from '../../hooks/useEmolDb'

export const LyBox = () => {
	const [_loaded, emol] = useEmolDb()
	return (
		<div className="lyricsbox">
			<pre>{emol.text}</pre>
		</div>
	)
}
