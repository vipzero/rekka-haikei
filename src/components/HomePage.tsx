import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { RecoilRoot } from 'recoil'
import { useSongDb } from '../hooks/useSongDb'
import { isSongFull } from '../types'
import { FloatingBox } from '.'
import Home from './Home'
import Address from './HistoryPage/Address'
import { useBlock } from '../hooks/useBlock'

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
	useBlock()

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

	if (!loaded)
		return (
			<div>
				<span>{'■■■■■■■■■■□□□ NOWLOADING'}</span>
				<Address />
			</div>
		)

	return (
		<>
			<Helmet>
				<title>{song.icy}</title>
			</Helmet>
			<Home song={song} extraComp={extraComp} />
		</>
	)
}

const RecoilHome = () => (
	<RecoilRoot>
		<HomePage />
	</RecoilRoot>
)

export default RecoilHome
