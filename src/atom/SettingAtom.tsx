import { atom } from 'recoil'
import { storageKeys } from '../config'
import { Setting } from '../types'
import { defaultCustomTheme } from './customThemes'

export const defaultSetting: Setting = {
	theme: 0,
	showSetting: true,
	showArtwork: true,
	showBookmark: false,
	showCounts: true,
	showHistory: false,
	sideMode: 'wide',
	lockBgNum: 10,
	showTool: false,
	enableFakeBar: 'off',
	abyss: '#fff', // TODO: change before deploy
	abyssEx: null,
	showHelp: false,
	eeKey: false,
	eeSim: false,
	ee: {},
	eeOpt: null,
	feedBackText: '',
	customTheme: defaultCustomTheme,
	showEmol: true,
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
	key: storageKeys.setting,
	default: defaultSetting,
	effects: [localStorageEffect(storageKeys.setting)],
})
