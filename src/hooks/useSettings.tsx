import { useRecoilState } from 'recoil'
import { settingState } from '../atom/SettingAtom'
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
		},
		setSetting,
	] = useRecoilState(settingState)

	const toggleCounts = () => setSetting((v) => toggle(v, 'showCounts'))
	const toggleBookmark = () => setSetting((v) => toggle(v, 'showBookmark'))
	const toggleLockBg = () => setSetting((v) => toggle(v, 'lockBg'))
	const toggleHistory = () => setSetting((v) => toggle(v, 'showHistory'))
	const toggleSideMode = () => setSetting((v) => toggle(v, 'sideMode'))
	const toggleShowHelp = () => setSetting((v) => toggle(v, 'showHelp'))
	const setAbyss = (abyss: string) => setSetting((v) => ({ ...v, abyss }))
	const closeSetting = () => setSetting((v) => ({ ...v, showSetting: false }))
	return {
		abyss,
		visible,
		showCounts,
		showBookmark,
		showHistory,
		sideMode,
		lockBg,
		showHelp,
		fadeAbyssColor: abyss,
		setAbyss,
		toggleCounts,
		toggleBookmark,
		toggleLockBg,
		toggleHistory,
		toggleSideMode,
		toggleShowHelp,
		closeSetting,
	}
}
