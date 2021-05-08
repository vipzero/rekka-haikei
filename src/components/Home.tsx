import Link from 'next/link'
import React, { FC, ReactNode, useState } from 'react'
import styled from 'styled-components'
import {
	faHistory,
	faBookmark,
	faStar,
	faColumns,
	faStopwatch,
	faMusic,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarFill } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addFeedback } from '../../service/firebase'
import { History, isSongFull, Song, Theme } from '../../types'
import { isObjEmpty } from '../util'
import FadeBgChanger from './FadeBgChanger'
import Player from './Player'
import TimeBar from './TimeBar'
import { useFavorites } from './useFavorites'
import { useLocalStorage } from './useLocalStorage'

const themes: Theme[] = [
	{ id: 0, key: 'CLEAR' },
	{ id: 1, key: 'WHITE' },
	{ id: 2, key: 'BLACK' },
	{ id: 3, key: 'EMPTY' },
	{ id: 4, key: 'SINGL' },
]

type Props = {
	song: Song
	extraComp?: ReactNode
	histories: History[]
	lyrics: string
	showLyrics: boolean
	setShowLyrics: (v: boolean) => void
}

const not = (v: boolean) => !v

function makeTitle(song: Song) {
	if (isSongFull(song)) return `${song.title} - ${song.artist}`
	const [artist, title] = song.icy.split(' - ')

	if (!artist) return song.icy
	return `${title} - ${artist}`
}

type TBProps = {
	checked: boolean
	onClick: () => void
}

const ToggleButtonWrap = styled.button`
	text-align: left;
	> * {
		padding-right: 4px;
	}
`

