import React, { useState } from 'react'
import styled from 'styled-components'
import { useFavorites } from '../../hooks/useFavorites'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useSettings, useSettingsEe } from '../../hooks/useSettings'
import { Song } from '../../types'
import { BookmarkList } from './BookmarkList'
import { exStyles } from './exStyles'
import { ExtraComp } from './ExtraComp'
import FadeBgChanger from './FadeBgChanger'
import Player from './Player'
import RecentHistoryList from './RecentHistoryList'
import SettingBox from './SettingBox'
import SongInfo from './SongInfo'
import { themeStyles } from './themeStyles'
import TimeBar from './TimeBar'

type Props = {
	song: Song
}
function Home({ song }: Props) {
	const { theme, showCounts, sideMode, lockBg, toggleSetting } = useSettings()
	const { eeKey } = useSettingsEe()

	const { favorites: books, toggleFavorites } = useFavorites()
	const [streamUrl, setStreamUrl] = useLocalStorage<string>('stream-url', '')
	const [url, setUrl] = useState<string>('')

	return (
		<Master
			onClick={toggleSetting}
			data-ex={eeKey || theme}
			data-ex-just={eeKey}
			data-has-art={!!song.artworkUrl100}
		>
			<Mask id="mask">
				<Mask id="mask2" />
			</Mask>
			<FadeBgChanger
				sid={song.time}
				urls={song?.imageLinks || []}
				lockCount={lockBg}
				changedUrl={setUrl}
				px={sideMode ? 'right' : 'center'}
			/>
			<TimeBar startTime={song.time} size={song.trackTimeMillis} />
			<Wrap
				data-theme={theme}
				className={theme === 2 ? 'dark-theme' : 'light-theme'}
				style={{ width: sideMode ? '50vw' : '100%' }}
			>
				<SongInfo song={song} showCounts={showCounts}></SongInfo>
				<div id="player-box" data-visible={!!streamUrl}>
					<Player src={streamUrl}></Player>
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
				<BookmarkList books={books} toggleFavorites={toggleFavorites} />
			</Wrap>
		</Master>
	)
}

const Wrap = styled.div`
	width: 100vw;
	min-height: 100vh;
	display: grid;
	/* overflow: hidden; */
	grid-template-rows: repeat(6, max-content);
	padding: 16px;
	color: white;

	button {
		border-radius: 4px;
		border: none;
		margin: 4px;
		--checked-bg: #999;
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
	p {
		color: #ccc;
		font-weight: bold;
		text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, -1px 1px 1px #000,
			1px -1px 1px #000;
		margin: 0;
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
	a {
		color: #ccc;
		&:blink {
			color: #ccc;
		}
	}
	.titles {
		font-size: 1.1rem;
	}
	.titles-single {
		display: none;
	}

	${themeStyles}

	[data-important='true'] {
		animation: flash 1s linear infinite;
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

const Master = styled.div`
	${exStyles}
	&:not(:hover) {
		#player-box {
			display: none;
		}
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
