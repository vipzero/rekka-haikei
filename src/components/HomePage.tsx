import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { isSongFull } from '../types'
import { settingState } from '../atom/SettingAtom'
import { useLyricsDb } from '../hooks/useLyricsDb'
import { useSongDb } from '../hooks/useSongDb'
import { FloatingBox } from '.'
import Home from './Home'

function getEx(ex: string | false) {
	if (ex === 'nonnon') {
		return (
			<div style={{ height: '50vh' }}>
				<iframe style={{ width: '100%' }} src="https://nyanpass.com/" />
			</div>
		)
	} else if (ex === 'mia') {
		return (
			<div style={{ height: '50vh' }}>
				<iframe
					style={{ width: '100%', height: '100%' }}
					src="https://click.abyss.fun/"
				/>
			</div>
		)
	} else if (ex === 'sakurasou') {
		return (
			<div style={{ height: '30vh' }}>
				<FloatingBox>
					<a href="http://sakurasou.tv/" target="_blanck">
						<img src="/maid-chan.png"></img>
					</a>
				</FloatingBox>
			</div>
		)
	}
	return null
}

function HomePage() {
	const [loaded, song] = useSongDb()
	const [ex, setEx] = useState<string | false>('')
	const { showLyrics } = useRecoilValue(settingState)
	const [lyrics] = useLyricsDb(song.icy, showLyrics)

	useEffect(() => {
		setEx(false)
		if (!isSongFull(song)) return

		if (song.animeTitle.includes('のんのんびより')) {
			setEx('nonnon')
		} else if (song.animeTitle.includes('アビス')) {
			setEx('mia')
		} else if (song.animeTitle.includes('さくら荘')) {
			setEx('sakurasou')
		}
	}, [song])

	const extraComp = getEx(ex)

	if (!loaded) return <span>{'■■■■■■■■■■□□□ NOWLOADING'}</span>

	return (
		<>
			<Helmet>
				<title>{song.icy}</title>
			</Helmet>
			<Home song={song} extraComp={extraComp} lyrics={lyrics} />
		</>
	)
}

const RecoilHome = () => (
	<RecoilRoot>
		<HomePage />
	</RecoilRoot>
)

export default RecoilHome
