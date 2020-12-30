import Link from 'next/link'
import React, { ReactNode, useState } from 'react'
import useCookie from 'react-use-cookie'
import styled from 'styled-components'

import { Button } from '@material-ui/core'
import { History, isSongFull, Song } from '../../types'
import FadeBgChanger from './FadeBgChanger'
import { useFavorites } from './useFavorites'

type Props = {
	song: Song
	extraComp?: ReactNode
	histories: History[]
}

const not = (v: boolean) => !v
const notS = (s: string) => (s === 'on' ? 'off' : 'on')

function Home({ song, extraComp, histories }: Props) {
	const [viewConfig, setViewConfig] = useState<boolean>(false)
	const [viewBookmark, setViewBookmark] = useState<boolean>(false)
	const { favorites: books, toggleFavorites } = useFavorites()
	const [themeCookie, setTheme] = useCookie('theme', '0')
	const theme = Number(themeCookie)
	const [viewRecent, setViewRecent] = useCookie('view-recent', 'off')

	const cycleTheme = () => setTheme(String((theme + 1) % 4))
	const toggleRecent = () => setViewRecent(notS(viewRecent))
	const toggleConfig = () => setViewConfig(not)
	const toggleBookmark = () => setViewBookmark(not)

	return (
		<>
			<FadeBgChanger urls={song.imageLinks || []} />
			<Wrap data-theme={theme} onClick={toggleConfig}>
				{isSongFull(song) ? (
					<div className="content">
						<p className="titles">
							{song.title} - {song.artist}
						</p>
						<div className="details">
							{/* そろそろ汚えええええ */}
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
							{song.albumName && song.artworkUrl100 && (
								<div className="album">
									<p>
										{song.albumName} ({song.copyright}){' '}
										<a href={song.itunesUrl}>iTunes</a>
									</p>
									<img src={song.artworkUrl100} />
								</div>
							)}
						</div>
						<p className="icy">icy_title: {song.icy}</p>
					</div>
				) : (
					<div className="content">
						<p className="titles">{song.icy}</p>
					</div>
				)}
				<Config
					style={{
						display: viewConfig ? 'block' : 'none',
					}}
				>
					<div
						style={{
							background: '#949494',
							flex: 1,
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<div>
							<button onClick={cycleTheme}>表示切り替え</button>
							<button onClick={toggleRecent}>
								{viewRecent === 'on' ? '☑' : '□'}
								簡易履歴表示
							</button>
							<button
								style={{ float: 'right' }}
								className="confbtn"
								onClick={toggleConfig}
							>
								閉じる
							</button>
						</div>
						<div>
							<button
								data-active={books[song.icy]}
								onClick={() => toggleFavorites(song.icy)}
							>
								{books[song.icy]
									? '★ブックマーク中(β)'
									: '☆ブックマークしておく(β) ブラウザに保存します'}
							</button>
							<button onClick={toggleBookmark}>
								{viewBookmark ? '☑' : '□'}
								ブックマーク表示
							</button>
						</div>
						<div>
							<Link href="/history" passHref>
								<button>履歴検索(携帯回線注意)</button>
							</Link>
						</div>

						<div>
							<a href="http://anison.info">
								アニメ情報元(修正も募集中): Anison Generation
							</a>
						</div>
					</div>
				</Config>
				<div>{extraComp || null}</div>
				<div
					className="recenthistory"
					onClick={(e) => e.stopPropagation()}
					style={{ display: viewRecent === 'on' ? 'block' : 'none' }}
				>
					<p>■履歴</p>
					{histories.map((hist, i) => (
						<p key={i}>
							{hist.timeStr}: {hist.title}
						</p>
					))}
				</div>
				<div
					className="bookmarks"
					onClick={(e) => e.stopPropagation()}
					style={{ display: viewBookmark ? 'block' : 'none' }}
				>
					<p>■ブックマーク</p>
					{Object.keys(books).length === 0 && <p>ブックマークはまだないお</p>}
					{Object.keys(books).map((icy, i) => (
						<p key={i}>
							<span>{icy}</span>
							<span
								style={{ float: 'right', cursor: 'pointer' }}
								onClick={() => toggleFavorites(icy)}
							>
								[削除]
							</span>
						</p>
					))}
				</div>
			</Wrap>
		</>
	)
}

const Config = styled.div`
	/* height: 20vh; */
	width: 100%;
	display: flex;
	padding: 8px;
`

const Wrap = styled.div`
	width: 100vw;
	min-height: 100vh;
	display: grid;
	/* overflow: hidden; */
	grid-template-rows: max-content 1fr max-content max-content;
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
	.content {
		padding: 12px;
		border-radius: 4px;
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
	}

	.recenthistory,
	.bookmarks {
		p {
			font-size: 0.8rem;
		}
	}
	&[data-theme='1'] {
		.content,
		.recenthistory,
		.bookmarks {
			background: rgba(255, 255, 255, 0.5);
		}
	}
	&[data-theme='2'] {
		.content,
		.recenthistory,
		.bookmarks {
			background: rgba(0, 0, 0, 0.5);
		}
	}
	&[data-theme='3'] {
		.content,
		.recenthistory,
		.bookmarks {
			visibility: hidden;
		}
	}
	.album {
		img {
			margin-top: 12px;
			width: 150px;
		}
	}
	a {
		color: white;
		&:blink {
			color: white;
		}
	}
`

export default Home
