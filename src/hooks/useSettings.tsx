import { useRecoilState } from 'recoil'
import { defaultSetting, settingState } from '../atom/SettingAtom'
import { Eekey } from '../components/Home/Cvote/constants'
import { Abyss, nextAbyss, themes } from '../config'
import { Setting, ThemeId } from '../types'
import { toggle } from '../util'

function exKeyToColor(exkey: Eekey) {
	if (exkey === 'higurashi' || exkey === 'mia') return '#f00'
	if (exkey === 'sakurasou') return '#fde'
	return null
}

export const useSettings = () => {
	const [
		{
			theme,
			showSetting: visible,
			showCounts,
			showBookmark,
			showHistory,
			sideMode,
			lockBg,
			showHelp,
			showTool,
		},
		setSetting,
	] = useSettingsBase()

	const toggleCounts = () => setSetting((v) => toggle(v, 'showCounts'))
	const toggleBookmark = () => setSetting((v) => toggle(v, 'showBookmark'))
	const toggleLockBg = () => setSetting((v) => toggle(v, 'lockBg'))
	const toggleHistory = () => setSetting((v) => toggle(v, 'showHistory'))
	const toggleSideMode = () => setSetting((v) => toggle(v, 'sideMode'))
	const toggleShowHelp = () => setSetting((v) => toggle(v, 'showHelp'))
	const toggleTool = () => setSetting((v) => toggle(v, 'showTool'))
	const closeSetting = () => setSetting((v) => ({ ...v, showSetting: false }))
	const nextTheme = (v: ThemeId) =>
		typeof v !== 'number' ? 0 : (v + 1) % themes.length
	const cycleTheme = () =>
		setSetting((v) => ({ ...v, theme: nextTheme(v.theme) }))

	return {
		theme,
		visible,
		showCounts,
		showBookmark,
		showHistory,
		sideMode,
		lockBg,
		showHelp,
		showTool,
		toggleCounts,
		toggleBookmark,
		toggleLockBg,
		toggleHistory,
		toggleSideMode,
		toggleShowHelp,
		closeSetting,
		toggleTool,
		setSetting,
		cycleTheme,
	}
}
const useSettingsBase = () => {
	const [settingRaw, setSetting] = useRecoilState(settingState)
	const setting: Setting = { ...defaultSetting, ...settingRaw }

	return [setting, setSetting] as const
}

export const useSettingsEe = () => {
	const [{ abyss, abyssEx, ee, eeKey, eeSim }, setSetting] = useSettingsBase()

	const setAbyss = (abyss: Abyss) => {
		setAbyssEx(null)
		setSetting((v) => ({ ...v, abyss }))
	}
	const setAbyssEx = (abyssEx: Abyss | null) =>
		setSetting((v) => ({ ...v, abyssEx }))
	const setEekey = (eeKey: Eekey, eeSim = false) => {
		const exColor = exKeyToColor(eeKey)

		setAbyssEx(exColor)

		setSetting((v) => ({ ...v, eeKey, eeSim }))
		if (eeKey === false) return

		setSetting((v) => ({ ...v, ee: { ...v.ee, [eeKey]: true } }))
	}
	const cycleAbyss = () => setAbyss(nextAbyss(abyss))

	return {
		abyss: abyssEx || abyss,
		fadeAbyssColor: abyss,
		ee,
		eeKey,
		eeSim,
		setAbyss,
		cycleAbyss,
		setEekey,
		setSetting,
	}
}

export const useSettingsShowHistory = () => {
	const [{ showHistory: visible }, setSetting] = useSettingsBase()
	const closeHistory = () => setSetting((v) => ({ ...v, showHistory: false }))
	return { closeHistory, visible }
}

export const useSettingsShowBookmark = () => {
	const [{ showBookmark: visible }, setSetting] = useSettingsBase()
	const closeBookmark = () => setSetting((v) => ({ ...v, showBookmark: false }))
	return { closeBookmark, visible }
}
