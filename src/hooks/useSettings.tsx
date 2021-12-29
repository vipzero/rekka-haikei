import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { settingState } from '../atom/SettingAtom'
import { Abyss } from '../config'
import { toggle } from '../util'

export const useSettings = () => {
	const [
		{
			showSetting: visible,
			showCounts,
			showBookmark,
			showHistory,
			sideMode,
			abyss,
			lockBg,
			showHelp,
			showTool,
			abyssEx,
		},
		setSetting,
	] = useRecoilState(settingState)

	const toggleCounts = () => setSetting((v) => toggle(v, 'showCounts'))
	const toggleBookmark = () => setSetting((v) => toggle(v, 'showBookmark'))
	const toggleLockBg = () => setSetting((v) => toggle(v, 'lockBg'))
	const toggleHistory = () => setSetting((v) => toggle(v, 'showHistory'))
	const toggleSideMode = () => setSetting((v) => toggle(v, 'sideMode'))
	const toggleShowHelp = () => setSetting((v) => toggle(v, 'showHelp'))
	const toggleTool = () => setSetting((v) => toggle(v, 'showTool'))
	const setAbyss = (abyss: Abyss) => {
		setAbyssEx(null)
		setSetting((v) => ({ ...v, abyss }))
	}
	const setAbyssEx = (abyssEx: Abyss | null) =>
		setSetting((v) => ({ ...v, abyssEx }))
	const closeSetting = () => setSetting((v) => ({ ...v, showSetting: false }))

	return {
		abyss: abyssEx || abyss,
		visible,
		showCounts,
		showBookmark,
		showHistory,
		sideMode,
		lockBg,
		showHelp,
		fadeAbyssColor: abyss,
		showTool,
		setAbyss,
		setAbyssEx,
		toggleCounts,
		toggleBookmark,
		toggleLockBg,
		toggleHistory,
		toggleSideMode,
		toggleShowHelp,
		closeSetting,
		toggleTool,
	}
}
