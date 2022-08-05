import { useRecoilState } from 'recoil'
import { defaultSetting, settingState } from '../atom/SettingAtom'
import {
	Eekey,
	EekeyOpt,
	EekeyState,
	isExTheme,
} from '../components/Home/Cvote/constants'
import { Abyss, nextAbyss, normalThemes } from '../config'
import { Setting, ThemeId } from '../types'
import { toggle, genToggle } from '../util'

function exKeyToColor(exkey: EekeyState) {
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
			lockBgNum,
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
		setSetting((v) => ({ ...v, lockBgNum: nextLockNum(v.lockBgNum) }))
	const toggleHistory = () => setSetting((v) => toggle(v, 'showHistory'))
	const toggleSide = genToggle(['wide', 'l', 'r'] as const)
	const toggleSideMode = () =>
		setSetting((v) => ({ ...v, sideMode: toggleSide(v.sideMode) }))
	const toggleShowHelp = () => setSetting((v) => toggle(v, 'showHelp'))
	const toggleTool = () => setSetting((v) => toggle(v, 'showTool'))
	const closeSetting = () => setSetting((v) => ({ ...v, showSetting: false }))
	const nextTheme = (v: ThemeId) =>
		typeof v !== 'number' ? 0 : (v + 1) % normalThemes.length
	const cycleTheme = () =>
		setSetting((v) => ({ ...v, theme: nextTheme(v.theme) }))
	const toggleSetting = () => setSetting((v) => toggle(v, 'showSetting'))

	return {
		theme,
		visible,
		showCounts,
		showArtwork,
		showBookmark,
		showHistory,
		sideMode,
		lockBgNum,
		showHelp,
		showTool,
		toggleSetting,
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

export const useSettingsFakeBar = () => {
	const [{ enableFakeBar }, setSetting] = useSettingsBase()
	const toggleOnOff = genToggle(['on', 'off'] as const)
	const toggleEnableFakeBar = () =>
		setSetting((v) => ({
			...v,
			enableFakeBar: toggleOnOff(v.enableFakeBar),
		}))
	return {
		enableFakeBar,
		toggleEnableFakeBar,
	}
}

export const useSettingsCustomTheme = () => {
	const [{ customTheme }, setSetting] = useSettingsBase()
	const setCustomTheme = (customTheme: string) =>
		setSetting((v) => ({
			...v,
			customTheme,
		}))
	return { customTheme, setCustomTheme }
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
	const setEekey = (
		eeKey: Eekey | false,
		simulate = false,
		eekeyOpt: null | EekeyOpt = null
	) => {
		const exColor = exKeyToColor(eeKey)

		setAbyssEx(exColor)

		setSetting((v) => ({ ...v, eeKey, eeSim: simulate, eekeyOpt }))

		if (eeKey === false) return

		setSetting((v) => ({ ...v, ee: { ...v.ee, [eeKey]: true } }))

		if (simulate && isExTheme(eeKey)) {
			setTheme(eeKey)
		}
	}
	const setEekeySimulate = (eeKey: Eekey) => setEekey(eeKey, true)
	const toggleEekeySimulate = (eeKeyNew: Eekey) => {
		if (eeKeyNew === eeKey) {
			setEekey(false)
			if (isExTheme(eeKey)) {
				setTheme(0)
			}
		} else {
			setEekeySimulate(eeKeyNew)
		}
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
		toggleEekeySimulate,
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
