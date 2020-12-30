import React, { useEffect, useState } from 'react'
import { isSongFull } from '../../types'
import Home from './Home'
import { useLyricsDb } from './useLyricsDb'
import { useSongDb } from './useSongDb'

function getEx(ex: string | false) {
	if (ex === 'nonnon') {
		return (
			<div style={{ height: '100%' }}>
				<iframe style={{ width: '100%' }} src="https://nyanpass.com/" />
			</div>
		)
	} else {
		return null
	}
}

function HomeContainer() {
	const [loaded, song, histories] = useSongDb()
	const [ex, setEx] = useState<string | false>('')
	const [showLyrics, setShowLyrics] = useState<boolean>(false)
	const [lyrics] = useLyricsDb(song.icy, showLyrics)

	useEffect(() => {
		console.log('loaded')

		if (isSongFull(song) && song.animeTitle.includes('のんのんびより')) {
			setEx('nonnon')
		} else {
			setEx(false)
		}
	}, [song])

	const extraComp = getEx(ex)

	if (!loaded) return <span>{'■■■■■■■■■■□□□ NOWLOADING'}</span>

	return (
		<Home
			song={song}
			histories={histories}
			extraComp={extraComp}
			lyrics={lyrics}
			showLyrics={showLyrics}
			setShowLyrics={(v) => setShowLyrics(v)}
		/>
	)
}

export default HomeContainer
