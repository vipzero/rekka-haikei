import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { isSongFull, useSongDb } from '../components/useSongDb'

function Home() {
	const [loaded, song] = useSongDb()

	useEffect(() => {
		console.log('loaded')
	}, [song])

	if (!loaded) return <span>まってね</span>

	return (
		<Wrap>
			<div
				key={song.title}
				style={{
					height: '100vh',
					background: `${song.imageLinks
						?.map((v) => `url('${v}')`)
						.join(', ')}`,
					backgroundSize: 'contain',
				}}
			>
				<p>
					{song.title} - {song.artist}
				</p>
				{isSongFull(song) ? (
					<p>
						{song.animeTitle} [{song.opOrEd}]
					</p>
				) : (
					<p>情報取得失敗</p>
				)}
			</div>
		</Wrap>
	)
}

const Wrap = styled.div`
	width: 100vw;
	p {
		padding: 10px;
		color: #ccc;
		font-weight: bold;
		font-size: 28px;
		text-shadow: 2px 2px 2px #000, -2px -2px 2px #000, -2px 2px 2px #000,
			2px -2px 2px #000;
		margin: 0;
	}
`

const HomePage = () => (
	<Layout title="vipstream">
		<Home />
	</Layout>
)

export default HomePage
