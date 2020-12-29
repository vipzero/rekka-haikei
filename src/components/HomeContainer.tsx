import React, { useEffect, useState } from 'react'
import Home from './Home'
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

	useEffect(() => {
		console.log('loaded')
		if (song.icy.includes('のんのんびより')) {
			setEx('nonnon')
		} else {
			setEx(false)
		}
	}, [song])

	const extraComp = getEx(ex)

	if (!loaded) return <span>{'■■■■■■■■■■□□□ NOWLOADING'}</span>

	return <Home song={song} histories={histories} extraComp={extraComp} />
}

export default HomeContainer
