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
]

const eekeys = [
	'nonnon',
	'mia',
	'sakurasou',
	'higurashi',
	'lain',
	'codegeass',
	'kokaku',
	'psychopass',
	'spin',
	'steinsgate',
	'gotoyome',
	'oreimo',
	'oregairu',
	'saekano',
	'monogatari',

	'jinsei',

	'oreshura',
	'masshiro',
	'rakupro',
	'spin',
] as const

export type Eekey = typeof eekeys[number] | false

export const TITLE_EX_PATTERNS: [string, Eekey][] = [
	['のんのんびより', 'nonnon'],
	['アビス', 'mia'],
	['さくら荘', 'sakurasou'],
	['ひぐらしの', 'higurashi'],
	['experiments lain', 'lain'],
	['コードギアス', 'codegeass'],
	['攻殻機動隊', 'kokaku'],
	['PSYCHO-PASS', 'psychopass'],
	['廻って', 'spin'],
	['Steins;Gate', 'steinsgate'],
	['五等分の花嫁', 'gotoyome'],
	['俺の妹がこんなに', 'oreimo'],
	['やはり俺の青春ラブコメは', 'oregairu'],
	['冴えない彼女の育てかた', 'saekano'],
	['化物語', 'monogatari'],
	['猫物語', 'monogatari'],
	['傷物語', 'monogatari'],
	['偽物語', 'monogatari'],
	['終物語', 'monogatari'],
	['暦物語', 'monogatari'],
	['憑物語', 'monogatari'],
	['幼馴染と彼女が修羅場', 'oreshura'],
]
