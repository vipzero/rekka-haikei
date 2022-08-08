import React, { useState } from 'react'
import styled from 'styled-components'
import { TMP_TRACK_TIME } from '../../config'
import { useFavorites } from '../../hooks/useFavorites'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import {
	useSettings,
	useSettingsEe,
	useSettingsFakeBar,
	useSettingsCustomTheme,
	useSettingsShowEmol,
} from '../../hooks/useSettings'
import { Setting, Song } from '../../types'
import { BookmarkMiniList } from './BookmarkMiniList'
import { exStyles } from './exStyles'
import { ExtraComp } from './ExtraComp'
import FadeBgChanger from './FadeBgChanger'
import AudioPlayer from './AudioPlayer'
import RecentHistoryList from './RecentHistoryList'
import SettingBox from './SettingBox'
import SongInfo from './SongInfo'
import { themeStyles } from './themeStyles'
import TrackTimeBar from './TrackTimeBar'
import { useEmolDb } from '../../hooks/useEmolDb'

const sideMap: Record<Setting['sideMode'], 'right' | 'center' | 'left'> = {
	wide: 'center',
	l: 'right',
	r: 'left',
}

type Props = {
	song: Song
}
function Home({ song }: Props) {
	const { theme, sideMode, lockBgNum, toggleSetting } = useSettings()
	const { eeKey } = useSettingsEe()
	const { showEmol } = useSettingsShowEmol()

	const { favorites: books, toggleFavorites } = useFavorites()
	const [streamUrl, setStreamUrl] = useLocalStorage<string>('stream-url', '')
	const [url, setUrl] = useState<string>('')
	const { enableFakeBar } = useSettingsFakeBar()
	const timeBarSize =
		song.trackTimeMillis ||
		(enableFakeBar === 'on' ? TMP_TRACK_TIME : undefined)
	const { customTheme } = useSettingsCustomTheme()

	return (
		<Master
			onClick={toggleSetting}
			// @ts-ignore
			style={{ '--song-time': `${song.trackTimeMillis / 1000}s` }}
			data-ex={eeKey || theme}
			data-ex-just={eeKey}
			data-has-art={!!song.artworkUrl100}
			data-theme={theme}
			data-time-bar-fake={!song.trackTimeMillis && enableFakeBar === 'on'}
			className={theme === 2 ? 'dark-theme' : 'light-theme'}
			customTheme={customTheme}
		>
			<Mask id="mask">
				<Mask id="mask2" />
			</Mask>
			<FadeBgChanger
				sid={song.time}
				urls={song?.imageLinks || []}
				lockCount={lockBgNum}
				changedUrl={setUrl}
				px={sideMap[sideMode] || 'center'}
			/>
			<TrackTimeBar startTime={song.time} size={timeBarSize} />
			<Wrap data-side={sideMode}>
				<SongInfo song={song} />
				<div id="player-box" data-visible={!!streamUrl}>
					<AudioPlayer src={streamUrl}></AudioPlayer>
				</div>
				<SettingBox
					song={song}
					streamUrl={streamUrl}
					setStreamUrl={setStreamUrl}
					favorited={books[song.icy]}
					toggleFavorited={() => toggleFavorites(song.icy)}
					favCount={Object.keys(books).length}
					url={url}
				/>

				<ExtraComp sid={`${song.time}`} />
				<RecentHistoryList />
				{showEmol && <LyricsBox />}

				<BookmarkMiniList books={books} toggleFavorites={toggleFavorites} />
			</Wrap>
		</Master>
	)
}

const LyricsBox = () => {
	const [loaded, emol] = useEmolDb()
	return (
		<div className="lyricsbox">
			<pre>{emol.text}</pre>
		</div>
	)
}

const Wrap = styled.div`
	width: 50vw;
	&[data-side='wide'] {
		width: 100%;
	}
	&[data-side='r'] {
		position: absolute;
		right: 0;
	}

	min-height: 100vh;
	display: grid;
	/* overflow: hidden; */
	grid-template-rows: repeat(7, max-content);
	padding: 16px;
	color: white;

	button {
		border-radius: 4px;
		border: none;
		margin: 4px;
		min-height: 24px;
		min-width: 36px;
		text-align: center;
		&.big {
			min-width: 124px;
		}
		svg {
			font-size: 0.8rem;
			margin-right: 2px;
			margin-left: 2px;
		}
	}

	.moc {
		visibility: hidden;
	}
	.co-recenthist:hover {
		.moc {
			visibility: visible;
		}
	}
	.co-books:hover {
		.moc {
			visibility: visible;
		}
	}
	[data-co] {
		padding: 0.4rem 0.4rem;
		p {
			font-size: 0.8rem;
			span:not(:first-child) {
				margin-left: 4px;
			}
		}
	}
	.titles {
		font-size: 1.1rem;
	}
	.titles-single {
		display: none;
	}

	@keyframes flash {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	[data-visible='false'] {
		display: none;
	}
`

const Master = styled.div<{ customTheme: string }>`
	${themeStyles}
	${exStyles}
	&[data-theme='5'] {
		${(p) => p.customTheme}
	}

	button {
		color: var(--btn-fo-color);
		background-color: var(--btn-bg-color);
	}
	[data-co] {
		background: var(--content-bg-color);
		overflow: auto;
		white-space: nowrap;
	}
	#panel,
	[data-co] {
		p,
		a {
			font-weight: bold;
			color: var(--panel-fo-color);
			text-shadow: 1px 1px 1px var(--panel-fo-shadow-color),
				-1px -1px 1px var(--panel-fo-shadow-color),
				-1px 1px 1px var(--panel-fo-shadow-color),
				1px -1px 1px var(--panel-fo-shadow-color);
			margin: 0;
		}
	}
	.typography {
		color: var(--font-color);
	}

	&:not(:hover) {
		#player-box {
			display: none;
		}
	}
	&[data-time-bar-fake='true'] {
		#timebar {
			.fill {
				opacity: 60%;
			}

			.pointer {
				width: 12px;
				background: white;
			}
		}
	}
	.lyricsbox {
		background: rgba(255, 255, 255, 0.5);
	}
`

const Mask = styled.div`
	display: none;
	background: #cccc;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	z-index: -5;
`

export default Home
