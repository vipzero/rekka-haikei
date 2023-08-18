import { faStar, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import {
	faBookmark,
	faCircleHalfStroke,
	faColumns,
	faCompactDisc,
	faCube,
	faDiceFive,
	faDownLeftAndUpRightToCenter,
	faDownload,
	faDroplet,
	faGear,
	faGhost,
	faHistory,
	faIcicles,
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
	URL_GITHUB_REPO_URL,
	abyssColorsEx,
	allShapesById,
	allThemes,
	allThemesById,
} from '../../config'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { useSettings, useSettingsEe } from '../../hooks/useSettings'
import { useBookCountDb } from '../../hooks/useSongDb'
import { Setting, Song } from '../../types'
import { downloadImg, isMobile } from '../../util'
import { startPip } from '../../util/pip'
import { BingoBox } from './BingoBox'
import { ConfButton } from './ConfButton'
import { ThemeSelector } from './ThemeSelector'
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
	addSnap: () => Promise<boolean>
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
	const [showBingo, setShowBingo] = useState<boolean>(false)
	const [showThemer, setShowThemer] = useState<boolean>(false)
	const [showDetail, setShowDetail] = useState<boolean>(false)

	useEffect(() => {
		setPressed(false)
		setSnapped(false)
	}, [song.time])
	useEffect(() => {
		if (!s.visible) setShowThemer(false)
	}, [s.visible])
	useEffect(() => {
		setShowThemer(true)
		setShowDetail(true)
	}, [s.theme, s.shape])

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
		addSnap().then((ok) => {
			if (ok) {
				// setSnapped(true) 1回に制限する
				toast.success('スナップ保存しました\nブクマから確認できます', {})
			} else {
				toast.error('保存失敗', {})
			}
		})
	}
	const toggleStream = () => {
		if (streamUrl) removeStream()
		else setStreamUrl('http://')
	}
	const sideModeText: Record<Setting['sideMode'], string> = {
		l: '↖︎',
		wide: '↑︎',
		bl: '↙︎',
		bw: '↓︎',
		br: '↘︎',
		r: '︎︎↗︎',
	}
	const { shape: shapeId } = s
	const shape = allShapesById[shapeId] || allShapesById[0]
	const emptyMode = shapeId === 3

	return (
		<Wrap
			id="setting-box"
			style={{ visibility: s.visible ? 'visible' : 'hidden' }}
			data-help={s.showHelp}
			data-show-bingo={showBingo}
			data-show-themer={showThemer}
			data-show-detail={showDetail}
		>
			<div style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}>
				<ButtonGrid id="button-grid-panel">
					<div style={{ gridArea: 'ts' }} className="themer-area">
						<ThemeSelector />
					</div>
					<ConfButton
						helpText={'テーマ: '}
						className="theme"
						areaKey="th"
						icon={faPalette}
						onClick={s.cycleTheme}
						text={allThemesById[s.theme]?.key || allThemes[0].key}
					/>
					<ConfButton
						helpText={'型: '}
						className="shape"
						areaKey="sh"
						icon={faCube}
						onClick={s.cycleShape}
						text={shape.key}
					/>
					<ConfButton
						helpText="レイアウト: "
						className="half"
						areaKey="ha"
						icon={faColumns}
						onClick={s.toggleSideMode}
						text={sideModeText[s.sideMode]}
						checked={['wide', 'bw'].includes(s.sideMode)}
						disabled={emptyMode}
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
						helpText="簡易履歴表示"
						className="hist"
						areaKey="vh"
						icon={faHistory}
						checked={s.showHistory}
						onClick={s.toggleHistory}
						showToggleIcon
						disabled={emptyMode}
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
					<ConfButton
						helpText="ビンゴ"
						className="bingo"
						areaKey="bi"
						icon={faDiceFive}
						checked={showBingo}
						onClick={() => setShowBingo((v) => !v)}
					/>
					<ConfButton
						helpText="詳細設定"
						className="detail"
						areaKey="_a"
						icon={showDetail ? faDownLeftAndUpRightToCenter : faGear}
						checked={showDetail}
						onClick={() => {
							setShowDetail(!showDetail)
							setShowThemer(!showDetail)
						}}
					/>

					<div style={{ gridArea: 'bp' }} className="bingo-area">
						<BingoBox />
					</div>
					{!isMobile() && (
						<ConfButton
							helpText="PiP"
							className="pip"
							areaKey="pi"
							icon={faGhost}
							onClick={startPip}
						/>
					)}
					<DetailButtonGrid style={{ gridArea: '_c' }} id="detail-conf-area">
						<ConfButton
							helpText="切替背景色: "
							className="fade"
							areaKey="fd"
							icon={faCircleHalfStroke}
							onClick={cycleAbyss}
							text={abyssColorsEx[abyss]?.label || '???'}
						/>
						<ConfButton
							helpText="タグ表示"
							className="tags"
							areaKey="vt"
							icon={faTags}
							checked={s.showCounts}
							onClick={s.toggleCounts}
							showToggleIcon
							disabled={shape.detailOptLock}
						/>
						<ConfButton
							helpText="アートワーク表示"
							className="artw"
							areaKey="va"
							icon={faCompactDisc}
							checked={s.showArtwork}
							onClick={s.toggleArtwork}
							showToggleIcon
							disabled={shape.detailOptLock}
						/>
						<ConfButton
							helpText={`ブックマーク表示(${favCount})`}
							className="books"
							areaKey="vb"
							icon={faBookmark}
							checked={s.showBookmark}
							onClick={s.toggleBookmark}
							showToggleIcon
							disabled={emptyMode}
						/>
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
							helpText={'Gif禁止: ' + (s.blockGif ? 'ON' : 'OFF')}
							className="gif"
							areaKey="la"
							icon={s.blockGif ? faIcicles : faDroplet}
							checked={s.blockGif}
							onClick={s.toggleBlockGif}
						/>

						{/* <ConfButton
						helpText={`EMOL表示`}
						checked={showEmol}
						icon={faIcons}
						onClick={toggleEmol}
						className="emol"
					/> */}
					</DetailButtonGrid>
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
				{s.showTool && <div>{<Time song={song} />}</div>}
				<div className="footer">
					<div>
						<a style={{ display: 'none' }} className="link-sao">
							Logout
						</a>
						<a href={`/${eid}/history`} className="link-hist">
							<FontAwesomeIcon icon={faHistory} size="xs" />
							履歴
						</a>
						<a href={`/${eid}/book`}>
							<FontAwesomeIcon icon={faBookmark} size="xs" />
							ブクマ
						</a>
					</div>

					<div>
						<a href="http://anison.info" rel="Anison Generation">
							アニメ情報元
						</a>
						<a href={URL_GITHUB_REPO_URL}>コード</a>
					</div>
				</div>
			</div>
		</Wrap>
	)
}

