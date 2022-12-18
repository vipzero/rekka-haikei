import {
	faEye,
	faEyeSlash,
	faStar,
	faTimesCircle,
} from '@fortawesome/free-regular-svg-icons'
import {
	faBookmark,
	faColumns,
	faCompactDisc,
	faHistory,
	faLightbulb,
	faLock,
	faLockOpen,
	faPalette,
	faPaperclip,
	faQuestion,
	faStar as faStarFill,
	faTags,
	faTimes,
	faToolbox,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { abyssColorsEx, allThemes, allThemesById } from '../../config'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { useSettings, useSettingsEe } from '../../hooks/useSettings'
import { useBookCountDb } from '../../hooks/useSongDb'
import { Song } from '../../types'
import { downloadImg } from '../../util'
import { DownloadButton } from './DownloadButton'
import Time from './Time'
import { ConfButton } from './ConfButton'
import { toast } from 'react-toastify'

const lockLabel = {
	0: { help: `背景変更同期なし`, text: '' },
	1: { help: `背景変更1回まで`, text: '' },
	10: { help: `背景変更同期あり`, text: '' },
} as const

type Props = {
	favorited: boolean
	toggleFavorited: () => void
	addSnap: () => void
	streamUrl: string
	setStreamUrl: (_url: string) => void
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

	return (
		<Wrap
			data-theme={s.theme}
			id="setting-box"
			data-visible={s.visible}
			data-help={s.showHelp}
		>
			<div style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}>
				<ButtonGrid id="button-grid-panel">
					<ConfButton
						helpText={'テーマ: '}
						className="theme"
						icon={faPalette}
						onClick={s.cycleTheme}
						text={allThemesById[s.theme]?.key || allThemes[0].key}
					/>
					<ConfButton
						helpText="ハーフ"
						className="half"
						icon={faColumns}
						onClick={s.toggleSideMode}
						checked={s.sideMode !== 'wide'}
					/>
					<ConfButton
						helpText="切替背景色: "
						className="fade"
						icon={faLightbulb}
						onClick={cycleAbyss}
						text={abyssColorsEx[abyss]?.label || '???'}
					/>

					<ConfButton
						helpText="ヘルプ"
						className="help"
						icon={faQuestion}
						onClick={s.toggleShowHelp}
						checked={s.showHelp}
					/>
					<ConfButton
						helpText="閉じる"
						className="close"
						icon={faTimes}
						onClick={s.closeSetting}
					/>

					<ConfButton
						helpText={
							favorited ? 'ブックマーク中' : 'ブックマークする(ブラウザ保存)'
						}
						className="book"
						icon={favorited ? faStarFill : faStar}
						onClick={book}
						checked={favorited}
					/>

					<ConfButton
						helpText="タグ表示"
						className="tags"
						icon={faTags}
						checked={s.showCounts}
						onClick={s.toggleCounts}
					/>

					<ConfButton
						helpText="アートワーク表示"
						className="artw"
						icon={faCompactDisc}
						checked={s.showArtwork}
						onClick={s.toggleArtwork}
					/>

					<ConfButton
						helpText="簡易履歴表示"
						className="hist"
						icon={faHistory}
						checked={s.showHistory}
						onClick={s.toggleHistory}
					/>

					<ConfButton
						helpText={`ブックマーク表示(${favCount})`}
						className="books"
						icon={faBookmark}
						checked={s.showBookmark}
						onClick={s.toggleBookmark}
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
						text={lockLabel[s.lockBgNum].text}
						icon={s.lockBgNum === 0 ? faLock : faLockOpen}
						checked={s.lockBgNum === 0}
						onClick={s.toggleLockBg}
						className="lock"
					/>

					<ConfButton
						helpText="ダウンロード"
						className="download"
						onClick={handleDownload}
						icon={undefined}
					>
						<DownloadButton url={url} filename={`${song.icy}.png`} />
					</ConfButton>

					<ConfButton
						helpText="スナップ"
						icon={faPaperclip}
						className="snap"
						checked={snapped}
						onClick={snapping}
					>
						<span className="tooltip-text"></span>
					</ConfButton>

					<ConfButton
						helpText="デバッグ"
						className="tool"
						icon={faToolbox}
						checked={s.showTool}
						onClick={s.toggleTool}
					/>
				</ButtonGrid>

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
						<a href={`/${eid}/choice`}>背景補正</a>
					</div>

					<div>
						<span className="typography">StreamURL </span>
						<input
							name="streaming-url"
							value={streamUrl}
							onChange={(e) => setStreamUrl(e.target.value || '')}
						/>
						{streamUrl.includes('http://') && (
							<span style={{ color: 'red' }}>http 非対応</span>
						)}
						{streamUrl && (
							<button onClick={removeStream}>
								<FontAwesomeIcon icon={faTimesCircle} size="xs" />
							</button>
						)}
					</div>
					<div style={{ display: 'flex', gap: '8px' }}>
						<a href="http://anison.info">アニメ情報元: Anison Generation</a>
						<a href="https://github.com/vipzero/rekka-haikei">コード</a>
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
		}
	}
`

const ButtonGrid = styled.div`
	&[data-help='true'] {
		.help-text {
			display: block;
		}
	}
	display: grid;
	grid-template-areas:
		'th fd ha cl'
		'aw lk lk cl'
		'tg bk bk cl'
		'hi bk bk hl'
		'bl bk bk tl'
		'-- sn dl tl';
	${`
	.theme { grid-area: th; }
	.half { grid-area: ha; }
	.fade { grid-area: fd; }
	.tags { grid-area: tg; }
	.help { grid-area: hl; }
	.close { grid-area: cl; }
	.book { grid-area: bk; }
	.hist { grid-area: hi; }
	.lock { grid-area: lk; }
	.books { grid-area: bl; }
	.tool { grid-area: tl; }
	.artw { grid-area: aw; }
	// .emol { grid-area: el; }
	.snap { grid-area: sn; }
	.download { grid-area: dl; }
`}
`

export default SettingBox
