import styled, { createGlobalStyle, css } from 'styled-components'
import { useState } from 'react'
import { useSong } from '../../hooks/useSongAtom'
import { useBg } from '../../hooks/useSongDb'

type Props = {}
function BgChoice({}: Props) {
	const { setBg } = useBg()
	const song = useSong()
	const [preview, setPreview] = useState<string | null>(null)

	return (
		<Wrap>
			{song.imageLinks?.map((link, i) => (
				<div
					key={`${song.time}_${link}`}
					onClick={() => {
						if (i === 0) return
						setPreview(link)
						if (!confirm('背景を変更しますか？')) {
							return
						}
						setPreview(null)
						setBg(link, song.time)
					}}
					onMouseEnter={() => setPreview(link)}
					onMouseLeave={() => setPreview(null)}
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
			{preview && <MaskStyle bg={preview} />}
		</Wrap>
	)
}

const Wrap = styled.div`
	display: flex;
	height: 100%;
	width: 200%;

	div {
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
		/* transform-origin: top left; */
		width: min(20vw, 20vh);
		height: min(20vw, 20vh);
		object-fit: cover;
		@media only screen and (max-width: 600px) {
			// max-width: min(1000px, 100%);
			max-height: 30vh;
		}
	}
}
`
const MaskStyle: any = createGlobalStyle<{ bg: string }>`
	#mask {
		display: block;
		background: url(${(p) => p.bg});
		opacity: 0.9;
		clip-path: polygon(0 0, 90% 0, 60% 100%, 0 100%);
	}
`

export default BgChoice
