import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { isSongFull } from '../../types'
import Layout from '../components/Layout'
import { useSongDb } from '../components/useSongDb'

function Home() {
	const [loaded, song] = useSongDb()
	const [theme, setTheme] = useState<number>(0)

	useEffect(() => {
		console.log('loaded')
	}, [song])

	if (!loaded) return <span>まってね</span>

	return (
		<Wrap
			data-theme={theme}
			onClick={() => {
				setTheme((v) => (v + 1) % 4)
			}}
		>
			<Background
				key={song.icy}
				style={{
					background: `${song.imageLinks
						?.map((v) => `url('${v}')`)
						.join(', ')}`,
					backgroundSize: 'contain',
				}}
			>
				{isSongFull(song) ? (
					<div className="content">
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
					</div>
				) : (
					<div className="content">
						<p className="titles">{song.icy}</p>
					</div>
				)}
			</Background>
		</Wrap>
	)
}

const Background = styled.div`
	height: 100vh;
	padding: 8px;
`

const Wrap = styled.div`
	width: 100vw;
	p {
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
	.content {
		margin-top: 8px;
		padding: 4px;
		border-radius: 4px;
	}
	&:hover {
		border-right: solid 4px white;
		border-bottom: solid 4px white;
	}
	&[data-theme='1'] {
		.content {
			background: rgba(0, 0, 0, 0.5);
		}
	}
	&[data-theme='2'] {
		.content {
			background: rgba(255, 255, 255, 0.5);
		}
	}
	&[data-theme='3'] {
		.content {
			display: none;
		}
	}
`

const HomePage = () => (
	<Layout title="vipstream">
		<Home />
	</Layout>
)

export default HomePage
