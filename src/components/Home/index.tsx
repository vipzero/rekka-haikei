import React, { ReactNode } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { Song } from '../../../types'
import { settingState } from '../../atom/SettingAtom'
import { useFavorites } from '../../hooks/useFavorites'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { toggle } from '../../util'
import FadeBgChanger from '../FadeBgChanger'
import Player from '../Player'
import TimeBar from '../TimeBar'
import { BookmarkList } from './BookmarkList'
import ConfigForm from './ConfigForm'
import RecentHistoryList from './RecentHistoryList'
import SongInfo from './SongInfo'

type Props = {
	song: Song
	extraComp?: ReactNode
	lyrics: string
}
function Home({ song, extraComp, lyrics }: Props) {
	const { showCounts, showLyrics, sideMode, lockBg } = useRecoilValue(
		settingState
	)

	const setSetting = useSetRecoilState(settingState)

	const { favorites: books, toggleFavorites } = useFavorites()
	const [themeId, setTheme] = useLocalStorage<number>('theme', 0)
	const [streamUrl, setStreamUrl] = useLocalStorage<string>('stream-url', '')

	const toggleConfig = () => setSetting((v) => toggle(v, 'showConfig'))

	const visibleStyle = (b: boolean) => (b ? {} : { display: 'none' })

	return (
		<div onClick={toggleConfig}>
			<FadeBgChanger
				sid={song.time}
				urls={song?.imageLinks || []}
				lockCount={lockBg ? 1 : 10}
				px={sideMode ? 'right' : 'center'}
			/>
			<TimeBar startTime={song.time} size={song.trackTimeMillis} />
			<Wrap
				data-theme={themeId}
				className={themeId === 2 ? 'dark-theme' : 'light-theme'}
				style={{ width: sideMode ? '50vw' : '100%' }}
			>
				<SongInfo song={song} showCounts={showCounts}></SongInfo>
				<div style={{ ...visibleStyle(!!streamUrl) }}>
					<Player src={streamUrl}></Player>
				</div>
				<ConfigForm
					song={song}
					themeId={themeId}
					streamUrl={streamUrl}
					setStreamUrl={setStreamUrl}
					favorited={books[song.icy]}
					toggleFavorited={() => toggleFavorites(song.icy)}
					favCount={Object.keys(books).length}
					setTheme={setTheme}
				/>

				<LyricsBox data-theme={themeId} data-visible={showLyrics}>
					<pre>{lyrics}</pre>
				</LyricsBox>
				<div>{extraComp || null}</div>
				<RecentHistoryList />
				<BookmarkList books={books} toggleFavorites={toggleFavorites} />
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
	p:not(.plain) {
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

export default Home
