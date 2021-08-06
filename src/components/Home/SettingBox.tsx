import { faStar as faStarFill } from '@fortawesome/free-regular-svg-icons'
import {
	faBookmark,
	faColumns,
	faHistory,
	faLock,
	faQuestion,
	faStar,
	faStopwatch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { FC } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { settingState } from '../../atom/SettingAtom'
import config, { themes } from '../../config'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { Song, ThemeId } from '../../types'
import { toggle } from '../../util'
import { EventLinks, EventLinksLine } from '../EventLinks'

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
	const [
		{
			showSetting: visible,
			showCounts,
			showBookmark,
			showHistory,
			sideMode,
			lockBg,
			showHelp,
		},
		setSetting,
	] = useRecoilState(settingState)
	const eid = useQeuryEid()

	const toggleCounts = () => setSetting((v) => toggle(v, 'showCounts'))
	const toggleBookmark = () => setSetting((v) => toggle(v, 'showBookmark'))
	const toggleLockBg = () => setSetting((v) => toggle(v, 'lockBg'))
	const toggleHistory = () => setSetting((v) => toggle(v, 'showHistory'))
	const toggleSideMode = () => setSetting((v) => toggle(v, 'sideMode'))
	const toggleShowHelp = () => setSetting((v) => toggle(v, 'showHelp'))
	const closeSetting = () => setSetting((v) => ({ ...v, showSetting: false }))

	const cycleTheme = () => setTheme((themeId + 1) % themes.length)
	const isLastTime = +new Date() > config.lastTime
	const removeStream = () => setStreamUrl('')

	return (
		<Wrap data-theme={themeId} className="config" data-visible={visible}>
			<div style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}>
				<div>
					<button onClick={cycleTheme}>テーマ({themes[themeId].key})</button>

					<button
						style={{ float: 'right' }}
						className="confbtn"
						onClick={closeSetting}
					>
						閉じる
					</button>
				</div>
				<div>
					<ToggleButton checked={favorited} onClick={() => toggleFavorited()}>
						<FontAwesomeIcon icon={favorited ? faStarFill : faStar} />
						{favorited
							? 'ブックマーク中'
							: 'ブックマークしておく(ブラウザ保存)'}
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
					<ToggleButton checked={sideMode} onClick={toggleSideMode}>
						<FontAwesomeIcon icon={faColumns} />
						{showHelp && 'ハーフモード'}
					</ToggleButton>

					<ToggleButton checked={showBookmark} onClick={toggleBookmark}>
						<FontAwesomeIcon icon={faBookmark} />
						{showHelp && `ブックマーク表示(${favCount})`}
					</ToggleButton>

					<ToggleButton checked={lockBg} onClick={toggleLockBg}>
						<FontAwesomeIcon icon={faLock} />
						{showHelp && '背景変更許可'}
					</ToggleButton>
				</div>

				<div style={{ display: 'flex', gap: '4px' }}>
					<Link href={{ pathname: `/[eid]/history`, query: { eid } }} passHref>
						<a>履歴</a>
					</Link>
					<Link href={{ pathname: `/[eid]/popular`, query: { eid } }} passHref>
						<a data-important={isLastTime}>ブクマ数統計</a>
					</Link>
					<Link href={{ pathname: `/[eid]/choice`, query: { eid } }} passHref>
						<a>背景補正</a>
					</Link>
				</div>
				<EventLinksLine />

				<div>
					StreamURL:
					<input
						name="streaming-url"
						value={streamUrl}
						onChange={(e) => setStreamUrl(e.target.value || '')}
					/>
					{streamUrl.includes('http://') && (
						<span style={{ color: 'red' }}>https 非対応</span>
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

const ToggleButtonWrap = styled.button`
	text-align: left;
	> * {
		padding: 0 2px;
	}
	&[data-checked='true'] {
		background: var(--checked-bg) !important;
		> * {
			padding: 2px 2px;
		}
	}
`

type TBProps = { checked: boolean; onClick: () => void }

const ToggleButton: FC<TBProps> = ({ onClick, checked, children }) => (
	<ToggleButtonWrap onClick={onClick} data-checked={checked}>
		{children}
	</ToggleButtonWrap>
)

export default SettingBox
