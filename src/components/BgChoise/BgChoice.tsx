import styled from 'styled-components'
import { useSong } from '../../hooks/useSongAtom'
import { useBg } from '../../hooks/useSongDb'

type Props = {}
function BgChoice({}: Props) {
	const { setBg } = useBg()
	const song = useSong()
	return (
		<Wrap>
			{song.imageLinks?.map((link, i) => (
				<div
					key={`${song.time}_${link}`}
					onClick={() => {
						if (i === 0) return
						if (!confirm('背景を変更しますか？')) return
						setBg(link, song.time)
					}}
				>
					<img
						src={link}
						onError={(e) => {
							if (e.currentTarget.parentElement)
								e.currentTarget.parentElement.style.display = 'none'
						}}
					/>
				</div>
			))}
		</Wrap>
	)
}

const Wrap = styled.div`
	padding: 16px;
	display: flex;
	flex-wrap: wrap;
	width: 100%;

	div {
		margin: 4px;
		padding: 2px;
		border: solid black 1px;
		cursor: pointer;

		zoom: 0.4;
		max-width: 1000px;
		@media only screen and (max-width: 600px) {
			zoom: 0.2;
		}

		&:first-child {
			border-color: red;
			cursor: auto;
		}
		&:hover {
			border: solid orange 1px;
		}
	}
	img {
		/* transform-origin: top left; */
		width: 100%;
		max-width: 1000px;
		@media only screen and (max-width: 600px) {
			max-width: min(1000px, 100%);
		}
	}
`

export default BgChoice
