import { useState } from 'react'
import styled from 'styled-components'
import { TMP_TRACK_TIME } from '../../config'
import { addSnap, useFavorites } from '../../hooks/useFavorites'
import { useLightConfig } from '../../hooks/useLightConfig'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import {
	useSettings,
	useSettingsCustomTheme,
	useSettingsEe,
	useSettingsFakeBar,
} from '../../hooks/useSettings'
import { Setting, Song } from '../../types'
import { isGifUrl } from '../../util'
import BgChoiceModal from '../BgChoise/BgChoiceModal'
import AudioPlayer from './AudioPlayer'
import { BookmarkMiniList } from './BookmarkMiniList'
import FadeBgChanger from './FadeBgChanger'
import RecentHistoryList from './RecentHistoryList'
import SettingBox from './SettingBox'
import SongInfo from './SongInfo'
import TrackTimeBar from './TrackTimeBar'
import TrackTimeBitBar from './TrackTimeBitBar'
import { Conways } from './ex/Coway'
import { ExtraComp } from './ex/ExtraComp'
import { YearTimer } from './ex/YearTimer'
import { shapeStyles, themeStyles } from './themeStyles'

const sideMap: Record<Setting['sideMode'], 'right' | 'center' | 'left' | ''> = {
	wide: 'center',
	l: 'right',
	r: 'left',
	bl: 'right',
	br: 'left',
	bw: 'center',
}

type Props = {
	song: Song
	setBg: (url: string, time: number) => void
}
function Home({ song, setBg }: Props) {
	const {
		appliedTheme,
		shape,
		sideMode,
		lockBgNum,
		toggleSetting,
		blockGif,
		visible,
	} = useSettings()
	const { eeKey } = useSettingsEe()
	const [bgcmOpen, setBgcmOpen] = useState<boolean>(false) // bg choice modal

	const { favorites: books, toggleFavorites } = useFavorites()
	const [streamUrl, setStreamUrl] = useLocalStorage<string>('stream-url', '')
	const [url, setUrl] = useState<string>('')
	const { enableFakeBar } = useSettingsFakeBar()
	const timeBarSize =
		song.trackTimeMillis ||
		(enableFakeBar === 'on' ? TMP_TRACK_TIME : undefined)
	const { customTheme } = useSettingsCustomTheme()

	const { moz, full } = useLightConfig(song, () => toggleFavorites(song.icy))

	return (
		<Wrap
			onClick={() => {
				toggleSetting()
				setBgcmOpen(false)
			}}
			// @ts-ignore
			style={{ '--song-time': `${song.trackTimeMillis / 1000}s` }}
			data-ex={eeKey}
			data-has-art={!!song.artworkUrl100}
			data-show-setting={visible}
			data-theme={appliedTheme}
			data-shape={shape}
			data-moz={moz}
			data-full={full}
			data-time-bar-fake={!song.trackTimeMillis && enableFakeBar === 'on'}
			customTheme={customTheme}
		>
			<Mask id="mask">
				<Mask id="mask2" />
			</Mask>
			<FadeBgChanger
				sid={song.time}
				hasMinImg={song.hasMinImg}
				urls={song?.imageLinks?.filter((v) => !blockGif || !isGifUrl(v)) || []}
				lockCount={lockBgNum}
				onChangeUrl={setUrl}
				px={sideMap[sideMode] || 'center'}
			/>
			{eeKey && eeKey === 'subetef' ? (
				<>
					<TrackTimeBitBar startTime={song.time} size={timeBarSize} />
					<Conways />
				</>
			) : (
				<TrackTimeBar startTime={song.time} size={timeBarSize} />
			)}
			<Container id="main-box" data-side={sideMode}>
				<SongInfo song={song} />
				<div id="player-box" data-visible={!!streamUrl}>
					<AudioPlayer src={streamUrl}></AudioPlayer>
				</div>

				<ExtraComp sid={`${song.time}`} />
				<YearTimer />
				<RecentHistoryList />
				{/* {showEmol && <LyricsBox />} */}

				<BookmarkMiniList books={books} toggleFavorites={toggleFavorites} />
			</Container>
			<SettingBox
				song={song}
				streamUrl={streamUrl}
				setStreamUrl={setStreamUrl}
				favorited={books[song.icy]}
				toggleFavorited={() => toggleFavorites(song.icy)}
				bgcmOpen={bgcmOpen}
				toggleBgcmOpen={() => setBgcmOpen((v) => !v)}
				addSnap={() => addSnap(song, url)}
				favCount={Object.keys(books).length}
				url={url}
			/>

			<BgChoiceModal
				song={song}
				setBg={setBg}
				open={bgcmOpen}
				onClose={() => setBgcmOpen(false)}
			/>
		</Wrap>
	)
}

const Container = styled.div`
	width: 50vw;
	display: flex;
	flex-direction: column;
	padding: 16px;
	color: white;

	/* overflow: hidden; */
	&[data-side='wide'],
	&[data-side='bw'] {
		width: 100%;
	}
	&[data-side='r'],
	&[data-side='br'] {
		position: absolute;
		right: 0;
	}
	&[data-side='br'],
	&[data-side='bl'],
	&[data-side='bw'] {
		position: absolute;
		flex-direction: column-reverse;
		bottom: 0;
	}

	.moc {
		visibility: hidden;
		position: fixed;
		padding-left: 0.5rem;
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
	.co-panel {
		padding: 0.4rem 0.4rem;
		p {
			font-size: 0.8rem;
		}
		-ms-overflow-style: none;
	}
	#title {
		font-size: 1.1rem;
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

const Wrap = styled.div<{ customTheme: string }>`
	min-height: 100vh;
	width: 100vw;

	&[data-theme='5'] {
		${(p) => p.customTheme}
	}
	${themeStyles}

	button {
		color: var(--btn-fo-color);
		background-color: var(--btn-bg);
	}

	button {
		border-radius: 4px;
		border: none;
		margin: 4px;
		min-height: 32px;
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
	.co-panel {
		background-color: var(--co-bg-alpha);
		overflow: auto;
		white-space: nowrap;
	}
	#panel,
	.co-panel {
		width: 100%;
	}
	#panel,
	.co-panel {
		p,
		a {
			font-weight: bold;
			color: var(--panel-fo);
			text-shadow: 1px 1px 1px var(--panel-fo-shadow-color),
				-1px -1px 1px var(--panel-fo-shadow-color),
				-1px 1px 1px var(--panel-fo-shadow-color),
				1px -1px 1px var(--panel-fo-shadow-color);
			margin: 0;
		}
		.songinfo-icon {
			filter: drop-shadow(0px 0px 1px var(--panel-fo-shadow-color));
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
		user-select: none;
		background: rgba(255, 255, 255, 0.5);
		color: gray;
		width: max-content;
	}

	&[data-moz='on1'],
	&[data-ex='mosaic'] {
		#bg {
			filter: blur(10px);
		}
	}
	&[data-moz='on2'] {
		#bg {
			filter: blur(100px);
		}
	}
	&[data-full='true'] {
		> :not(#bg) {
			visibility: hidden !important;
		}
	}

	#setting-box {
		z-index: 1;
		position: fixed;
		bottom: 0;
		right: 0;
	}
	${shapeStyles}
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
