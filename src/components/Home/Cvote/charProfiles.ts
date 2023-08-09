import { eekeysVotic } from './constants'
import { Char } from './index'

type CvoteProfile = {
	id: typeof eekeysVotic[number]
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
		id: 'oreshura',
		chars: [
			{ id: 'hr', name: '春咲', color: '#F2AE56' },
			{ id: 'nt', name: '夏川', color: '#5CA8DC' },
			{ id: 'ak', name: '秋篠', color: '#A3C940' },
			{ id: 'fy', name: '冬海', color: '#EC5CA5' },
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
]
