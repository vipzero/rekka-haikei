import React, { ReactNode, useState } from 'react'
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
import { exStyles } from './exStyles'
import { themeStyles } from './themeStyles'

type Props = {
	song: Song
	extraComp?: ReactNode
	exkey: string | false
}
function Home({ song, extraComp, exkey }: Props) {
	const { showCounts, sideMode, lockBg } = useRecoilValue(settingState)

	const setSetting = useSetRecoilState(settingState)

	const { favorites: books, toggleFavorites } = useFavorites()
	const [themeId, setTheme] = useLocalStorage<number>('theme', 0)
	const [streamUrl, setStreamUrl] = useLocalStorage<string>('stream-url', '')
	const [url, setUrl] = useState<string>('')

	const toggleSetting = () => setSetting((v) => toggle(v, 'showSetting'))

	return (
		<Master onClick={toggleSetting} data-ex={exkey}>
			<Mask id="mask">
				<Mask id="mask2" />
			</Mask>
			<FadeBgChanger
				sid={song.time}
				urls={song?.imageLinks || []}
				lockCount={lockBg ? 1 : 10}
				changedUrl={setUrl}
				px={sideMode ? 'right' : 'center'}
			/>
			<TimeBar startTime={song.time} size={song.trackTimeMillis} />
			<Wrap
				data-theme={themeId}
				className={themeId === 2 ? 'dark-theme' : 'light-theme'}
				style={{ width: sideMode ? '50vw' : '100%' }}
			>
				<SongInfo song={song} showCounts={showCounts}></SongInfo>
				<div id="player-box" data-visible={!!streamUrl}>
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
					url={url}
				/>

				<div>{extraComp || null}</div>
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
			font-size: 1rem;
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
	z-index: -1;
`

export default Home
