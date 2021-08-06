import React, { ReactNode } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { Song } from '../../types'
import { settingState } from '../../atom/SettingAtom'
import { useFavorites } from '../../hooks/useFavorites'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { toggle } from '../../util'
import FadeBgChanger from './FadeBgChanger'
import Player from './Player'
import TimeBar from './TimeBar'
import { BookmarkList } from './BookmarkList'
import SettingBox from './SettingBox'
import RecentHistoryList from './RecentHistoryList'
import SongInfo from './SongInfo'

type Props = {
	song: Song
	extraComp?: ReactNode
}
function Home({ song, extraComp }: Props) {
	const { showCounts, sideMode, lockBg } = useRecoilValue(settingState)

	const setSetting = useSetRecoilState(settingState)

	const { favorites: books, toggleFavorites } = useFavorites()
	const [themeId, setTheme] = useLocalStorage<number>('theme', 0)
	const [streamUrl, setStreamUrl] = useLocalStorage<string>('stream-url', '')

	const toggleSetting = () => setSetting((v) => toggle(v, 'showSetting'))

	return (
		<div onClick={toggleSetting}>
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
				<div data-visible={!!streamUrl}>
					<Player src={streamUrl}></Player>
				</div>
				<SettingBox
					song={song}
					themeId={themeId}
					streamUrl={streamUrl}
					setStreamUrl={setStreamUrl}
					favorited={books[song.icy]}
					toggleFavorited={() => toggleFavorites(song.icy)}
					favCount={Object.keys(books).length}
					setTheme={setTheme}
				/>

				<div>{extraComp || null}</div>
				<RecentHistoryList />
				<BookmarkList books={books} toggleFavorites={toggleFavorites} />
			</Wrap>
		</div>
	)
}

const Wrap = styled.div`
	width: 100vw;
	min-height: 100vh;
	display: grid;
	/* overflow: hidden; */
	grid-template-rows: repeat(5, max-content);
	padding: 16px;
	color: white;

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
