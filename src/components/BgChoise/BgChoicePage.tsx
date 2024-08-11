import { useSongDb } from '../../hooks/useSongDb'
import BgChoice from './BgChoice'

function Page() {
	const { loaded, song } = useSongDb()

	if (!loaded) return <p>ちょっとまってね</p>

	return (
		<>
			<p>
				<a href="./bg">戻る</a>
			</p>
			<BgChoice song={song} />
		</>
	)
}

function BgChoicePage() {
	return <Page />
}

export default BgChoicePage