const ToggleButton: FC<TBProps> = ({ onClick, checked, children }) => (
	<ToggleButtonWrap onClick={onClick}>
		<input type="checkbox" checked={checked || false} onChange={() => {}} />
		{children}
	</ToggleButtonWrap>
)

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
	const [showCounts, setShowCounts] = useState<boolean>(true)
	const { favorites: books, toggleFavorites } = useFavorites()
	const [theme, setTheme] = useLocalStorage<number>('theme', 0)
	const [side, setSide] = useLocalStorage<boolean>('side-mode', false)
	const [showHistory, setShowHistory] = useLocalStorage<boolean>(
		'show-history',
		false
	)
	const [streamUrl, setStreamUrl] = useLocalStorage<string>('stream-url', '')
	const [feedBack, setFeedBack] = useState<string>('')

	const cycleTheme = () => setTheme((theme + 1) % themes.length)
	const toggleRecent = () => setShowHistory(not)
	const closeRecent = () => setShowHistory(false)
	const toggleConfig = () => setShowConfig(not)
	const toggleBookmark = () => setShowBookmark(not)
	const toggleCounts = () => setShowCounts(not)
	const closeBookmark = () => setShowBookmark(false)
	const toggleShowLyrics = () => setShowLyrics(!showLyrics)
	const removeStream = () => setStreamUrl('')

	const titles = makeTitle(song)
	const visible = (b: boolean) => (b ? {} : { display: 'none' })

	const ThemeButton = ({ tid, label }: { tid: number; label: string }) => (
		<>
			<input
				checked={theme === tid}
				onChange={() => {}}
				id={`theme${tid}`}
				type="radio"
				onClick={() => setTheme(tid)}
			/>
			<label htmlFor={`theme${tid}`}>{label}</label>
		</>
	)

	return (
		<div onClick={toggleConfig}>
			<FadeBgChanger
				urls={song?.imageLinks || []}
				px={side ? 'right' : 'center'}
			/>
			<TimeBar startTime={song.time} size={song.trackTimeMillis} />
			<Wrap
				data-theme={theme}
				className={theme === 2 ? 'dark-theme' : 'light-theme'}
				style={{ width: side ? '50vw' : '100%' }}
			>
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
										{song.albumName.replace(' - Single', '')}
										{song.copyright && ` (${song.copyright})`}{' '}
										<a href={song.itunesUrl}>iTunes</a>
									</p>
								)}
								{showCounts && (
									<p className="tags">
										{Object.entries(song.wordCounts)
											.filter(([k]) => k !== song.icy)
											.map(([k, v], i) => (
												<span key={i}>
													[{k} ({v === 1 ? '初' : `${v} 回目`})]
												</span>
											))}
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
					{isSongFull(song) && <p className="icy">icy_title: {song.icy}</p>}
				</div>
				<div style={{ ...visible(!!streamUrl) }}>
					<Player src={streamUrl}></Player>
				</div>
				<Config
					data-theme={theme}
					className="config"
					style={{ ...visible(showConfig) }}
				>
					<div style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}>
						<div>
							<button onClick={cycleTheme}>テーマ({theme})</button>
							{themes.map((t) => (
								<ThemeButton key={t.key} tid={t.id} label={t.key} />
							))}

							<button
								style={{ float: 'right' }}
								className="confbtn"
								onClick={toggleConfig}
							>
								閉じる
							</button>
						</div>
						<div>
							<ToggleButton
								checked={!!books[song.icy]}
								onClick={() => toggleFavorites(song.icy)}
							>
								<FontAwesomeIcon icon={books[song.icy] ? faStar : faStarFill} />
								{books[song.icy]
									? 'ブックマーク中'
									: 'ブックマークしておく(ブラウザ保存)'}
							</ToggleButton>
						</div>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'max-content max-content',
							}}
						>
							<ToggleButton checked={showLyrics} onClick={toggleShowLyrics}>
								<FontAwesomeIcon icon={faMusic} />
								歌詞表示
							</ToggleButton>
							<ToggleButton checked={showCounts} onClick={toggleCounts}>
								<FontAwesomeIcon icon={faStopwatch} />
								カウント表示
							</ToggleButton>
							<ToggleButton checked={showHistory} onClick={toggleRecent}>
								<FontAwesomeIcon icon={faHistory} />
								簡易履歴表示
							</ToggleButton>
							<ToggleButton checked={side} onClick={() => setSide(not)}>
								<FontAwesomeIcon icon={faColumns} />
								ハーフモード
							</ToggleButton>

							<ToggleButton checked={showBookmark} onClick={toggleBookmark}>
								<FontAwesomeIcon icon={faBookmark} />
								ブックマーク表示
								{!isObjEmpty(books) && `(${Object.keys(books).length})`}
							</ToggleButton>
						</div>

						<div style={{ display: 'flex', gap: '4px' }}>
							<Link href="/history" passHref>
								<a>履歴</a>
							</Link>
							<Link href="/popular" passHref>
								<a>ブクマ数統計</a>
							</Link>
							<Link href="/choice" passHref>
								<a>背景補正</a>
							</Link>
						</div>

						<div>
							StreamURL:
							<input
								name="streaming-url"
								value={streamUrl}
								onChange={(e) => setStreamUrl(e.target.value || '')}
							/>
							{streamUrl.includes('http://') && (
								<span style={{ color: 'red' }}>https 非対応</span>
							)}
							<button onClick={removeStream}>x</button>
						</div>
						<div style={{ display: 'flex', gap: '8px' }}>
							<a href="http://anison.info">アニメ情報元: Anison Generation</a>
							<a href="https://github.com/vipzero/rekka-haikei">コード</a>
						</div>
						<div>
							<button
								onClick={() =>
									setFeedBack(
										feedBack
											? ''
											: `${song.icy}\nsize: ${window.innerWidth},${
													window.innerHeight
											  }\nword: ${song.wordCountsAna
													.map((v) => v.name)
													.join(',')}\n`
									)
								}
							>
								レポート
							</button>
							{!!feedBack && (
								<div style={{}}>
									歌詞の分割ミス・表示崩れなどあれば
									<textarea
										rows={4}
										style={{ width: '60vw' }}
										value={feedBack}
										onChange={(e) => setFeedBack(e.target.value)}
									></textarea>
									<button
										onClick={() => {
											addFeedback(feedBack).then(() => {
												alert('フィードバックサンクスb')
												setFeedBack('')
											})
										}}
									>
										送信
									</button>
								</div>
							)}
						</div>
					</div>
				</Config>

				<LyricsBox data-theme={theme} style={{ ...visible(showLyrics) }}>
					<pre>{lyrics}</pre>
				</LyricsBox>
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
								onClick={() => confirm('削除する') && toggleFavorites(icy)}
							>
								[削除]
							</span>
						</p>
					))}
				</div>
			</Wrap>
		</div>
	)
}

const LyricsBox = styled.div`
	padding: 0 8px;
	background: rgba(255, 255, 255, 0.8);
	color: black;
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
		background: #aaa;
	}
	a,
	label {
		color: white !important;
	}
	&[data-theme='1'] {
		color: black !important;
		a,
		label {
			color: black !important;
		}
	}
`

const Wrap = styled.div`
	width: 100vw;
	min-height: 100vh;
	display: grid;
	/* overflow: hidden; */
	grid-template-rows: repeat(5, max-content);
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
	.tags {
		span {
			font-size: 10px;
		}
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
				font-size: 1.3rem;
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
	.album {
		img {
			margin-top: 12px;
			width: 150px;
		}
	}
	a {
		color: #ccc;
		&:blink {
			color: #ccc;
		}
	}
	color: white;

	&[data-theme='1'] {
		.content,
		.recenthistory,
		.config > div,
		.bookmarks {
			background: rgba(255, 255, 255, 0.5);
		}
	}
	&[data-theme='2'] {
		button {
			background: black;
			color: white;
		}
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
	.titles-single {
		display: none;
	}
	&[data-theme='4'] {
		.recenthistory,
		.bookmarks {
			visibility: hidden;
		}
		.content > * {
			visibility: hidden;
		}
		.content > .titles {
			visibility: visible;
		}
	}
`

export default Home
