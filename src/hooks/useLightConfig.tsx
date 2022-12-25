import { useEffect, useState } from 'react'
import { Song } from '../types'
import { not } from '../util'

import { useKeyPressOne, useKeyPressToggle } from './useKeyPress'
import { useSettings, useSettingsEe, useSettingsShowEmol } from './useSettings'
const mozList = ['on1', 'on2', 'off']

export const useLightConfig = (song: Song, toggleFavorites: () => void) => {
	const [moz, setMoz] = useState<typeof mozList[number]>('off')
	const [full, setFull] = useState<boolean>(false)
	const { openEekey } = useSettingsEe()

	const s = useSettings()
	const { toggleEmol } = useSettingsShowEmol()

	const cycle = <T,>(arr: T[], cur: T) =>
		arr[(arr.indexOf(cur) + 1) % arr.length]

	useKeyPressOne('m', () => {
		setMoz((v) => cycle(mozList, v))
		openEekey('mosaic')
	})
	useKeyPressToggle(' ', setFull)
	useKeyPressToggle('Shift', setFull)

	useKeyPressOne('l', toggleEmol)
	useKeyPressOne('a', s.toggleArtwork)
	useKeyPressOne('h', s.toggleHistory)
	useKeyPressOne('t', s.cycleTheme)
	useKeyPressOne('f', toggleFavorites)

	useEffect(() => {
		setMoz('off')
	}, [song.icy])
	return { moz, full }
}
