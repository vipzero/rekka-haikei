import { faStar, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import {
	faBookmark,
	faCircleHalfStroke,
	faColumns,
	faCompactDisc,
	faDownload,
	faHistory,
	faLock,
	faLockOpen,
	faMagicWandSparkles,
	faPalette,
	faPaperclip,
	faQuestion,
	faRadio,
	faStar as faStarFill,
	faTags,
	faToolbox,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
	abyssColorsEx,
	allThemes,
	allThemesById,
	URL_GITHUB_REPO_URL,
} from '../../config'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { useSettings, useSettingsEe } from '../../hooks/useSettings'
import { useBookCountDb } from '../../hooks/useSongDb'
import { Song } from '../../types'
import { downloadImg } from '../../util'
import { ConfButton } from './ConfButton'
import Time from './Time'

const lockLabel = {
	0: { help: `背景変更同期なし`, text: '' },
	1: { help: `背景変更1回まで`, text: '1' },
	10: { help: `背景変更同期あり`, text: '' },
} as const

type Props = {
	favorited: boolean
	toggleFavorited: () => void
	bgcmOpen: boolean
	toggleBgcmOpen: () => void
	addSnap: () => void
	streamUrl: string
	setStreamUrl: (url: string) => void
	favCount: number
	song: Song
	url: string
}

function SettingBox({
	favorited,
	toggleFavorited,
	addSnap,
	streamUrl,
	setStreamUrl,
	bgcmOpen,
	toggleBgcmOpen,
	favCount,
	song,
	url,
}: Props) {
	const s = useSettings()
	const { abyss, cycleAbyss } = useSettingsEe()
	const eid = useQeuryEid()
	const [pressed, setPressed] = useState<boolean>(false)
	const [snapped, setSnapped] = useState<boolean>(false)

	useEffect(() => {
		setPressed(false)
		setSnapped(false)
	}, [song.time])

	const removeStream = () => setStreamUrl('')
	const handleDownload = () => {
		downloadImg(url, song.icy)
	}
	const { addCount } = useBookCountDb(song.time)
	// const { showEmol, toggleEmol } = useSettingsShowEmol()

	const book = () => {
		if (!pressed) addCount()
		setPressed(true)
		toggleFavorited()
	}
	const snapping = () => {
		if (snapped) return
		setSnapped(true)
		addSnap()

		toast.success('スナップ保存しました\nブクマから確認できます', {})
	}
	const toggleStream = () => {
		if (streamUrl) removeStream()
		else setStreamUrl('http://')
	}

	return (
		<Wrap
			data-theme={s.theme}
			id="setting-box"
			style={{ visibility: s.visible ? 'visible' : 'hidden' }}
			data-help={s.showHelp}
		>
			<div style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}>
				<ButtonGrid id="button-grid-panel">
					<ConfButton
						helpText={'テーマ: '}
						className="theme"
						areaKey="th"
						icon={faPalette}
						onClick={s.cycleTheme}
						text={allThemesById[s.theme]?.key || allThemes[0].key}
					/>
					<ConfButton
						helpText="ハーフ"
						className="half"
						areaKey="ha"
						icon={faColumns}
						onClick={s.toggleSideMode}
						checked={s.sideMode !== 'wide'}
					/>
					<ConfButton
						helpText="切替背景色: "
						className="fade"
						areaKey="fd"
						icon={faCircleHalfStroke}
						onClick={cycleAbyss}
						text={abyssColorsEx[abyss]?.label || '???'}
					/>

					<ConfButton
						helpText="ヘルプ"
						className="help"
						areaKey="_h"
						icon={faQuestion}
						onClick={s.toggleShowHelp}
						checked={s.showHelp}
					/>
					{/* <ConfButton
						helpText="閉じる"
						className="close"
						areaKey="cl"
						icon={faTimes}
						onClick={s.closeSetting}
					/> */}

					<ConfButton
						helpText={
							favorited ? 'ブックマーク中' : 'ブックマークする(ブラウザ保存)'
						}
						className="book"
						areaKey="bb"
						icon={favorited ? faStarFill : faStar}
						onClick={book}
						checked={favorited}
					/>

					<ConfButton
						helpText="タグ表示"
						className="tags"
						areaKey="vt"
						icon={faTags}
						checked={s.showCounts}
						onClick={s.toggleCounts}
						showToggleIcon
					/>

					<ConfButton
						helpText="アートワーク表示"
						className="artw"
						areaKey="va"
						icon={faCompactDisc}
						checked={s.showArtwork}
						onClick={s.toggleArtwork}
						showToggleIcon
					/>

					<ConfButton
						helpText="簡易履歴表示"
						className="hist"
						areaKey="vh"
						icon={faHistory}
						checked={s.showHistory}
						onClick={s.toggleHistory}
						showToggleIcon
					/>

					<ConfButton
						helpText={`ブックマーク表示(${favCount})`}
						className="books"
						areaKey="vb"
						icon={faBookmark}
						checked={s.showBookmark}
						onClick={s.toggleBookmark}
						showToggleIcon
					/>

					{/* <ConfButton
						helpText={`EMOL表示`}
						checked={showEmol}
						icon={faIcons}
						onClick={toggleEmol}
						className="emol"
					/> */}

					<ConfButton
						helpText={lockLabel[s.lockBgNum].help}
						className="lock"
						areaKey="lk"
						text={lockLabel[s.lockBgNum].text}
						icon={s.lockBgNum === 0 ? faLock : faLockOpen}
						checked={s.lockBgNum === 0}
						onClick={s.toggleLockBg}
					/>

					<ConfButton
						helpText="ダウンロード"
						className="download"
						areaKey="dd"
						icon={faDownload}
						onClick={handleDownload}
					/>

					<ConfButton
						helpText="スナップ"
						className="snap"
						areaKey="ss"
						icon={faPaperclip}
						checked={snapped}
						onClick={snapping}
					/>

					<ConfButton
						helpText="ストリーム"
						className="stream"
						areaKey="rr"
						icon={faRadio}
						checked={!!streamUrl}
						onClick={toggleStream}
					/>

					<ConfButton
						helpText="デバッグ"
						className="debug"
						areaKey="_d"
						icon={faToolbox}
						checked={s.showTool}
						onClick={s.toggleTool}
					/>
					<ConfButton
						helpText="背景補正"
						className="bgpick"
						areaKey="pp"
						icon={faMagicWandSparkles}
						checked={bgcmOpen}
						onClick={toggleBgcmOpen}
					/>
				</ButtonGrid>

				<div style={{ display: streamUrl ? 'block' : 'none' }}>
					<span className="typography">StreamURL </span>
					<input
						name="streaming-url"
						value={streamUrl}
						onChange={(e) => setStreamUrl(e.target.value || '')}
					/>

					<button onClick={removeStream}>
						<FontAwesomeIcon icon={faTimesCircle} size="xs" />
					</button>
					<div>
						{streamUrl.includes('http://') && (
							<span style={{ color: 'red' }}>http 非対応</span>
						)}
					</div>
				</div>
				{s.showTool && (
					<div>
						<Time song={song} />
					</div>
				)}
				<div className="footer">
					<div style={{ display: 'flex', gap: '8px' }}>
						<a style={{ display: 'none' }} className="link-sao">
							Logout
						</a>
						<a href={`/${eid}/history`} className="link-hist">
							履歴
						</a>
						<a href={`/${eid}/book`}>ブクマ</a>
						<a href={URL_GITHUB_REPO_URL}>コード</a>
					</div>

					<div style={{ display: 'flex', gap: '8px' }}>
						<a href="http://anison.info" rel="Anison Generation">
							アニメ情報元
						</a>
					</div>
				</div>
			</div>
		</Wrap>
	)
}

const Wrap = styled.div`
	/* height: 20vh; */
	display: flex;
	position: absolute;
	bottom: 0;
	right: 0;
	overflow: hidden;
	> div {
		padding: 8px;
		background: var(--setting-bg-color);
	}
	color: black;
	a {
		margin: 4px 0;
	}
	.footer {
		a,
		label {
			color: var(--font-color);
			font-size: 1.2rem;
		}
	}
	&[data-help='true'] {
		.help-text {
			display: block;
		}
	}
`

const ButtonGrid = styled.div`
	display: grid;
	grid-template-areas:
		'va bb bb bb bb ss'
		'vt bb bb bb bb ss'
		'vh bb bb bb bb ss'
		'vb bb bb bb bb dd'
		'th th fd ha ha _h'
		'lk pp pp rr rr _d';
`

export default SettingBox
