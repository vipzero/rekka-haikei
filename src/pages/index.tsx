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
					padding: '8px',
					background: `${song.imageLinks
						?.map((v) => `url('${v}')`)
						.join(', ')}`,
					backgroundSize: 'contain',
				}}
			>
				{isSongFull(song) ? (
					<>
						<p className="titles">
							{song.title} - {song.artist}
						</p>
						<div className="details">
							<p>
								<span className="animetitle">{`${song.animeTitle}`}</span>
								<span className="subinfo">{` [${song.opOrEd}${
									song.spInfo ? ` ${song.spInfo}` : ''
								}]`}</span>
								<span className="chapnum">
									{song.chapNum && `全${song.chapNum}話`}
								</span>
							</p>
							<p>{`${song.category} ${
								song.gameType && ' ' + song.gameType
							}`}</p>
						</div>
						<p className="icy">icy: {song.icy}</p>
					</>
				) : (
					<p className="titles">{song.icy}</p>
				)}
			</div>
		</Wrap>
	)
}

const Wrap = styled.div`
	width: 100vw;
	p {
		padding-top: 8px;
		color: #ccc;
		font-weight: bold;
		text-shadow: 2px 2px 2px #000, -2px -2px 2px #000, -2px 2px 2px #000,
			2px -2px 2px #000;
		margin: 0;
		font-size: 28px;
	}
	.details {
		p {
			padding-top: 4px;
			font-size: 0.8rem;
		}
	}
	.icy {
		font-size: 0.5rem;
	}
`

const HomePage = () => (
	<Layout title="vipstream">
		<Home />
	</Layout>
)

export default HomePage
