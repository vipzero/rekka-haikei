import { atomWithStorage } from 'jotai/utils'
import { storageKeys } from '../config'
import { Setting } from '../types'
import { defaultCustomTheme } from './customThemes'

export const defaultBingoText = `
a:判定:
b::
c::
d::
e::
f:
g:
h:
i:
j:
k
l
m
n
o
p:
q:
r:
s:
t:
ハルヒ:涼宮ハルヒ:
このすば:この素晴らしい世界に祝福を:
けいおん:
コードギアス:
鋼錬:鋼の
`.trim()

export const defaultSetting: Setting = {
	theme: 0,
	shape: 0,
	showSetting: true,
	showArtwork: true,
	showBookmark: false,
	showAgebar: false,
	showCounts: true,
	showHistory: false,
	sideMode: 'wide',
	lockBgNum: 10,
	showTool: false,
	enableFakeBar: 'off',
	abyss: '#fff', // TODO: change before deploy
	abyssEx: null,
	showHelp: false,
	blockGif: false,
	eeKey: false,
	eeSim: false,
	ee: {
		kokaku: 1,
		psychopass: 1,
		yojitsu: 1,
		codegeass: 1,
		lain: 1,
		choco: 1,
		cyberpunk: 1,
		diy: 1,
	},
	eeOpt: null,
	eeMemo: {},
	feedBackText: '',
	customTheme: defaultCustomTheme,
	showEmol: true,
	bingo: defaultBingoText,
}

export const settingAtom = atomWithStorage<Setting>(
	storageKeys.setting,
	defaultSetting
)
