import { faStar } from '@fortawesome/free-regular-svg-icons'
import {
	faBookmark,
	faColumns,
	faHistory,
	faLock,
	faLockOpen,
	faQuestion,
	faStar as faStarFill,
	faStopwatch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import config, { themes, abyssColors, nextAbyss } from '../../config'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { useSettings } from '../../hooks/useSettings'
import { Song, ThemeId } from '../../types'
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
}: Props) {
	const {
		visible,
		showCounts,
		showBookmark,
		showHistory,
		sideMode,
		lockBg,
		showHelp,
		abyss,
		toggleCounts,
		toggleBookmark,
		toggleLockBg,
		toggleHistory,
		toggleSideMode,
		toggleShowHelp,
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
				<div>
					<button onClick={cycleTheme} className="big">
						テーマ: ({themes[themeId].key})
					</button>
					<ToggleButton checked={sideMode} onClick={toggleSideMode}>
						<FontAwesomeIcon icon={faColumns} />
						{showHelp && 'ハーフ'}
					</ToggleButton>
					<button onClick={() => cycleAbyss()}>
						Fade: {abyssColors[abyss]?.label || '???'}
					</button>

					<button
						style={{ float: 'right' }}
						className="confbtn"
						onClick={closeSetting}
					>
						閉じる
					</button>
				</div>
				<div>
					<ToggleButton
						checked={favorited}
						onClick={() => toggleFavorited()}
						big
					>
						<FontAwesomeIcon icon={favorited ? faStarFill : faStar} />
						{showHelp &&
							(favorited
								? 'ブックマーク中'
								: 'ブックマークしておく(ブラウザ保存)')}
					</ToggleButton>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					<ToggleButton checked={showHelp} onClick={toggleShowHelp}>
						<FontAwesomeIcon icon={faQuestion} />
						{showHelp && 'ヘルプ'}
					</ToggleButton>
					<ToggleButton checked={showCounts} onClick={toggleCounts}>
						<FontAwesomeIcon icon={faStopwatch} />
						{showHelp && 'カウント表示'}
					</ToggleButton>
					<ToggleButton checked={showHistory} onClick={toggleHistory}>
						<FontAwesomeIcon icon={faHistory} />
						{showHelp && '簡易履歴表示'}
					</ToggleButton>

					<ToggleButton checked={showBookmark} onClick={toggleBookmark}>
						<FontAwesomeIcon icon={faBookmark} />
						{showHelp && `ブックマーク表示(${favCount})`}
					</ToggleButton>

					<ToggleButton checked={lockBg} onClick={toggleLockBg}>
						<FontAwesomeIcon icon={lockBg ? faLock : faLockOpen} />
						{showHelp && '背景変更拒否'}
					</ToggleButton>
				</div>

				<div style={{ display: 'flex', gap: '4px' }}>
					<Link
						prefetch={false}
						href={{ pathname: `/[eid]/history`, query: { eid } }}
						passHref
					>
						<a>履歴</a>
					</Link>
					<Link
						prefetch={false}
						href={{ pathname: `/[eid]/popular`, query: { eid } }}
						passHref
					>
						<a data-important={isLastTime}>ブクマ数統計</a>
					</Link>
					<Link
						prefetch={false}
						href={{ pathname: `/[eid]/choice`, query: { eid } }}
						passHref
					>
						<a>背景補正</a>
					</Link>
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
					<button onClick={removeStream}>x</button>
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
	width: 100%;
	display: flex;
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

export default SettingBox
