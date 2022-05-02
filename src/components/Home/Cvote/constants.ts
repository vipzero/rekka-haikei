import { ThemeId } from '../../../types'
import { Char } from './index'

type CvoteProfile = {
	id: Eekey
	chars: Char[]
}
export const CVOTE_PROFILES: CvoteProfile[] = [
	{
		id: 'gotoyome',
		chars: [
			{ id: '1', name: '一花', color: '#E4A9B0' },
			{ id: '2', name: '二乃', color: '#DC6A79' },
			{ id: '3', name: '三玖', color: '#CF5A4A' },
			{ id: '4', name: '四葉', color: '#CD5B3D' },
			{ id: '5', name: '五月', color: '#D15D4D' },
		],
	},
	{
		id: 'oreimo',
		chars: [
			{ id: 'ki', name: '桐乃', color: '#D6A883' },
			{ id: 'ku', name: '黒猫', color: '#262433' },
			{ id: 'ay', name: 'あやせ', color: '#424B65' },
			{ id: 'ba', name: 'バジ', color: '#515C6B' },
			{ id: 'ka', name: '加奈子', color: '#A35D4D' },
			{ id: 'ma', name: '真奈美', color: '#5F503C' },
			{ id: 'se', name: '瀬菜', color: '#85555D' },
		],
	},
	{
		id: 'oregairu',
		chars: [
			{ id: 'yk', name: '雪ノ下', color: '#424B65' },
			{ id: 'yi', name: 'ガハマ', color: '#E5AF9D' },
			{ id: 'ir', name: 'いろは', color: '#EAC9A7' },
			{ id: 'ot', name: '他', color: '#ffffff' },
		],
	},
	{
		id: 'saekano',
		chars: [
			{ id: 'mg', name: '加藤恵', color: '#433C43' },
			{ id: 'ut', name: '詩羽', color: '#4F4342' },
			{ id: 'er', name: '英梨々', color: '#EBD4AE' },
			{ id: 'iz', name: '出海', color: '#8F5254' },
			{ id: 'mt', name: '美智留', color: '#5F5580' },
		],
	},
	{
		id: 'monogatari',
		chars: [
			{ id: 'ht', name: 'ひたぎ', color: '#704B6D' },
			{ id: 'my', name: '八九寺', color: '#575452' },
			{ id: 'kn', name: '神原', color: '#56526E' },
			{ id: 'nd', name: '撫子', color: '#51453B' },
			{ id: 'hn', name: '羽川', color: '#4D4855' },
			{ id: 'sn', name: '忍', color: '#EDDB7D' },
			{ id: 'kr', name: '火憐', color: '#393939' },
			{ id: 'tk', name: '月火', color: '#393939' },
			{ id: 'on', name: '斧乃木', color: '#74BCBD' },
			{ id: 'ou', name: '忍野扇', color: '#111111' },
			{ id: 'oi', name: '老倉育', color: '#E0E0E0' },
		],
	},
	{
		id: 'oreshura',
		chars: [
			{ id: 'hr', name: '春咲', color: '#F2AE56' },
			{ id: 'nt', name: '夏川', color: '#5CA8DC' },
			{ id: 'ak', name: '秋篠', color: '#A3C940' },
			{ id: 'fy', name: '冬海', color: '#EC5CA5' },
		],
	},
	{
		id: 'jinsei',
		chars: [
			{ id: 'ri', name: '理系', color: '#887C7B' },
			{ id: 'bu', name: '文系', color: '#F3EBD9' },
			{ id: 'ta', name: '体育', color: '#BF908E' },
			{ id: 'si', name: '新聞', color: '#E3ECEE' },
			{ id: 'bi', name: '美術', color: '#ECD6E0' },
		],
	},
	{
		id: 'steinsgate',
		chars: [
			{ id: 'kr', name: '紅莉栖', color: '#724B2E' },
			{ id: 'my', name: 'まゆり', color: '#1E211A' },
			{ id: 'sz', name: '鈴羽', color: '#968169' },
			{ id: 'fe', name: 'フェ', color: '#BE8274' },
			{ id: 'rk', name: 'ルカ子', color: '#323D3A' },
			{ id: 'me', name: '萌郁', color: '#E7C087' },
			{ id: 'mh', name: '真帆', color: '#323529' },
		],
	},
	{
		id: 'toaru',
		chars: [
			{ id: 'msk', name: '御坂', color: '#A67965' },
			{ id: 'ind', name: 'イン', color: '#B8B8D3' },
			{ id: 'skh', name: '食蜂', color: '#E6D29A' },
			{ id: 'krk', name: '黒子', color: '#BC827A' },
			{ id: 'uih', name: '初春', color: '#4B484D' },
			{ id: 'stn', name: '佐天', color: '#535659' },
			{ id: 'knz', name: '神裂', color: '#453544' },
			{ id: 'hmg', name: '姫神', color: '#3B3B47' },
			{ id: 'ora', name: 'オリア', color: '#DFBB82' },
			{ id: 'mik', name: '舞夏', color: '#484A65' },
			{ id: 'kme', name: '小萌', color: '#CCA4A8' },
			{ id: 'huk', name: '氷華', color: '#73685D' },
			{ id: 'ror', name: 'ローラ', color: '#E0DAB0' },
			{ id: 'itw', name: '五和', color: '#6C5B67' },
			{ id: 'mtk', name: '光子', color: '#454552' },
			{ id: 'knh', name: '絹保', color: '#A08972' },
			{ id: 'hru', name: '春上', color: '#645158' },
			{ id: 'may', name: '万彬', color: '#56536B' },
			{ id: 'msj', name: '結標', color: '#8E4541' },

			{ id: 'fky', name: '吹寄', color: '#373234' },
			{ id: 'nnt', name: '布束', color: '#302F49' },
			{ id: 'mgn', name: '麦野', color: '#936555' },
			{ id: 'frn', name: 'フレン', color: '#E0D3A9' },
			{ id: 'mai', name: '最愛', color: '#8C6D51' },
			{ id: 'tkt', name: '滝壺', color: '#5E5C5B' },
			{ id: 'snr', name: '心理', color: '#EAD9AC' },
			{ id: 'feb', name: 'フェブ', color: '#E1DBC9' },
			{ id: 'ars', name: 'アリサ', color: '#CFB7C9' },
			{ id: 'dri', name: 'ドリー', color: '#A67A66' },
			{ id: 'oti', name: 'オティ', color: '#E2DBAE' },
			{ id: 'msi', name: '御坂妹', color: '#A67A66' },
			{ id: 'utd', name: '打ち止', color: '#A67A66' },
			{ id: 'bng', name: '番外', color: '#A67A66' },
			{ id: 'oth', name: '他', color: '#fff' },
		],
	},
	{
		id: 'bobo',
		chars: [
			{ id: 's1', name: 'ﾎﾞｰﾎﾞﾎﾞ', color: '#fe5' },
			{ id: 's2', name: 'ﾎﾞｰﾎﾞﾎﾞ', color: '#fe5' },
			{ id: 's3', name: 'ﾎﾞｰﾎﾞﾎﾞ', color: '#fe5' },
			{ id: 's4', name: 'ﾎﾞｰﾎﾞﾎﾞ', color: '#fe5' },
			{ id: 's5', name: 'ﾎﾞｰﾎﾞﾎﾞ', color: '#fe5' },
		],
	},
	{
		id: 'jojo',
		chars: [
			{ id: 's1', name: '1部', color: '#B8A2D2' },
			{ id: 's2', name: '2部', color: '#7C308C' },
			{ id: 's3', name: '3部', color: '#C7E249' },
			{ id: 's4', name: '4部', color: '#EC5C9F' },
			{ id: 's5', name: '5部', color: '#E7AB3C' },
			{ id: 's6', name: '6部', color: '#53B8B7' },
			{ id: 's7', name: '7部', color: '#CD645B' },
			{ id: 's8', name: '8部', color: '#B27492' },
			// { id: 's9', name: '9部', color: '#B0C270' },
		],
	},
	{
		id: 'rozen',
		chars: [
			{ id: 'sg', name: '水銀燈', color: '#c0c0c0' },
			{ id: 'ki', name: '金糸雀', color: '#ffff00' },
			{ id: 'ss', name: '翠星石', color: '#008000' },
			{ id: 'as', name: '蒼星石', color: '#0000cd' },
			{ id: 'mk', name: '真紅', color: '#d70035' },
			{ id: 'hi', name: '雛苺', color: '#ff66cc' },
			{ id: 'br', name: '薔薇水', color: '#cab8d9' },
		],
	},
	{
		id: 'amagami',
		chars: [
			{ id: 'ay', name: '絢辻', color: '#82cddd' },
			{ id: 'rh', name: '梨穂子', color: '#ed6d35' },
			{ id: 'ko', name: '薫', color: '#9fc24d' },
			{ id: 'nk', name: '中多', color: '#f3a68c' },
			{ id: 'nn', name: '七咲', color: '#4496d3' },
			{ id: 'mr', name: '森島', color: '#a4a8d4' },
			{ id: 'my', name: '美也', color: '#ffdc00' },
			{ id: 'kz', name: '上崎', color: '#dc6b9a' },
		],
	},
	{
		id: 'shanimas',
		chars: [
			{ id: 'mn', name: '真乃', color: '#ffbad6' },
			{ id: 'as', name: '灯織', color: '#144384' },
			{ id: 'mg', name: 'めぐる', color: '#ffe012' },
			{ id: 'rn', name: '恋鐘', color: '#f84cad' },
			{ id: 'mm', name: '摩美々', color: '#a846fb' },
			{ id: 'st', name: '咲耶 ', color: '#006047' },
			{ id: 'yk', name: '結華', color: '#3b91c4' },
			{ id: 'kk', name: '霧子', color: '#d9f2ff' },
			{ id: 'rh', name: '果穂', color: '#e5461c' },
			{ id: 'ty', name: '智代子', color: '#f93b90' },
			{ id: 'jr', name: '樹里', color: '#ffc602' },
			{ id: 'rs', name: '凛世', color: '#89c3eb' },
			{ id: 'nh', name: '夏葉', color: '#90e667' },
			{ id: 'an', name: '甘奈', color: '#ff699e' },
			{ id: 'kh', name: '甜花', color: '#e75bec' },
			{ id: 'cy', name: '千雪', color: '#fafafa' },
			{ id: 'ah', name: 'あさひ', color: '#f30100' },
			{ id: 'hy', name: '冬優子', color: '#5aff19' },
			{ id: 'ai', name: '愛依', color: '#ff00ff' },
			{ id: 'to', name: '透', color: '#50d0d0' },
			{ id: 'md', name: '円香', color: '#be1e3e' },
			{ id: 'ki', name: '小糸', color: '#7967c3' },
			{ id: 'hn', name: '雛菜', color: '#ffc639' },
			{ id: 'nt', name: 'にちか', color: '#a6cdb6' },
			{ id: 'mk', name: '美琴', color: '#760f10' },
			{ id: 'rk', name: 'ルカ', color: '#23120c' },
		],
	},
	{
		id: 'yamajo',
		chars: [
			{ id: 'ur', name: 'うらら', color: '#F1E9BF' },
			{ id: 'nn', name: '寧々', color: '#A798BF' },
			{ id: 'mi', name: '芽子', color: '#7EB78F' },
			{ id: 'mr', name: 'マリア', color: '#A4C7D3' },
			{ id: 'na', name: 'ノア', color: '#E5BAC9' },
			{ id: 'as', name: '飛鳥', color: '#41405A' },
			{ id: 'si', name: '西園寺', color: '#F1CB9D' },
		],
	},
	{
		id: 'gabudoro',
		chars: [
			{ id: 'gb', name: 'ガヴ', color: '#F5DD9B' },
			{ id: 'vi', name: 'ヴィ', color: '#544D6D' },
			{ id: 'st', name: 'サタ', color: '#BE8274' },
			{ id: 'rf', name: 'ラフィ', color: '#E8E7F7' },
		],
	},
]

