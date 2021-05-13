import { faStar as faStarFill } from '@fortawesome/free-regular-svg-icons'
import {
	faBookmark,
	faColumns,
	faHistory,
	faLock,
	faMusic,
	faStar,
	faStopwatch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { addFeedback } from '../../../service/firebase'
import { Song, ThemeId } from '../../types'
import { settingState } from '../../atom/SettingAtom'
import config, { events, themes } from '../../config'
import { toggle } from '../../util'
import { RadioButton } from './RadioButton'

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
			showLyrics,
			showHistory,
			sideMode,
			lockBg,
		},
		setSetting,
	] = useRecoilState(settingState)

	const toggleCounts = () => setSetting((v) => toggle(v, 'showCounts'))
	const toggleBookmark = () => setSetting((v) => toggle(v, 'showBookmark'))
	const toggleLockBg = () => setSetting((v) => toggle(v, 'lockBg'))
	const toggleHistory = () => setSetting((v) => toggle(v, 'showHistory'))
	const toggleLyrics = () => setSetting((v) => toggle(v, 'showLyrics'))
	const toggleSideMode = () => setSetting((v) => toggle(v, 'sideMode'))
	const closeSetting = () => setSetting((v) => ({ ...v, showSetting: false }))

	const cycleTheme = () => setTheme((themeId + 1) % themes.length)
	const isLastTime = +new Date() > config.lastTime
	const removeStream = () => setStreamUrl('')

	return (
		<Wrap data-theme={themeId} className="config" data-visible={visible}>
			<div style={{ width: '100%' }} onClick={(e) => e.stopPropagation()}>
				<div>
					<button onClick={cycleTheme}>テーマ({themeId})</button>
					{themes.map((t) => (
						<RadioButton
							key={t.key}
							value={t.id}
							current={themeId}
							onClick={() => setTheme(t.id)}
							label={t.key}
						/>
					))}

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
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'max-content max-content',
					}}
				>
					<ToggleButton checked={showLyrics} onClick={toggleLyrics}>
						<FontAwesomeIcon icon={faMusic} />
						歌詞表示
					</ToggleButton>
					<ToggleButton checked={showCounts} onClick={toggleCounts}>
						<FontAwesomeIcon icon={faStopwatch} />
						カウント表示
					</ToggleButton>
					<ToggleButton checked={showHistory} onClick={toggleHistory}>
						<FontAwesomeIcon icon={faHistory} />
						簡易履歴表示
					</ToggleButton>
					<ToggleButton checked={sideMode} onClick={toggleSideMode}>
						<FontAwesomeIcon icon={faColumns} />
						ハーフモード
					</ToggleButton>

					<ToggleButton checked={showBookmark} onClick={toggleBookmark}>
						<FontAwesomeIcon icon={faBookmark} />
						ブックマーク表示({favCount})
					</ToggleButton>

					<ToggleButton checked={lockBg} onClick={toggleLockBg}>
						<FontAwesomeIcon icon={faLock} />
						背景変更許可
					</ToggleButton>
				</div>

				<div style={{ display: 'flex', gap: '4px' }}>
					<Link href="history" passHref>
						<a>履歴</a>
					</Link>
					<Link href="popular" passHref>
						<a data-important={isLastTime}>ブクマ数統計</a>
					</Link>
					<Link href="choice" passHref>
						<a>背景補正</a>
					</Link>
				</div>
				<div style={{ display: 'flex', gap: '4px' }}>
					{events.map((e) => (
						<Link key={e.id} href={`${e.id}/bg`} passHref>
							<a>{e.label}</a>
						</Link>
					))}
				</div>

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
				<FeedBackForm song={song} />
			</div>
		</Wrap>
	)
}

function genDefaultReportText(song: Song) {
	return `${song.icy}\nsize: ${window.innerWidth},${
		window.innerHeight
	}\nword: ${song.wordCountsAna.map((v) => v.name).join(',')}\n`
}

function FeedBackForm({ song }: { song: Song }) {
	const [feedBack, setFeedBack] = useState<string>('')
	const onClickReport = () =>
		setFeedBack(feedBack ? '' : genDefaultReportText(song))
	const onSubmit = () => {
		addFeedback(feedBack).then(() => {
			alert('フィードバックサンクスb')
			setFeedBack('')
		})
	}

	return (
		<div>
			<button onClick={onClickReport}>レポート</button>

			<div data-visible={!!feedBack}>
				<div>歌詞の分割ミス・表示崩れなどあれば</div>
				<textarea
					rows={4}
					style={{ width: '60vw' }}
					value={feedBack}
					onChange={(e) => setFeedBack(e.target.value)}
				></textarea>
				<button onClick={onSubmit}>送信</button>
			</div>
		</div>
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
		padding-right: 4px;
	}
`

type TBProps = { checked: boolean; onClick: () => void }

const ToggleButton: FC<TBProps> = ({ onClick, checked, children }) => (
	<ToggleButtonWrap onClick={onClick}>
		<input type="checkbox" checked={checked || false} onChange={() => {}} />
		{children}
	</ToggleButtonWrap>
)

export default SettingBox
