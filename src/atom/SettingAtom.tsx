import { atom } from 'recoil'
import { Setting } from '../types'

const defaultCustomTheme = `
/*
 * tips
 * #aabbcc RGB Hex code
 * #aabbccdd RGB +透過
 * ↓色変数 値だけ変えれば反映される
 */

--font-color: #f00;                          // 文字色
--panel-fo-color: #0f0;                      // パネル文字
--panel-fo-shadow-color: #00f;               // パネル文字縁
--btn-fo-color: #ff0;                        // ボタン文字
--setting-bg-color: #80f;                    // 設定背景
--content-bg-color: #0000ffaa;               // パネル背景
--sub-bg-color: #333;                        // デバッグ背景
--btn-bg-color: rgba(0, 0, 100, 0.5);        // 設定ボタン背景
--btn-bg-checked-color: rgba(0, 0, 30, 0.5); // 設定ボタン背景有効


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
	sideMode: false,
	lockBgNum: 10,
	showTool: false,
	enableFakeBar: 'off',
	abyss: '#fff', // TODO: change before deploy
	abyssEx: null,
	showHelp: false,
	eeKey: false,
	eeSim: false,
	ee: {},
	feedBackText: '',
	customTheme: defaultCustomTheme,
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
