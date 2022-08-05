import { createHash } from 'crypto'
import { Char } from '.'
import { textNormalize } from '../../../util/serverCodeUtils'
import { libTsv } from './imasSongLib'

const meta = { len: 24, salt: 'AA' }
const makeHash = (s) => createHash('md5').update(s).digest('base64')
const lib = Object.fromEntries(libTsv)

export const getIdles = (title: string): false | Char[] => {
	title = 'ラスト・アクトレス'
	const bb = `${meta.salt}${textNormalize(title)}`
	const key = makeHash(bb).substring(0, meta.len)

	if (!lib[key]) return false

	const names = lib[key]?.split('_').map((idle) => charKeyLib[idle])
	if (!names) return false
	const ghit = groups[names?.[0]]
	if (ghit) return imasChars.filter((v) => v.group === ghit)
	return names
		.map((name) => imasChars.find((v) => name.includes(v.name)))
		.filter((v) => v !== undefined)
}

const charKeyLib = {
	'1': '七尾百合子',
	'2': '箱崎星梨花',
	'3': '天空橋朋花',
	'4': '最上静香',
	'5': '天海春香',
	'6': '春日未来',
	'7': '横山奈緒',
	'8': '望月杏奈',
	'9': '豊川風花',
	'10': '詩花',
	'11': '一ノ瀬志希',
	'12': '宮本フレデリカ',
	'13': '伊吹翼*28',
	a: '我那覇響',
	b: '所恵美',
	c: '田中琴葉',
	d: '北沢志保',
	e: '如月千早',
	f: 'エミリー',
	g: '真壁瑞希',
	h: '百瀬莉緒',
	i: '水瀬伊織',
	j: '伊吹翼',
	k: '北上麗花',
	l: '星井美希',
	m: 'ジュリア',
	n: '福田のり子',
	o: '高山紗代子',
	p: '篠宮可憐',
	q: '三浦あずさ',
	r: '大神環',
	s: '中谷育',
	t: '矢吹可奈',
	u: '高槻やよい',
	v: '秋月律子',
	w: '木下ひなた',
	x: '佐竹美奈子',
	y: '松田亜利沙',
	z: '徳川まつり',
	A: '高坂海美',
	B: '宮尾美也',
	C: '四条貴音',
	D: '島原エレナ',
	E: '舞浜歩',
	F: '菊地真',
	G: '双海真美',
	H: 'ロコ',
	I: '二階堂千鶴',
	J: '萩原雪歩',
	K: '周防桃子',
	L: '野々原茜',
	M: '双海亜美',
	N: '馬場このみ',
	O: '永吉昴',
	P: 'MILLION ALLSTARS',
	Q: '上記12名全員',
	R: '765 MILLION ALLSTARS',
	S: '白石紬',
	T: 'フェアリースターズ',
	U: '桜守歌織',
	V: 'エンジェルスターズ',
	W: 'プリンセススターズ',
	X: '765PRO ALLSTARS',
	Y: '',
	Z: '玲音',
}
const groups = {
	'765PRO ALLSTARS': 'as',
	'MILLION ALLSTARS': 'as',
	プリンセススターズ: 'pr',
	フェアリースターズ: 'fa',
	エンジェルスターズ: 'an',
}

