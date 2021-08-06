import { atom } from 'recoil'
import { Setting } from '../types'

export const settingState = atom<Setting>({
	key: 'setting',
	default: {
		showSetting: false,
		showBookmark: false,
		showCounts: true,
		showHistory: false,
		sideMode: false,
		lockBg: false,
		showHelp: false,
		feedBackText: '',
	},
})
