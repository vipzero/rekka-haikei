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
	faQuestion,
	faStar as faStarFill,
	faTags,
	faTimes,
	faToolbox,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import config, { abyssColorsEx, allThemes, allThemesById } from '../../config'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { useSettings, useSettingsEe } from '../../hooks/useSettings'
import { useBookCountDb } from '../../hooks/useSongDb'
import { Song } from '../../types'
import { downloadImg } from '../../util'
import { DownloadButton } from './DownloadButton'
import Time from './Time'
import ToggleButton, { ConfButton } from './ToggleButton'

type Props = {
	favorited: boolean
	toggleFavorited: () => void
	streamUrl: string
	setStreamUrl: (url: string) => void
	favCount: number
	song: Song
	url: string
}

function SettingBox({
	favorited,
	toggleFavorited,
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
	useEffect(() => setPressed(false), [song.time])

	const isLastTime = useMemo(
		() => +new Date() > config.lastspurtTime,
		[config.lastspurtTime, song]
	)
	const removeStream = () => setStreamUrl('')
	const handleDownload = () => {
		downloadImg(url, song.icy)
	}
	const { addCount } = useBookCountDb(song.time)

	const book = () => {
		if (!pressed) addCount()
		setPressed(true)
		toggleFavorited()
	}

	return (
		<Wrap data-theme={s.theme} id="setting-box" data-visible={s.visible}>
			<div style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}>
				<ButtonGrid id="button-grid-panel">
					<ConfButton onClick={s.cycleTheme} className="theme">
						<FontAwesomeIcon icon={faPalette} />
						{s.showHelp && 'テーマ: '}
						{allThemesById[s.theme]?.key || allThemes[0].key}
					</ConfButton>
					<ToggleButton
						checked={s.sideMode}
						onClick={s.toggleSideMode}
						className="half"
					>
						<FontAwesomeIcon icon={faColumns} />
						{s.showHelp && 'ハーフ'}
					</ToggleButton>
					<ConfButton onClick={cycleAbyss} className="fade">
						<FontAwesomeIcon icon={faLightbulb} />
						{s.showHelp && '切替背景色: '}
						{abyssColorsEx[abyss]?.label || '???'}
					</ConfButton>

					<ToggleButton
						checked={s.showHelp}
						onClick={s.toggleShowHelp}
						className="help"
					>
						<FontAwesomeIcon icon={faQuestion} />
						{s.showHelp && 'ヘルプ'}
					</ToggleButton>
					<ConfButton onClick={s.closeSetting} className="close">
						<FontAwesomeIcon icon={faTimes} />
						{s.showHelp && '閉じる'}
					</ConfButton>

					<ToggleButton checked={favorited} onClick={book} className="book">
						<FontAwesomeIcon icon={favorited ? faStarFill : faStar} />
						{s.showHelp &&
							(favorited ? 'ブックマーク中' : 'ブックマークする(ブラウザ保存)')}
					</ToggleButton>

					<ToggleButton
						checked={s.showCounts}
						onClick={s.toggleCounts}
						className="tags"
					>
						<FontAwesomeIcon icon={faTags} />
						<FontAwesomeIcon icon={s.showCounts ? faEye : faEyeSlash} />
						{s.showHelp && 'タグ表示'}
					</ToggleButton>

					<ToggleButton
						checked={s.showArtwork}
						onClick={s.toggleArtwork}
						className="artw"
					>
						<FontAwesomeIcon icon={faCompactDisc} />
						<FontAwesomeIcon icon={s.showArtwork ? faEye : faEyeSlash} />
						{s.showHelp && 'アートワーク表示'}
					</ToggleButton>

					<ToggleButton
						checked={s.showHistory}
						onClick={s.toggleHistory}
						className="hist"
					>
						<FontAwesomeIcon icon={faHistory} />
						<FontAwesomeIcon icon={s.showHistory ? faEye : faEyeSlash} />
						{s.showHelp && '簡易履歴表示'}
					</ToggleButton>

					<ToggleButton
						checked={s.showBookmark}
						onClick={s.toggleBookmark}
						className="books"
					>
						<FontAwesomeIcon icon={faBookmark} />
						<FontAwesomeIcon icon={s.showBookmark ? faEye : faEyeSlash} />
						{s.showHelp && `ブックマーク表示(${favCount})`}
					</ToggleButton>

					<ToggleButton
						checked={s.lockBgNum === 0}
						onClick={s.toggleLockBg}
						className="lock"
					>
						<FontAwesomeIcon icon={s.lockBgNum === 0 ? faLock : faLockOpen} />
						{s.showHelp
							? { 0: `背景変更なし`, 1: `背景変更1回まで`, 10: `背景変更可` }[
									s.lockBgNum
							  ]
							: { 0: ``, 1: `1`, 10: `` }[s.lockBgNum]}
					</ToggleButton>

					<ConfButton onClick={handleDownload} className="download">
						<DownloadButton url={url} filename={`${song.icy}.png`} />
					</ConfButton>

					<ToggleButton
						checked={s.showTool}
						onClick={s.toggleTool}
						className="tool"
					>
						<FontAwesomeIcon icon={faToolbox} />
						{s.showHelp && 'デバッグ'}
					</ToggleButton>
				</ButtonGrid>

				{s.showTool && (
					<div>
						<Time song={song} />
					</div>
				)}
				<div className="footer">
					<div style={{ display: 'flex' }}>
						<a style={{ display: 'none' }} className="link-sao">
							Logout
						</a>
						<a href={`/${eid}/history`} className="link-hist">
							履歴
						</a>
						<a href={`/${eid}/book`} data-important={isLastTime}>
							ブクマ
						</a>
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
		margin: 4px 8px 4px 0;
	}
	.footer {
		a,
		label {
			color: var(--font-color);
		}
	}
`

const ButtonGrid = styled.div`
	display: grid;
	grid-template-areas:
		'th fd ha cl'
		'aw lk lk cl'
		'tg bk bk cl'
		'hi bk bk hl'
		'bl dl dl tl';
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
	.download { grid-area: dl; }
`}
`

export default SettingBox
