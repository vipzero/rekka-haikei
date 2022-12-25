import styled from 'styled-components'
import { Song } from '../../types'

type Props = {
	song: Song
	setBg: (url: string, time: number) => void
}
function BgChoice({ song, setBg }: Props) {
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
	width: 200%;
	transform: scale(0.5, 0.5);
	transform-origin: top left;

	div {
		margin: 4px;
		padding: 2px;
		border: solid black 1px;
		cursor: pointer;

		&:first-child {
			border-color: red;
			cursor: auto;
		}
		&:hover {
			border: solid orange 1px;
		}
	}
	img {
		min-width: 100px;
		max-width: 1000px;
		@media only screen and (max-width: 600px) {
			max-width: min(1000px, 100%);
		}
	}
`

export default BgChoice
