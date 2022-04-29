import { useRecoilState } from 'recoil'
import { defaultSetting, settingState } from '../atom/SettingAtom'
import {
	Eekey,
	eekeysThemetic,
	isExTheme,
} from '../components/Home/Cvote/constants'
import { Abyss, extThemes, nextAbyss, normalThemes } from '../config'
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
			showArtwork,
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
	const toggleArtwork = () => setSetting((v) => toggle(v, 'showArtwork'))
	const toggleBookmark = () => setSetting((v) => toggle(v, 'showBookmark'))
	const nextLockNum = (v: number) => (v === 0 ? 1 : v === 1 ? 10 : 0)
	const toggleLockBg = () =>
		setSetting((v) => ({ ...v, lockBg: nextLockNum(v.lockBg) }))
	const toggleHistory = () => setSetting((v) => toggle(v, 'showHistory'))
	const toggleSideMode = () => setSetting((v) => toggle(v, 'sideMode'))
	const toggleShowHelp = () => setSetting((v) => toggle(v, 'showHelp'))
	const toggleTool = () => setSetting((v) => toggle(v, 'showTool'))
	const closeSetting = () => setSetting((v) => ({ ...v, showSetting: false }))
	const nextTheme = (v: ThemeId) =>
		typeof v !== 'number' ? 0 : (v + 1) % normalThemes.length
	const cycleTheme = () =>
		setSetting((v) => ({ ...v, theme: nextTheme(v.theme) }))

	return {
		theme,
		visible,
		showCounts,
		showArtwork,
		showBookmark,
		showHistory,
		sideMode,
		lockBg,
		showHelp,
		showTool,
		toggleArtwork,
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

	const setTheme = (theme: ThemeId) => setSetting((v) => ({ ...v, theme }))

	const setAbyss = (abyss: Abyss) => {
		setAbyssEx(null)
		setSetting((v) => ({ ...v, abyss }))
	}
	const setAbyssEx = (abyssEx: Abyss | null) =>
		setSetting((v) => ({ ...v, abyssEx }))
	const setEekey = (eeKey: Eekey, simulate = false) => {
		const exColor = exKeyToColor(eeKey)

		setAbyssEx(exColor)

		setSetting((v) => ({ ...v, eeKey, eeSim: simulate }))
		if (eeKey === false) return

		setSetting((v) => ({ ...v, ee: { ...v.ee, [eeKey]: true } }))

		if (simulate && isExTheme(eeKey)) {
			setTheme(eeKey)
		}
	}
	const setEekeySimulate = (eeKey: Eekey) => setEekey(eeKey, true)
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
		setEekeySimulate,
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