const Wrap = styled.div`
	/* height: 20vh; */
	display: flex;
	overflow: hidden;
	min-width: 300px;

	> div {
		padding: 8px;
		background-color: var(--sb-bg);
	}
	button,
	> div {
		transition: background-color 0.2s ease-out;
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
		a {
			background-color: var(--sb-bg);
			padding: 2px 4px;
			min-height: 32px;
			width: 100%;
			svg {
				margin-right: 4px;
			}
		}
		> div {
			display: flex;
			justify-content: space-evenly;
			text-align: right;
		}
	}
	&[data-help='true'] {
		@media only screen and (max-width: 600px) {
			button {
				font-size: 0.5rem;
			}
		}
		.help-text {
			display: block;
		}
	}
	&[data-show-bingo='false'] {
		.bingo-area {
			display: none;
		}
	}
	&[data-show-detail='false'] {
		#detail-conf-area {
			display: none;
		}
	}
	&[data-show-themer='false'] {
		.themer-area {
			display: none;
		}
	}
`

const ButtonGrid = styled.div`
	display: grid;
	min-width: 295px;
	grid-template-areas:
		'bp bp bp bp bp bp'
		'_c _c _c _c _c _c'
		'_a ts ts ts ts ts'
		'_a sh sh sh th th'
		'vh bb bb bb bb ss'
		'vh bb bb bb bb ss'
		'ha bb bb bb bb ss'
		'pp pp dd dd bi _h'
		'pp pp rr pi pi _d';
`

const DetailButtonGrid = styled.div`
	display: grid;
	grid-template-areas:
		'fd vt va'
		'vb lk la';
`

export default SettingBox
