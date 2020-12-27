import { useEffect } from 'react'
import styled from 'styled-components'
import { isSongFull } from '../../types'
import Layout from '../components/Layout'
import { useSongDb } from '../components/useSongDb'

function Home() {
	const [loaded, song] = useSongDb()

	useEffect(() => {
		console.log('loaded')
	}, [song])

	if (!loaded) return <span>まってね</span>

	return (
		<Wrap>
			<div
				key={song.icy}
				style={{
					height: '100vh',
					background: `${song.imageLinks
						?.map((v) => `url('${v}')`)
						.join(', ')}`,
					backgroundSize: 'contain',
				}}
			>
				<p>{song.icy}</p>
				{isSongFull(song) ? (
					<p>
						{song.animeTitle} [{song.opOrEd}
						{song.spInfo}]
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
