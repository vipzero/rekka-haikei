import { faStar, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import {
	faBookmark,
	faColumns,
	faHistory,
	faLock,
	faLockOpen,
	faQuestion,
	faStar as faStarFill,
	faTags,
	faTimes,
	faToolbox,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import config, { abyssColors, nextAbyss, themes } from '../../config'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { useSettings } from '../../hooks/useSettings'
import { Song, ThemeId } from '../../types'
import Time from './Time'
import ToggleButton from './ToggleButton'

type Props = {
	themeId: ThemeId

	setTheme: (themeId: ThemeId) => void
	favorited: boolean
	toggleFavorited: () => void
	streamUrl: string
	setStreamUrl: (url: string) => void
	favCount: number
	song: Song
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
}: Props) {
	const {
		visible,
		showCounts,
		showBookmark,
		showHistory,
		sideMode,
		lockBg,
		showHelp,
		showTool,
		abyss,
		toggleCounts,
		toggleBookmark,
		toggleLockBg,
		toggleHistory,
		toggleSideMode,
		toggleShowHelp,
		toggleTool,
		closeSetting,
		setAbyss,
	} = useSettings()

	const eid = useQeuryEid()

	const cycleTheme = () => setTheme((themeId + 1) % themes.length)
	const isLastTime = +new Date() > config.lastTime
	const removeStream = () => setStreamUrl('')
	const cycleAbyss = () => setAbyss(nextAbyss(abyss))

	return (
		<Wrap data-theme={themeId} className="config" data-visible={visible}>
			<div style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}>
				<ButtonGrid>
					<button onClick={cycleTheme} className="theme">
						テーマ: {themes[themeId].key}
					</button>
					<ToggleButton
						checked={sideMode}
						onClick={toggleSideMode}
						className="half"
					>
						<FontAwesomeIcon icon={faColumns} />
						{showHelp && 'ハーフ'}
					</ToggleButton>
					<button onClick={() => cycleAbyss()} className="fade">
						Fade: {abyssColors[abyss]?.label || '???'}
					</button>

					<ToggleButton
						checked={showHelp}
						onClick={toggleShowHelp}
						className="help"
					>
						<FontAwesomeIcon icon={faQuestion} />
						{showHelp && 'ヘルプ'}
					</ToggleButton>
					<button onClick={closeSetting} className="close">
						<FontAwesomeIcon icon={faTimes} />
						{showHelp && '閉じる'}
					</button>

					<ToggleButton
						checked={favorited}
						onClick={() => toggleFavorited()}
						className="book"
					>
						<FontAwesomeIcon icon={favorited ? faStarFill : faStar} />
						{showHelp &&
							(favorited ? 'ブックマーク中' : 'ブックマークする(ブラウザ保存)')}
					</ToggleButton>

					<ToggleButton
						checked={showCounts}
						onClick={toggleCounts}
						className="tags"
					>
						<FontAwesomeIcon icon={faTags} />
						{showHelp && 'タグ表示'}
					</ToggleButton>
					<ToggleButton
						checked={showHistory}
						onClick={toggleHistory}
						className="hist"
					>
						<FontAwesomeIcon icon={faHistory} />
						{showHelp && '簡易履歴表示'}
					</ToggleButton>

					<ToggleButton
						checked={showBookmark}
						onClick={toggleBookmark}
						className="books"
					>
						<FontAwesomeIcon icon={faBookmark} />
						{showHelp && `ブックマーク表示(${favCount})`}
					</ToggleButton>

					<ToggleButton
						checked={lockBg}
						onClick={toggleLockBg}
						className="lock"
					>
						<FontAwesomeIcon icon={lockBg ? faLock : faLockOpen} />
						{showHelp && '背景変更拒否'}
					</ToggleButton>

					<ToggleButton
						checked={showTool}
						onClick={toggleTool}
						className="tool"
					>
						<FontAwesomeIcon icon={faToolbox} />
						{showHelp && 'ツール'}
					</ToggleButton>
				</ButtonGrid>

				{showTool && (
					<div>
						<Time song={song} />
					</div>
				)}
				<div style={{ display: 'flex', gap: '4px' }}>
					<a href={`/${eid}/history`}>履歴</a>
					<a href={`/${eid}/popular`} data-important={isLastTime}>
						ブクマ数統計
					</a>
					<a href={`/${eid}/choise`} data-important={isLastTime}>
						背景補正
					</a>
				</div>

				<div>
					StreamURL:
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
		'tg lk lk hl'
		'hi bk bk --'
		'bl bk bk tl';

	.theme {
		grid-area: th;
	}
	.half {
		grid-area: ha;
	}
	.fade {
		grid-area: fd;
	}
	.tags {
		grid-area: tg;
	}
	.help {
		grid-area: hl;
	}
	.close {
		grid-area: cl;
	}
	.book {
		grid-area: bk;
	}
	.hist {
		grid-area: hi;
	}
	.lock {
		grid-area: lk;
	}
	.books {
		grid-area: bl;
	}
	.tool {
		grid-area: tl;
	}
`

export default SettingBox
