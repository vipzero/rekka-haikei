import { atom } from 'recoil'
import { Setting } from '../types'

const defaultValue: Setting = {
	showSetting: false,
	showBookmark: false,
	showCounts: true,
	showHistory: false,
	sideMode: false,
	lockBg: false,
	showTool: false,
	abyss: '#fff', // TODO: change before deploy
	showHelp: false,
	feedBackText: '',
}

const localStorageEffect =
	(key) =>
	({ setSelf, onSet }) => {
		const savedValue = localStorage.getItem(key)
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue))
		}

		onSet((newValue) => {
			localStorage.setItem(key, JSON.stringify(newValue))
		})
	}

export const settingState = atom<Setting>({
	key: 'setting',
	default: defaultValue,
	effects_UNSTABLE: [localStorageEffect('setting')],
})
