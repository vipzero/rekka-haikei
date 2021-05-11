import { atom } from 'recoil'
import { Setting } from '../../types'

export const settingState = atom<Setting>({
	key: 'setting',
	default: {
		showConfig: false,
		showBookmark: false,
		showCounts: true,
		showHistory: false,
		sideMode: false,
		lockBg: false,
		showLyrics: false,
		feedBackText: '',
	},
})
