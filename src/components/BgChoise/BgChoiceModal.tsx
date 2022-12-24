import styled from 'styled-components'
import { Song } from '../../types'
import BgChoice from './BgChoice'

type Props = {
	song: Song
	setBg: (url: string, time: number) => void
	open: boolean
	onClose: () => void
}
function BgChoiceModal({ song, setBg, open, onClose }: Props) {
	return (
		<Dialog open={open}>
			<button onClick={onClose}>閉じる</button>
			<BgChoice song={song} setBg={setBg} />
		</Dialog>
	)
}

const Dialog = styled.dialog`
	position: absolute;
	top: 5vh;
	left: 5vh;
	width: 90vw;
	max-height: 80vh;
	overflow-y: scroll;
	overflow-x: hidden;
	margin: 0;
	padding: 10px 5px;
	border-radius: 4px;
	border: none;

	/* mobile */
	@media only screen and (max-width: 600px) {
		top: 5vh;
		left: 1vh;
		width: 96vw;
		max-height: 80vh;
	}
`

export default BgChoiceModal
