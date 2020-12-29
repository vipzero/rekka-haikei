import Link from 'next/link'
import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { History, isSongFull, Song } from '../../types'
import FadeBgChanger from './FadeBgChanger'

type Props = {
	song: Song
	extraComp?: ReactNode
	histories: History[]
}
const not = (v: boolean) => !v

function Home({ song, extraComp, histories }: Props) {
	const [theme, setTheme] = useState<number>(0)
	const [viewConfig, setViewConfig] = useState<boolean>(false)
	const [viewRecent, setViewRecent] = useState<boolean>(false)
	const cycleTheme = () => setTheme((v) => (v + 1) % 4)
	const toggleRecent = () => setViewRecent(not)
	const toggleConfig = () => setViewConfig(not)

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
				<div>{extraComp || null}</div>
				<div
					className="recenthistory"
					style={{
						display: viewRecent ? 'block' : 'none',
					}}
				>
					{histories.map((hist, i) => (
						<p key={i}>
							{hist.timeStr}: {hist.title}
						</p>
					))}
				</div>
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
						onClick={(e) => {
							e.stopPropagation()
						}}
					>
						<button onClick={cycleTheme}>表示切り替え</button>
						<button onClick={toggleRecent}>簡易履歴</button>
						<Link href="/history" passHref>
							<button>履歴検索(携帯回線注意)</button>
						</Link>
						<button className="confbtn" onClick={toggleConfig}>
							閉じる
						</button>
					</div>
					<p>
						<a href="http://anison.info">
							アニメ情報元(修正も募集中): Anison Generation
						</a>
					</p>
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

const Config = styled.div`
	/* height: 20vh; */
	width: 100%;
	display: flex;
	padding: 8px;
`

const Wrap = styled.div`
	width: 100vw;
	height: 100vh;
	display: grid;
	overflow: hidden;
	grid-template-rows: max-content 1fr max-content;
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
	.recenthistory {
		p {
			font-size: 0.8rem;
		}
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
