import { useAtom } from 'jotai'
import { useState } from 'react'
import { defaultSetting, settingAtom } from '../atom/SettingAtom'
import {
	EeOpt,
	Eekey,
	EekeyState,
	isExTheme,
} from '../components/Home/Cvote/constants'
import {
	Abyss,
	EE_SEASON,
	allShapes,
	decideTheme,
	extThemes,
	nextAbyss,
	normalThemes,
} from '../config'
import { sammonSpell, spellCatch } from '../service/fukkatsu'
import { Setting, ShapeId, Theme, ThemeId } from '../types'
import { genToggle, toggle } from '../util'

function exKeyToColor(exkey: EekeyState) {
	if (exkey === 'higurashi' || exkey === 'mia') return '#f00'
	if (exkey === 'sakurasou') return '#fde'
	return null
}

export const useSettings = () => {
	const [
		{
			theme,
			shape,
			showSetting: visible,
			showArtwork,
			showCounts,
			showBookmark,
			showHistory,
			sideMode,
			lockBgNum,
			showHelp,
			showTool,
			blockGif,
			eeKey,
		},
		setSetting,
	] = useSettingsBase()

	const toggleKey = (k: keyof Setting) => () => setSetting((v) => toggle(v, k))
	const nextLockNum = (v: number) => (v === 0 ? 1 : v === 1 ? 10 : 0)
	const toggleLockBg = () =>
		setSetting((v) => ({ ...v, lockBgNum: nextLockNum(v.lockBgNum) }))
	const toggleSide = genToggle(['wide', 'l', 'bl', 'bw', 'br', 'r'] as const)
	const toggleSideMode = () =>
		setSetting((v) => ({ ...v, sideMode: toggleSide(v.sideMode) }))
	const closeSetting = () => setSetting((v) => ({ ...v, showSetting: false }))
	const next = <T,>(a: T[], id: T) => a[(a.indexOf(id) + 1) % a.length]
	const nextTheme = (v: ThemeId) =>
		next(
			normalThemes.map((t) => t.id),
			v
		)

	const nextShape = (v: ShapeId) => (v + 1) % allShapes.length
	const setTheme = (theme: ThemeId) => setSetting((v) => ({ ...v, theme }))
	const setShape = (shape: ShapeId) => setSetting((v) => ({ ...v, shape }))
	const cycleTheme = () => setTheme(nextTheme(theme))
	const cycleShape = () => setShape(nextShape(shape))
	const appliedTheme = decideTheme(theme, eeKey)

	return {
		theme,
		shape,
		visible,
		showCounts,
		showArtwork,
		showBookmark,
		showHistory,
		sideMode,
		lockBgNum,
		showHelp,
		showTool,
		blockGif,
		appliedTheme,
		closeSetting,
		setSetting,
		cycleTheme,
		setTheme,
		cycleShape,
		toggleSetting: toggleKey('showSetting'),
		toggleArtwork: toggleKey('showArtwork'),
		toggleCounts: toggleKey('showCounts'),
		toggleBookmark: toggleKey('showBookmark'),
		toggleLockBg,
		toggleHistory: toggleKey('showHistory'),
		toggleSideMode,
		toggleShowHelp: toggleKey('showHelp'),
		toggleBlockGif: toggleKey('blockGif'),
		toggleTool: toggleKey('showTool'),
	}
}

export const useSettingsBase = () => {
	const [settingRaw, setSetting] = useAtom(settingAtom)
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

const updateMtsMemo = (p: string | undefined, c: string) => {
	if (!p) return c
	const [ct, _cs, ci] = c.split(':')
	const [pt, _ps, pi] = p.split(':')
	return [ct || pt, '', ci || pi].join(':')
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
	const [{ abyss, abyssEx, ee, eeKey, eeSim, eeOpt, eeMemo }, setSetting] =
		useSettingsBase()

	const setTheme = (theme: ThemeId) => setSetting((v) => ({ ...v, theme }))

	const setAbyss = (abyss: Abyss) => {
		setAbyssEx(null)
		setSetting((v) => ({ ...v, abyss }))
	}
	const setAbyssEx = (abyssEx: Abyss | null) =>
		setSetting((v) => ({ ...v, abyssEx }))
	const openEekey = (eeKey: Eekey) =>
		setSetting((v) => ({ ...v, ee: { ...v.ee, [eeKey]: EE_SEASON } }))
	const setEekey = (
		eeKey: Eekey | false,
		simulate = false,
		eeOpt: null | EeOpt = null
	) => {
		const exColor = exKeyToColor(eeKey)

		setAbyssEx(exColor)
		setSetting((v) => ({ ...v, eeKey, eeSim: simulate, eeOpt }))

		if (eeKey === false) return
		if (!simulate) openEekey(eeKey)

		if (simulate && isExTheme(eeKey)) {
			setTheme(eeKey)
		}
		if (eeKey === 'mts10' && eeOpt?.id === 'text') {
			setSetting((v) => {
				const mts10 = updateMtsMemo(v?.eeMemo?.mts10, eeOpt.s)
				return { ...v, eeMemo: { ...v.eeMemo, mts10 } }
			})
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
		eeOpt,
		eeSim,
		eeMemo,
		setAbyss,
		cycleAbyss,
		openEekey,
		setEekey,
		toggleEekeySimulate,
		setSetting,
	}
}

type ThemeOpen = Theme & { visible: boolean; selected: boolean }
export const useSettingsTheme = () => {
	const { setTheme, theme } = useSettings()
	const { ee } = useSettingsEe()

	const themes: ThemeOpen[] = [
		...normalThemes.map((v) => ({ ...v, visible: true })),
		...extThemes.map((v) => ({ ...v, visible: ee[v.id] > 0 })),
	].map((t) => ({
		...t,
		selected: t.id === theme,
	}))
	return { setTheme, themes, theme }
}

export const useSettingsShowEmol = () => {
	const [{ showEmol }, setSetting] = useSettingsBase()
	const setEmol = (showEmol: boolean) => setSetting((v) => ({ ...v, showEmol }))
	const toggleEmol = () => setEmol(!showEmol)
	return { showEmol, setEmol, toggleEmol }
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

export const useSettingsSpell = () => {
	const [settings, setSetting] = useSettingsBase()
	const spellText = sammonSpell(settings)
	const [text, setText] = useState<string>(spellText)
	const [parsed, setParsed] = useState<ReturnType<typeof spellCatch>>(
		spellCatch(spellText)
	)

	const onChangeText = (text: string) => {
		setText(text)
		setParsed(spellCatch(text))
	}

	const callSpell = () => {
		const sp = spellCatch(text)
		if (!sp) return false
		setSetting({ ...settings, ...sp })
		return true
	}

	return { spellText, callSpell, parsed, text, onChangeText }
}
