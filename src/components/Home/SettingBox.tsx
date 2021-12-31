import {
	faEye,
	faEyeSlash,
	faStar,
	faTimesCircle,
} from '@fortawesome/free-regular-svg-icons'
import {
	faBookmark,
	faColumns,
	faDownload,
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
import React, { useMemo } from 'react'
import styled from 'styled-components'
import config, { abyssColorsEx, themes } from '../../config'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { useSettings } from '../../hooks/useSettings'
import { Song, ThemeId } from '../../types'
import { downloadImg } from '../../util'
import { DownloadButton } from './DownloadButton'
import Time from './Time'
import ToggleButton, { ConfButton } from './ToggleButton'

type Props = {
	themeId: ThemeId

	setTheme: (themeId: ThemeId) => void
	favorited: boolean
	toggleFavorited: () => void
	streamUrl: string
	setStreamUrl: (url: string) => void
	favCount: number
	song: Song
	url: string
}

function SettingBox({
	themeId,
	setTheme,
	favorited,
	toggleFavorited,
	streamUrl,
	setStreamUrl,
	favCount,
	song,
	url,
}: Props) {
	const s = useSettings()

	const eid = useQeuryEid()

	const isLastTime = useMemo(
		() => +new Date() > config.lastspurtTime,
		[config.lastspurtTime, song]
	)
	const cycleTheme = () => setTheme((themeId + 1) % themes.length)
	const removeStream = () => setStreamUrl('')
	const handleDownload = () => {
		downloadImg(url, song.icy)
	}

	return (
		<Wrap data-theme={themeId} className="config" data-visible={s.visible}>
			<div style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}>
				<ButtonGrid>
					<ConfButton onClick={cycleTheme} className="theme">
						<FontAwesomeIcon icon={faPalette} />
						{s.showHelp && 'テーマ: '}
						{themes[themeId].key}
					</ConfButton>
					<ToggleButton
						checked={s.sideMode}
						onClick={s.toggleSideMode}
						className="half"
					>
						<FontAwesomeIcon icon={faColumns} />
						{s.showHelp && 'ハーフ'}
					</ToggleButton>
					<ConfButton onClick={() => s.cycleAbyss()} className="fade">
						<FontAwesomeIcon icon={faLightbulb} />
						{s.showHelp && '切替背景色: '}
						{abyssColorsEx[s.abyss]?.label || '???'}
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

					<ToggleButton
						checked={favorited}
						onClick={() => toggleFavorited()}
						className="book"
					>
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
						checked={s.lockBg}
						onClick={s.toggleLockBg}
						className="lock"
					>
						<FontAwesomeIcon icon={s.lockBg ? faLock : faLockOpen} />
						{s.showHelp && '背景変更1回まで'}
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
				<div style={{ display: 'flex' }}>
					<a href={`/${eid}/history`}>履歴</a>
					<a href={`/${eid}/popular`} data-important={isLastTime}>
						ブクマ数統計
					</a>
					<a href={`/${eid}/choice`}>背景補正</a>
				</div>

				<div>
					StreamURL{' '}
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
		background: #aaa;
	}
	a,
	label {
		color: white !important;
	}
	a {
		margin: 4px 8px 4px 0;
	}
	&[data-theme='1'] {
		color: black !important;
		a,
		label {
			color: black !important;
		}
	}
`

const ButtonGrid = styled.div`
	display: grid;
	grid-template-areas:
		'th fd ha cl'
		'tg lk lk cl'
		'hi bk bk cl'
		'bl bk bk hl'
		'-- dl dl tl';
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
	.download { grid-area: dl; }
`}
`

export default SettingBox
