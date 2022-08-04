import { createHash } from 'crypto'
import { textNormalize } from '../../../util/serverCodeUtils'
import { libTsv } from './imasSongLib'

const meta = { len: 2, salt: 'WQ' }
const makeHash = (s) => createHash('md5').update(s).digest('base64')
const lib = Object.fromEntries(libTsv)
export const getIdles = (title: string) => {
	const key = makeHash(`${meta.salt}${textNormalize(title)}`).substring(
		0,
		meta.len
	)

	lib[key]?.split('_').map((idle) => charLib[idle])
}

const charLib = {
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
