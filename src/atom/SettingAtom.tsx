import { atom } from 'recoil'
import { Setting } from '../types'

export const defaultSetting: Setting = {
	theme: 0,
	showSetting: false,
	showArtwork: true,
	showBookmark: false,
	showCounts: true,
	showHistory: false,
	sideMode: false,
	lockBgNum: 10,
	showTool: false,
	abyss: '#fff', // TODO: change before deploy
	abyssEx: null,
	showHelp: false,
	eeKey: false,
	eeSim: false,
	ee: {},
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
	default: defaultSetting,
	effects: [localStorageEffect('setting')],
})
