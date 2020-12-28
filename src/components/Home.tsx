import React, { useEffect, useState } from 'react'
import { AnimateOnChange } from 'react-animation'
import styled from 'styled-components'
import { isSongFull } from '../../types'
import { useSongDb } from './useSongDb'

function Home() {
	const [loaded, song] = useSongDb()
	const [theme, setTheme] = useState<number>(0)
	const [viewConfig, setViewConfig] = useState<boolean>(false)
	const cycleTheme = () => setTheme((v) => (v + 1) % 4)

	useEffect(() => {
		console.log('loaded')
	}, [song])

	if (!loaded) return <span>{'■■■■■■■■■■□□□ NOWLOADING'}</span>

	return (
		<>
			<BackgroundContainer images={song.imageLinks || []} />
			<Wrap
				data-theme={theme}
				onClick={() => {
					setViewConfig((v) => !v)
				}}
			>
				{isSongFull(song) ? (
					<div className="content">
						<p className="titles">
							{song.title} - {song.artist}
						</p>
						<div className="details">
							<p>
								<span className="animetitle">{song.animeTitle}</span>
								<span className="subinfo">
									[{song.opOrEd}
									{song.spInfo ? ` ${song.spInfo}` : ''}]
								</span>
							</p>
							<p>{`${song.category} ${
								song.gameType && ' ' + song.gameType
							}`}</p>
							<p>
								<span className="date">{song.date}</span>
								{song.chapNum && (
									<span className="chapnum">全{song.chapNum}話</span>
								)}
							</p>
						</div>
						<p className="icy">icy_title: {song.icy}</p>
					</div>
				) : (
					<div className="content">
						<p className="titles">{song.icy}</p>
					</div>
				)}
				<Config
					style={{ display: viewConfig ? 'block' : 'none' }}
					onClick={(e) => {
						e.stopPropagation()
					}}
				>
					<div style={{ flex: 1 }}>
						<button onClick={cycleTheme}>表示切り替え</button>
						<button
							className="confbtn"
							onClick={(e) => {
								setViewConfig((v) => !v)
								e.stopPropagation()
							}}
						>
							閉じる
						</button>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						{/* <span>アプデログ</span>
						<textarea wrap="off" style={{ flex: 1, overflow: 'scroll' }}>
							{`
設定パーツ
透過機能追加
リリース日,アニメ情報追加
背景作成
`}
						</textarea> */}
					</div>
				</Config>
			</Wrap>
		</>
	)
}
const BackgroundContainer = ({ images }: { images: string[] }) => {
	return (
		<AnimateOnChange>
			<Background
				key={images[0]}
				style={{
					background: `${images.map((v) => `url('${v}')`).join(', ')}`,
					backgroundSize: 'contain',
				}}
			/>
		</AnimateOnChange>
	)
}

const Config = styled.div`
	height: 20vh;
	width: 100%;
	background: gray;
	display: flex;
	padding: 8px;
	align-self: flex-end;
`

const Background = styled.div`
	height: 100vh;
	width: 100vw;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
`

const Wrap = styled.div`
	width: 100vw;
	height: 100vh;
	display: grid;
	padding: 16px;
	button {
		border-radius: 4px;
		padding: 8px 20px;
		border: none;
		margin: 4px;
	}
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
			font-size: 0.9rem;
		}
		.animetitle {
			font-size: 1rem;
		}
		span:not(:first-child) {
			margin-left: 0.5rem;
		}
	}
	.icy {
		margin-top: 1rem;
		text-align: right;
		font-size: 0.5rem;
	}
	.content {
		padding: 12px;
		border-radius: 4px;
		align-self: flex-start;
	}
	&[data-theme='1'] {
		.content {
			background: rgba(255, 255, 255, 0.5);
		}
	}
	&[data-theme='2'] {
		.content {
			background: rgba(0, 0, 0, 0.5);
		}
	}
	&[data-theme='3'] {
		.content {
			visibility: hidden;
		}
	}
`

export default Home