// 🛑 ネタバラシ禁止
export const eekeysGimic = [
	'nonnon',
	'mia',
	'higurashi',
	'rakupro',

	'sakurasou',
	'masshiro',
	'halowa',

	'steinsgate',
	'gkgurashi',
	'issyuukanfr',
	'sao',
	// 'codegeass',
] as const
// 🛑 ネタバラシ禁止
export const eekeysThemetic = ['kokaku', 'psychopass', 'lain'] as const
export const eekeysMirror = ['spin', 'flip', 'patema', 'ariascarlet'] as const
export const eekeysVotic = [
	'gotoyome',
	'oreimo',
	'oregairu',
	'saekano',
	'monogatari',
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
]
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

export type Eekey = typeof eekeys[number] | false
export type ExThemeKey = typeof eekeysThemetic[number]
export const isExTheme = (
	theme: string | false | number
): theme is ExThemeKey => eekeysThemetic.includes(theme as ExThemeKey)

export const TITLE_EX_PATTERNS: [string | RegExp, Eekey][] = [
	['のんのんびより', 'nonnon'],
	['アビス', 'mia'],
	['さくら荘', 'sakurasou'],
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
	[/とある(魔術|科学)の/, 'toaru'],
	['ジョジョの奇妙な冒険', 'jojo'],
	['ボーボボ', 'bobo'],
	['ローゼンメイデン', 'rozen'],
	['がっこうぐらし', 'gkgurashi'],
	['ガヴリール', 'gabudoro'],
	['一週間フレンズ', 'issyuukanfr'],
	['サカサマのパテマ', 'patema'],
	['ソードアート・オンライン', 'sao'],
	['山田くんと7人の魔女', 'yamajo'],
	['緋弾', 'ariascarlet'],
]
