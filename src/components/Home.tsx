import Link from 'next/link'
import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { History, isSongFull, Song } from '../../types'
import { isObjEmpty } from '../util'
import FadeBgChanger from './FadeBgChanger'
import Player from './Player'
import TimeBar from './TimeBar'
import { useFavorites } from './useFavorites'
import { useLocalStorage } from './useLocalStorage'

type Props = {
	song: Song
	extraComp?: ReactNode
	histories: History[]
	lyrics: string
	showLyrics: boolean
	setShowLyrics: (v: boolean) => void
}

const not = (v: boolean) => !v
const notS = (s: string) => (s === 'on' ? 'off' : 'on')

function makeTitle(song: Song) {
	if (isSongFull(song)) return `${song.title} - ${song.artist}`
	const [artist, title] = song.icy.split(' - ')

	if (!artist) return song.icy
	return `${title} - ${artist}`
}

function Home({
	song,
	extraComp,
	histories,
	lyrics,
	showLyrics,
	setShowLyrics,
}: Props) {
	const [showConfig, setShowConfig] = useState<boolean>(false)
	const [showBookmark, setShowBookmark] = useState<boolean>(false)
	const { favorites: books, toggleFavorites } = useFavorites()
	const [theme, setTheme] = useLocalStorage<number>('theme', 0)
	const [showHistory, setShowHistory] = useLocalStorage<boolean>(
		'show-history',
		false
	)
	const [streamUrl, setStreamUrl] = useLocalStorage<string>('stream-url', '')

	const cycleTheme = () => setTheme((theme + 1) % 4)
	const toggleRecent = () => setShowHistory(not)
	const closeRecent = () => setShowHistory(false)
	const toggleConfig = () => setShowConfig(not)
	const toggleBookmark = () => setShowBookmark(not)
	const closeBookmark = () => setShowBookmark(false)
	const toggleShowLyrics = () => setShowLyrics(!showLyrics)
	const removeStream = () => setStreamUrl('')

	const titles = makeTitle(song)
	const visible = (b: boolean) => (b ? {} : { display: 'none' })

	return (
		<>
			<FadeBgChanger urls={song?.imageLinks || []} />
			<TimeBar startTime={song.time} size={song.trackTimeMillis} />
			<Wrap data-theme={theme} onClick={toggleConfig}>
				<div className="content">
					<p className="titles">{titles}</p>
					<div className="details">
						<div style={{ display: 'flex' }}>
							<div style={{ flex: 1 }}>
								{/* そろそろ汚えええええ */}
								{isSongFull(song) && (
									<>
										<p>
											<span className="animetitle">{song.animeTitle}</span>
											<span className="subinfo">
												[{song.opOrEd}
												{song.spInfo ? ` ${song.spInfo}` : ''}] {song.category}
												{song.gameType && ' ' + song.gameType}
											</span>
										</p>
										<p>
											<span className="date">{song.date}</span>
											{song.chapNum && (
												<span className="chapnum">全{song.chapNum}話</span>
											)}
										</p>
									</>
								)}
								{song.singer && <p>歌手: {song.singer}</p>}
								{song.composer && <p>作詞: {song.composer}</p>}
								{song.writer && <p>作曲: {song.writer}</p>}
								{song.albumName && (
									<p>
										{song.albumName.replace(' - Single', '')} ({song.copyright}){' '}
										<a href={song.itunesUrl}>iTunes</a>
									</p>
								)}
							</div>
							<div>
								{song.artworkUrl100 && (
									<div className="album">
										<img src={song.artworkUrl100} />
									</div>
								)}
							</div>
						</div>
					</div>
					{!isSongFull(song) && <p className="icy">icy_title: {song.icy}</p>}
				</div>
				<div style={{ ...visible(!!streamUrl) }}>
					<Player src={streamUrl}></Player>
				</div>

				<LyricsBox data-theme={theme} style={{ ...visible(showLyrics) }}>
					<pre>{lyrics}</pre>
				</LyricsBox>
				<Config
					data-theme={theme}
					className="config"
					style={{ ...visible(showConfig) }}
				>
					<div
						style={{
							flex: 1,
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<div>
							<button onClick={cycleTheme}>テーマ({theme})</button>
							<button onClick={toggleRecent}>
								{showHistory ? '☑' : '□'}簡易履歴表示
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
								{showBookmark ? '☑' : '□'}
								ブックマーク表示
								{!isObjEmpty(books) && `(${Object.keys(books).length})`}
							</button>
							<button onClick={toggleShowLyrics}>
								{showLyrics ? '☑' : '□'}
								歌詞表示
							</button>
						</div>
						<div>
							<Link href="/history" passHref>
								<button>履歴検索(携帯回線注意)</button>
							</Link>
						</div>
						StreamURL:
						<input
							name="streaming-url"
							value={streamUrl}
							onChange={(e) => setStreamUrl(e.target.value)}
						/>
						<button onClick={removeStream}>x</button>
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
					style={{ display: showHistory ? 'block' : 'none' }}
				>
					<p>
						■履歴
						<span
							className="moc"
							style={{ float: 'right' }}
							onClick={closeRecent}
						>
							x
						</span>
					</p>
					{histories.map((hist, i) => (
						<p key={i}>
							{hist.timeStr}: {hist.title}
						</p>
					))}
				</div>
				<div
					className="bookmarks"
					onClick={(e) => e.stopPropagation()}
					style={{ display: showBookmark ? 'block' : 'none' }}
				>
					<p>
						■ブックマーク
						<span
							className="moc"
							style={{ float: 'right' }}
							onClick={closeBookmark}
						>
							x
						</span>
					</p>
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

const LyricsBox = styled.div`
	padding: 0 8px;
	background: rgba(255, 255, 255, 0.8);
	&[data-theme='2'] {
		background: rgba(0, 0, 0, 0.8);
		color: white;
	}
`

const Config = styled.div`
	/* height: 20vh; */
	width: 100%;
	display: flex;
	> div {
		padding: 8px;
		color: white;
		background: #aaa;
	}
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

	.moc {
		visibility: hidden;
	}
	.recenthistory:hover {
		.moc {
			visibility: visible;
		}
	}
	.bookmarks:hover {
		.moc {
			visibility: visible;
		}
	}
	.recenthistory,
	.bookmarks {
		padding: 0.4rem 0.4rem;
		p {
			font-size: 0.8rem;
		}
	}
	&[data-theme='1'] {
		.content,
		.recenthistory,
		.config > div,
		.bookmarks {
			background: rgba(255, 255, 255, 0.5);
		}
	}
	&[data-theme='2'] {
		.content,
		.recenthistory,
		.config > div,
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
