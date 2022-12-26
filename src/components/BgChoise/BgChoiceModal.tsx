import styled from 'styled-components'
import { Song } from '../../types'
import { searchImageUrl } from '../../util'
import BgChoice from './BgChoice'

type Props = {
	song: Song
	setBg: (url: string, time: number) => void
	open: boolean
	onClose: () => void
}
function BgChoiceModal({ song, setBg, open, onClose }: Props) {
	const sUrl = searchImageUrl(song.imageSearchWord)

	return (
		<Dialog open={open} data-open={open}>
			<div className="header">
				<button onClick={onClose}>閉じる</button>
				<p>{song.imageSearchWord}</p>
				<p>
					<a href={sUrl} target="_blank" rel="noreferrer">
						画像検索
					</a>
				</p>
			</div>

			<div style={{ marginTop: '120px' }}>
				{open && <BgChoice song={song} setBg={setBg} />}
			</div>
			<div className="footer">
				<button onClick={onClose}>閉じる</button>
			</div>
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
	padding: 12px 4px;
	border-radius: 4px;
	border: none;
	z-index: 10;
	/* background: var(--content-bg-color); */

	&[data-open='false'] {
		button {
			display: none;
		}
	}

	/* mobile */
	@media only screen and (max-width: 600px) {
		top: 5vh;
		left: 1vh;
		width: 96vw;
		max-height: 80vh;
	}
	button {
		border: none;
		font-size: 1.2rem;
		padding: 4px 12px;
	}

	.header {
		position: fixed;
		display: flex;
		gap: 1rem;
		background: white;
		z-index: 1;
	}
`

export default BgChoiceModal
