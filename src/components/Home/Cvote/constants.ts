import { Char } from '.'
import { Song } from '../../../types'

// 🛑 ネタバレ注意
export const eekeysGimic = [
	'nonnon',
	'mia',
	'higurashi',

	'sakurasou',
	'masshiro',
	'halowa',

	'gkgurashi',
	'issyuukanfr',
	'sao',
	'3sha3yo',
	// 'codegeass',
	'ariascarlet',
	'imascd',
] as const
// 🛑 ネタバレ注意
export const eekeysThemetic = ['kokaku', 'psychopass', 'lain'] as const
export const eekeysMirror = ['spin', 'flip', 'patema'] as const
export const eekeysVotic = [
	'gotoyome',
	'oreimo',
	'oregairu',
	'saekano',
	'monogatari',
	'steinsgate',
	'aobuta',
	'oreshura',
	'jinsei',
	'toaru',
	'jojo',
	'bobo',
	'rozen',
	'amagami',
	'shanimas',
	'gabudoro',
	'yamajo',
	'bryunhild',
	'imasml',
	// 'imasmlas',
	// 'imasmlpr',
	// 'imasmlfa',
	// 'imasmlan',
	'rakupro',
	'shining',
] as const
export const eekeys = [
	...eekeysGimic,
	...eekeysThemetic,

	...eekeysMirror,

	...eekeysVotic,
] as const
export const eekeyGroups = [
	eekeysGimic,
	eekeysThemetic,
	eekeysMirror,
	eekeysVotic,
]

export type Eekey = typeof eekeys[number]
export type EekeyState = Eekey | false
export type EeOpt = null | { chars: Char[] }
export type ExThemeKey = typeof eekeysThemetic[number]
export const isExTheme = (
	theme: string | false | number
): theme is ExThemeKey => eekeysThemetic.includes(theme as ExThemeKey)

// アルバム名・アニメ名に部分マッチ
export const EX_PATTERNS_ANIME_OR_ALBUM: [string | RegExp, Eekey][] = [
	['のんのんびより', 'nonnon'],
	['アビス', 'mia'],
	['さくら荘', 'sakurasou'],
	['青ブタ', 'aobuta'],
	['ひぐらしの', 'higurashi'],
	['experiments lain', 'lain'],
	// ['コードギアス', 'codegeass'],
	['攻殻機動隊', 'kokaku'],
	['PSYCHO-PASS', 'psychopass'],
	['廻って', 'spin'],
	['Steins;Gate', 'steinsgate'],
	['五等分の花嫁', 'gotoyome'],
	['俺の妹がこんなに', 'oreimo'],
	['やはり俺の青春ラブコメは', 'oregairu'],
	['冴えない彼女の育てかた', 'saekano'],
	[/[化猫傷偽終暦憑]物語/, 'monogatari'],
	['が修羅場すぎ', 'oreshura'],
	['極黒のブリュンヒルデ', 'bryunhild'],
	[/とある(魔術|科学)の/, 'toaru'],
	['ジョジョ', 'jojo'],
	['ボーボボ', 'bobo'],
	[/ローゼンメイデン|Rozen Maiden/i, 'rozen'],
	['がっこうぐらし', 'gkgurashi'],
	['ガヴリール', 'gabudoro'],
	[/一週間フレンズ|プラスティック・メモリーズ/, 'issyuukanfr'],
	['サカサマのパテマ', 'patema'],
	['ソードアート・オンライン', 'sao'],
	[/山田.*魔女/, 'yamajo'],
	['緋弾', 'ariascarlet'],
	[/アマガミ/, 'amagami'],
	['音楽少女', 'shining'],
	['三者三葉', '3sha3yo'],
	['シンデレラガールズ', 'imascd'],
	['楽園PROJECT', 'rakupro'],
	['シャイニーカラーズ', 'shanimas'],
	['まっしろわーるど', 'masshiro'],
]
export const EX_PATTERNS_CUSTOM: [(song: Song) => boolean, Eekey][] = [
	[(song) => song.animeTitle === '人生', 'jinsei'], // 短いタイトルなのでアルバム避け
]

// icy のどちらか半分に完全一致
export const EX_PATTERNS_JUST_ICY: [string, Eekey][] = []

// icy に部分一致
export const EX_PATTERNS_ICY: [string | RegExp, Eekey][] = [
	[/ノルニル|スクランブル|回レ|ぐるぐる/, 'spin'],
	[/bull['e]/, 'ariascarlet'],
	['逆さま', 'patema'],
	['労働', 'halowa'],
	[/return|ウラオモテ/, 'flip'],
	['アマガミ', 'amagami'],
	[/シャイニング.?ピース/, 'shining'],
]
