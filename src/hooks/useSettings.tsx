import { useRecoilState } from 'recoil'
import { settingState } from '../atom/SettingAtom'
import { Eekey } from '../components/Home/Cvote/constants'
import { Abyss, nextAbyss } from '../config'
import { toggle } from '../util'

function exKeyToColor(exkey: Eekey) {
	if (exkey === 'higurashi' || exkey === 'mia') return '#f00'
	if (exkey === 'sakurasou') return '#fde'
	return null
}

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
			ee,
			eeKey,
			eeSim,
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
		visible,
		showCounts,
		showBookmark,
		showHistory,
		sideMode,
		lockBg,
		showHelp,
		fadeAbyssColor: abyss,
		showTool,
		ee,
		eeKey,
		eeSim,
		setAbyss,
		cycleAbyss,
		toggleCounts,
		toggleBookmark,
		toggleLockBg,
		toggleHistory,
		toggleSideMode,
		toggleShowHelp,
		closeSetting,
		toggleTool,
		setEekey,
		setSetting,
	}
}
