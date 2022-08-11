import React, { useEffect, useState } from 'react'
import { Song } from '../types'

import { useKeyPressChange } from './useKeyPress'
const mozList = ['on1', 'on2', 'off']

export const useLightConfig = (song: Song) => {
	const [moz, setMoz] = useState<typeof mozList[number]>('off')

	const cycle = <T,>(arr: T[], cur: T) =>
		arr[(arr.indexOf(cur) + 1) % arr.length]

	useKeyPressChange('m', () => setMoz((v) => cycle(mozList, v)))
	useEffect(() => {
		setMoz('off')
	}, [song.icy])
	return { moz }
}
