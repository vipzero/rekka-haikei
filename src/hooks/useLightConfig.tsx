import { useEffect, useState } from 'react'
import { Song } from '../types'

import { useKeyPressOne, useKeyPressToggle } from './useKeyPress'
import { useSettings, useSettingsEe } from './useSettings'
const mozList = ['on1', 'on2', 'off']

export const useLightConfig = (song: Song, toggleFavorites: () => void) => {
	const [moz, setMoz] = useState<(typeof mozList)[number]>('off')
	const [maxlay, setMaxlay] = useState<boolean>(false)
	const { openEekey } = useSettingsEe()

	const s = useSettings()

	const cycle = <T,>(arr: T[], cur: T) =>
		arr[(arr.indexOf(cur) + 1) % arr.length]

	useKeyPressOne('m', () => {
		setMoz((v) => cycle(mozList, v))
		openEekey('mosaic')
	})
	useKeyPressToggle(' ', setMaxlay)
	useKeyPressToggle('Shift', setMaxlay)

	useKeyPressOne('a', s.toggleArtwork)
	useKeyPressOne('h', s.toggleHistory)
	useKeyPressOne('t', s.cycleTheme)
	useKeyPressOne('f', toggleFavorites)

	useEffect(() => {
		setMoz('off')
	}, [song.icy])
	return { moz, maxlay, layoff: () => setMaxlay(false) }
}
