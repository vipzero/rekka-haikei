import { useLoaded } from '../../hooks/useSongAtom'
import { useSongDb } from '../../hooks/useSongDb'
import BgChoice from './BgChoice'

function Page() {
	useSongDb()
	const loaded = useLoaded()

	if (!loaded) return <p>ちょっとまってね</p>

	return (
		<>
			<p>
				<a href="./bg">戻る</a>
			</p>
			<BgChoice />
		</>
	)
}

function BgChoicePage() {
	return <Page />
}

export default BgChoicePage
