import { Song } from '../../../types'
import { Char } from '.'

// 🛑 ネタバレ注意
export const eekeysGimic = [
	'nonnon',
	'mia',
	'higurashi',

	'sakurasou',
	'masshiro', // R
	'halowa',
	'rain', // R
	'bkbk',
	'rainbow',
	'gaming',
	'subetef',

	'gkgurashi',
	'issyuukanfr',
	'sao',
	// '3sha3yo', //R
	'susu',
	'ariascarlet', //R
	'mts10',
	'masso',
	'birth',
	// 'imascd', // R
] as const
// 🛑 ネタバレ注意
export const eekeysThemetic = [
	'kokaku',
	'psychopass',
	'yojitsu',
	'codegeass',
	'lain',
	'choco',
	'cyberpunk',
	'diy',
	'eightysix',
] as const
export const eekeysMirror = [
	'spin',
	'flip',
	'sakasa',
	// 'break',
	'mosaic',
	'offline',
	'move',
	'chimaru',
	'parapara',
] as const
export const eekeysVotic = [
	'gotoyome',
	'oreimo',
	'oregairu',
	// 'saekano',
	// 'monogatari',
	'steinsgate',
	// 'aobuta',
	'oreshura',
	// 'jinsei',
	// 'toaru',
	'jojo',
	'bobo',
	'rozen', // R
	// 'amagami', // R
	// 'shanimas',
	// 'gabudoro',
	// 'yamajo',
	// 'imasml',
	// 'imasmlas',
	// 'imasmlpr',
	// 'imasmlfa',
	// 'imasmlan',
	// 'rakupro', // R
	// 'shining', // R
	// 'loveplus', // R
	// 'milgram', // R
	'roshidere',
	'makein',
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
const isEekeyStr = (s: string): s is EekeyStr => eekeys.includes(s as EekeyStr)

type EekeyStr = (typeof eekeys)[number]
export type Eekey = EekeyStr
export type EekeyState = Eekey | false
export type EeOptChar = { id: 'cvote'; chars: Char[] }
export type EeOptText = { id: 'text'; s: string }
export type EeOpt = null | EeOptChar | EeOptText
export type ExThemeKey = (typeof eekeysThemetic)[number]
export const isExTheme = (theme: Eekey | false | number): theme is ExThemeKey =>
	eekeysThemetic.includes(theme as ExThemeKey)

// アルバム名・アニメ名に部分マッチ
export const EX_PATTERNS_ANIME_OR_ALBUM: [string | RegExp, Eekey][] = [
	['のんのんびより', 'nonnon'],
	['アビス', 'mia'],
	['さくら荘', 'sakurasou'],
	// ['青春ブタ', 'aobuta'],
	['ひぐらしの', 'higurashi'],
	['experiments lain', 'lain'],
	['攻殻機動隊', 'kokaku'],
	['PSYCHO-PASS', 'psychopass'],
	['ようこそ実力', 'yojitsu'],
	['廻って', 'spin'],
	['Steins;Gate', 'steinsgate'],
	['五等分の花嫁', 'gotoyome'],
	['俺の妹がこんなに', 'oreimo'],
	['すべてがFになる', 'subetef'],
	['やはり俺の青春ラブコメは', 'oregairu'],
	// ['冴えない彼女の育てかた', 'saekano'],
	// [/[化猫傷偽終暦憑]物語/, 'monogatari'],
	['が修羅場すぎ', 'oreshura'],
	// [/とある(魔術|科学)の/, 'toaru'],
	['ジョジョ', 'jojo'],
	['ボーボボ', 'bobo'],
	[/ローゼンメイデン|Rozen Maiden/i, 'rozen'],
	['がっこうぐらし', 'gkgurashi'],
	// ['ガヴリール', 'gabudoro'],
	[/一週間フレンズ|プラスティック・メモリーズ/, 'issyuukanfr'],
	['サカサマのパテマ', 'sakasa'],
	['ソードアート・オンライン', 'sao'],
	[/シャドーハウス|亜人[^ち]/, 'susu'],
	['緋弾', 'ariascarlet'],
	// [/アマガミ/, 'amagami'],
	// ['音楽少女', 'shining'],
	// ['三者三葉', '3sha3yo'],
	// ['シンデレラガールズ', 'imascd'],
	// ['楽園PROJECT', 'rakupro'],
	// ['シャイニーカラーズ', 'shanimas'],
	[/new game|ゲーマーズ|ハイスコア|ネトゲ/i, 'gaming'],
	// [/ラブプラス/i, 'loveplus'],
	// ['極黒のブリュンヒルデ', 'bryunhild'],
	// [/山田.*魔女/, 'yamajo'],
	['コードギアス', 'codegeass'],
	[/サイバーパンク|cyberpunk/i, 'cyberpunk'],
	[/Do It Yourself!!/i, 'diy'],
	[/ロシア語でデレる/i, 'roshidere'],
	[/負けヒロイン/i, 'makein'],
	[/エイティシックス/i, 'eightysix'],
	[/^チ。/i, 'chimaru'],
]
export const EX_PATTERNS_CUSTOM: [(_song: Song) => boolean, Eekey][] = [
	// [ (song) => song.animeTitle === '人生', 'jinsei' ],
	// 短いタイトルなのでアルバム避け
]
export const checkHedwig = (song: Song): [Eekey, EeOptText] | null => {
	if (!song.hedwig) return null
	const [k, ...s] = song.hedwig.split(':')
	if (k === 'mts10') {
		return [k, { id: 'text', s: s.join(':') }]
	}
	if (k === 'birth') {
		return [k, { id: 'text', s: s.join(':') }]
	}
	return null
}

// icy のどちらか半分に完全一致
export const EX_PATTERNS_JUST_ICY: [string, Eekey][] = []

// icy に部分一致
export const EX_PATTERNS_ICY: [string | RegExp, Eekey][] = [
	[/ノルニル|スクランブル|回レ|ぐるぐる|ろーりんぐ|ローリング|回転/, 'spin'],
	[/bull['e]/, 'ariascarlet'],
	[/逆さま|サカサマ|サーカス/, 'sakasa'],
	[/Sparkling Daydream/, 'parapara'],
	['労働', 'halowa'],
	[/return|ウラオモテ/, 'flip'],
	// ['アマガミ', 'amagami'],
	// [/シャイニング.?ピース/, 'shining'],
	['まっしろわーるど', 'masshiro'],
	[/colorful|虹($|色|[\p{scx=Hiragana}])|rainbow/iu, 'rainbow'],
	[/雨([^上宮]|!?あがり)|[^a-z]rain/i, 'rain'],
	[/�/, 'lain'],
	// [/高嶺 ?愛花|小早川 ?凛子|姉ヶ崎 ?寧々/, 'loveplus'],
	// [/MILGRAM/, 'milgram'],
	[/動く|moving|move/, 'move'],
	[
		/マッスル|マッソー|ダンベル|ブートダンス|スポーツ|筋肉|エクササイズ|運.動|muscle/i,
		'masso',
	],
	[/ちょこ|チョコ|choco/i, 'choco'],
	[/サイバーパンク|cyberpunk/i, 'cyberpunk'],
	[/シュワシュワ|シークヮーサー|ソーダ|サイダー|ビタミン/i, 'bkbk'],
]

// protobuf 逆引き用, 再割り当てと欠落不可
export const eeId: Record<EekeyStr, number> = {
	nonnon: 0,
	mia: 1,
	higurashi: 2,
	sakurasou: 3,
	masshiro: 4,
	halowa: 5,
	rain: 6,
	rainbow: 7,
	gaming: 8,
	subetef: 9,
	gkgurashi: 10,
	issyuukanfr: 11,
	sao: 12,
	// '3sha3yo': 13,
	susu: 14,
	ariascarlet: 15,
	// imascd: 16,
	kokaku: 17,
	psychopass: 18,
	lain: 19,
	spin: 20,
	flip: 21,
	sakasa: 22,
	mosaic: 23,
	offline: 24,
	gotoyome: 25,
	oreimo: 26,
	oregairu: 27,
	// saekano: 28,
	// monogatari: 29,
	steinsgate: 30,
	// aobuta: 31,
	oreshura: 32,
	// jinsei: 33,
	// toaru: 34,
	jojo: 35,
	bobo: 36,
	rozen: 37,
	// amagami: 38,
	// shanimas: 39,
	// gabudoro: 40,
	// imasml: 41,
	// rakupro: 42,
	// shining: 43,
	// loveplus: 44,
	move: 45,
	// milgram: 45,
	mts10: 46,
	parapara: 47,
	masso: 48,
	yojitsu: 49,
	choco: 50,
	codegeass: 51,
	cyberpunk: 52,
	bkbk: 53,
	diy: 54,
	birth: 55,
	roshidere: 56,
	makein: 57,
	eightysix: 58,
	chimaru: 59,
}
