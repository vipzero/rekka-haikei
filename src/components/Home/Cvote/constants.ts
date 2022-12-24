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
	'rain',
	'rainbow',
	'gaming',
	'subetef',

	'gkgurashi',
	'issyuukanfr',
	'sao',
	'3sha3yo',
	'susu',
	// 'codegeass',
	'ariascarlet',
	'imascd',
] as const
// 🛑 ネタバレ注意
export const eekeysThemetic = ['kokaku', 'psychopass', 'lain'] as const
export const eekeysMirror = [
	'spin',
	'flip',
	'sakasa',
	// 'break',
	'mosaic',
] as const
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
	// 'yamajo',
	'imasml',
	// 'imasmlas',
	// 'imasmlpr',
	// 'imasmlfa',
	// 'imasmlan',
	'rakupro',
	'shining',
	'loveplus',
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
	['青春ブタ', 'aobuta'],
	['ひぐらしの', 'higurashi'],
	['experiments lain', 'lain'],
	['攻殻機動隊', 'kokaku'],
	['PSYCHO-PASS', 'psychopass'],
	['廻って', 'spin'],
	['Steins;Gate', 'steinsgate'],
	['五等分の花嫁', 'gotoyome'],
	['俺の妹がこんなに', 'oreimo'],
	['すべてがFになる', 'subetef'],
	['やはり俺の青春ラブコメは', 'oregairu'],
	['冴えない彼女の育てかた', 'saekano'],
	[/[化猫傷偽終暦憑]物語/, 'monogatari'],
	['が修羅場すぎ', 'oreshura'],
	[/とある(魔術|科学)の/, 'toaru'],
	['ジョジョ', 'jojo'],
	['ボーボボ', 'bobo'],
	[/ローゼンメイデン|Rozen Maiden/i, 'rozen'],
	['がっこうぐらし', 'gkgurashi'],
	['ガヴリール', 'gabudoro'],
	[/一週間フレンズ|プラスティック・メモリーズ/, 'issyuukanfr'],
	['サカサマのパテマ', 'sakasa'],
	['ソードアート・オンライン', 'sao'],
	['/シャドーハウス|亜人[^ち]/', 'susu'],
	['緋弾', 'ariascarlet'],
	[/アマガミ/, 'amagami'],
	['音楽少女', 'shining'],
	['三者三葉', '3sha3yo'],
	['シンデレラガールズ', 'imascd'],
	['楽園PROJECT', 'rakupro'],
	['シャイニーカラーズ', 'shanimas'],
	[/new game|ゲーマーズ|ハイスコア|ネトゲ/i, 'gaming'],
	[/ラブプラス/i, 'loveplus'],
	// ['極黒のブリュンヒルデ', 'bryunhild'],
	// [/山田.*魔女/, 'yamajo'],
	// ['コードギアス', 'codegeass'],
]
export const EX_PATTERNS_CUSTOM: [(_song: Song) => boolean, Eekey][] = [
	[(song) => song.animeTitle === '人生', 'jinsei'], // 短いタイトルなのでアルバム避け
]

// icy のどちらか半分に完全一致
export const EX_PATTERNS_JUST_ICY: [string, Eekey][] = []

// icy に部分一致
export const EX_PATTERNS_ICY: [string | RegExp, Eekey][] = [
	[/ノルニル|スクランブル|回レ|ぐるぐる|ろーりんぐ|ローリング/, 'spin'],
	[/bull['e]/, 'ariascarlet'],
	[/逆さま|サカサマ|サーカス/, 'sakasa'],
	['労働', 'halowa'],
	[/return|ウラオモテ/, 'flip'],
	['アマガミ', 'amagami'],
	[/シャイニング.?ピース/, 'shining'],
	['まっしろわーるど', 'masshiro'],
	[/color|虹|rainbow/i, 'rainbow'],
	[/雨([^上宮]|!?あがり)|[^a-z]rain/i, 'rain'],
	[/�/, 'lain'],
	[/・高嶺 ?愛花|小早川 ?凛子|姉ヶ崎 ?寧々/, 'loveplus'],
]
