import styled from 'styled-components'
import { zIndex } from '../../config'
import { useSong } from '../../hooks/useSongAtom'
import { searchImageUrl } from '../../util'
import BgChoice from './BgChoice'

type Props = {
	open: boolean
	onClose: () => void
}
function BgChoiceModal({ open }: Props) {
	const song = useSong()
	const sUrl = searchImageUrl(song.imageSearchWord)

	return (
		<Dialog open={open} data-open={open}>
			<div className="header">
				<p>{song.imageSearchWord}</p>
				<p>
					<a href={sUrl} target="_blank" rel="noreferrer">
						画像検索
					</a>
				</p>
			</div>

			<div style={{ marginTop: '8px' }}>{open && <BgChoice />}</div>
		</Dialog>
	)
}

const Dialog = styled.dialog`
	position: absolute;
	left: 8px;
	right: 20px;
	width: calc(100% - 16px);
	top: 75vh;
	height: calc(25vh - 8px);
	overflow-y: hidden;
	overflow-x: scroll;
	margin: 0;
	padding: 12px 4px;
	border-radius: 4px;
	border: solid gray;
	z-index: ${zIndex.layerModal};
	/* background: var(--content-bg-color); */

	&[data-open='false'] {
		button {
			display: none;
		}
	}
	p {
		padding: 0;
		margin: 0;
	}

	/* mobile */
	@media only screen and (max-width: 600px) {
	}
	button {
		border: none;
		font-size: 1.2rem;
		padding: 4px 12px;
		height: 20px;
	}

	.header {
		display: flex;
		gap: 1rem;
		background: white;
		z-index: 1;
	}
`

export default BgChoiceModal