const imasChars = [
	// as
	{ id: 'ah', group: 'as', name: '春香', color: '#e22b30' },
	{ id: 'ch', group: 'as', name: '千早', color: '#2743d2' },
	{ id: 'yh', group: 'as', name: '雪歩', color: '#d3dde9' },
	{ id: 'yy', group: 'as', name: 'やよい', color: '#f39939' },
	{ id: 'rt', group: 'as', name: '律子', color: '#01a860' },
	{ id: 'az', group: 'as', name: 'あずさ', color: '#9238be' },
	{ id: 'io', group: 'as', name: '伊織', color: '#fd99e1' },
	{ id: 'ma', group: 'as', name: '真', color: '#515558' },
	{ id: 'am', group: 'as', name: '亜美', color: '#ffe43f' },
	{ id: 'mm', group: 'as', name: '真美', color: '#ffe43f' },
	{ id: 'mi', group: 'as', name: '美希', color: '#b4e04b' },
	{ id: 'hb', group: 'as', name: '響', color: '#01adb9' },
	{ id: 'tn', group: 'as', name: '貴音', color: '#a6126a' },

	// pr
	{ id: 'mr', group: 'pr', name: '未来', color: '#D96478' },
	{ id: 'sy', group: 'pr', name: '紗代子', color: '#7B6674' },
	{ id: 'kt', group: 'pr', name: '琴葉', color: '#9FCDBC' },
	{ id: 'ar', group: 'pr', name: '亜利沙', color: '#A84B62' },
	{ id: 'kn', group: 'pr', name: '可奈', color: '#EAAF53' },
	{ id: 'er', group: 'pr', name: 'エミリー', color: '#52436E' },
	{ id: 'um', group: 'pr', name: '海美', color: '#DA799A' },
	{ id: 'mn', group: 'pr', name: '美奈子', color: '#6AA5D7' },
	{ id: 'nr', group: 'pr', name: 'のり子', color: '#ECEA82' },
	{ id: 'no', group: 'pr', name: '奈緒', color: '#7C8BC1' },
	{ id: 'mt', group: 'pr', name: 'まつり', color: '#75BDB6' },
	{ id: 'ik', group: 'pr', name: '育', color: '#F4E799' },
	{ id: 'yr', group: 'pr', name: '百合子', color: '#C4B853' },

	// fa
	{ id: 'jr', group: 'fa', name: 'ジュリア', color: '#C64661' },
	{ id: 'tk', group: 'fa', name: '朋花', color: '#C5E2E2' },
	{ id: 'sz', group: 'fa', name: '静香', color: '#6F95CA' },
	{ id: 'sb', group: 'fa', name: '昴', color: '#AFB49E' },
	{ id: 'ay', group: 'fa', name: '歩', color: '#D26499' },
	{ id: 'mz', group: 'fa', name: '瑞希', color: '#9FB6BB' },
	{ id: 'ro', group: 'fa', name: '莉緒', color: '#E49994' },
	{ id: 'sh', group: 'fa', name: '志保', color: '#ADA592' },
	{ id: 'mk', group: 'fa', name: '桃子', color: '#E6B971' },
	{ id: 'em', group: 'fa', name: '恵美', color: '#454341' },
	{ id: 'cz', group: 'fa', name: '千鶴', color: '#E49863' },
	{ id: 'rk', group: 'fa', name: 'ロコ', color: '#FCF062' },
	{ id: 'tg', group: 'fa', name: '紬', color: '#D9CCE5' },

	// an
	{ id: 'hn', group: 'an', name: 'ひなた', color: '#C64661' },
	{ id: 'sr', group: 'an', name: '星梨花', color: '#C5E2E2' },
	{ id: 'an', group: 'an', name: '杏奈', color: '#6F95CA' },
	{ id: 'tm', group: 'an', name: '環', color: '#AFB49E' },
	{ id: 'ri', group: 'an', name: '麗花', color: '#D26499' },
	{ id: 'el', group: 'an', name: 'エレナ', color: '#9FB6BB' },
	{ id: 'ak', group: 'an', name: '茜', color: '#E49994' },
	{ id: 'km', group: 'an', name: 'このみ', color: '#ADA592' },
	{ id: 'tb', group: 'an', name: '翼', color: '#E6B971' },
	{ id: 'kl', group: 'an', name: '可憐', color: '#454341' },
	{ id: 'hk', group: 'an', name: '風花', color: '#E49863' },
	{ id: 'my', group: 'an', name: '美也', color: '#FCF062' },
	{ id: 'ko', group: 'an', name: '歌織', color: '#D9CCE5' },
]

console.log(getIdles('ラスト・アクトレス'))
