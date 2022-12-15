import { atom } from 'recoil'
import { storageKeys } from '../config'
import { Setting } from '../types'

const defaultCustomTheme = `
/*
 * tips
 * #aabbcc RGB Hex code
 * #aabbccdd RGB +透過
 * ↓色変数 値だけ変えれば反映される
 */

--font-color: #FFC627;                // 文字色
--panel-fo-color: #FFC627;            // パネル文字
--panel-fo-shadow-color: #000;        // パネル文字縁
--btn-fo-color: #fff;                 // ボタン文字
--setting-bg-color: #8C1D40aa;        // 設定背景
--content-bg-color: #8C1D40aa;        // パネル背景
--sub-bg-color: #8C1D40ee;            // デバッグ背景
--btn-bg-color: #00A3E0;              // 設定ボタン背景
--btn-bg-checked-color: #00A3E088;    // 設定ボタン背景有効

#timebar {
  .wrap {
    background: orange;
  }
  .fill {
    background-color: purple;
  }
  .pointer {
    background-color: green;
  }
}

#panel {
}
#bg {
}
#setting-box {
}
`

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
