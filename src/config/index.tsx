import {
	Eekey,
	EekeyState,
	eekeysThemetic,
} from '../components/Home/Cvote/constants'
import { Event, Shape, ShapeId, Theme, ThemeId } from '../types'

const { NODE_ENV } = process.env

export const isDev = NODE_ENV === 'development'

// update を促したい時に使う
export const featcherVersion = 5

export const events: Event[] = [
	{ id: '2025gw', label: '2025GW', current: true },
	// { id: '2024winter_after', label: '2024冬後'},
	{ id: '2024winter', label: '2024冬' },
	{ id: '2024obon', label: '2024盆' },
	{ id: '2024gw', label: '2024GW' },
	{ id: '2023winter', label: '2023冬' },
	{ id: '2023obon', label: '2023盆' },
	{ id: '2023gw', label: '2023GW' },
	{ id: '2022winter', label: '2022冬' },
	{ id: '2022silver', label: '2022SW' },
	{ id: '2022obon', label: '2022盆' },
	{ id: '2022gw', label: '2022GW' },
	{ id: '2021winter', label: '2021冬' },
	{ id: '2021obon', label: '2021盆' },
	{ id: '2021gw', label: '2021GW' },
	{ id: '2020nematu', label: '2020冬' },
]

export const EE_CHAR: Record<number, string> = {
	0: '.',
	1: '*',
	2: '#',
	3: '/',
	4: '!',
	5: '❆',
	6: '✿',
	7: '𖣖',
	8: '𖥑',
	9: '✦',
	// 10: '𖧼',
}
export const EE_SEASON = Number(Object.keys(EE_CHAR).pop())

export const currentEvent = events.find((v) => v.current)
export const storageKeys = {
	setting: 'setting',
	streamUrl: 'stream-url',
	snaps: 'snaps',
}

const config = {
	isDev,
	eventId: process.env.EVENT_ID || events[0].id,
	visibleRecordLimit: 100,
}

export const normalThemes: Theme[] = [
	{ id: 0, key: 'CLEAR' },
	{ id: 1, key: 'WHITE' },
	{ id: 2, key: 'BLACK' },
	// { id: 3, key: 'EMPTY' },
	// { id: 4, key: 'SINGL' },
	{ id: 5, key: 'CUSTM' },
]

export type ExTheme = Theme & { id: (typeof eekeysThemetic)[number] }
export const extThemes: ExTheme[] = [
	{ id: 'kokaku', key: 'KOKAK' },
	{ id: 'lain', key: 'LAIN_' },
	{ id: 'psychopass', key: 'PSYCH' },
	{ id: 'codegeass', key: 'CODEG' },
	{ id: 'yojitsu', key: 'ID___' },
	{ id: 'choco', key: 'CHOCO' },
	{ id: 'cyberpunk', key: 'CYBPK' },
	{ id: 'diy', key: 'DOITY' },
]
export const isExtTheme = (s: Eekey) => extThemes.some((v) => v.id === s)
export const decideTheme = (s: ThemeId, eeKey: EekeyState) =>
	eeKey && isExtTheme(eeKey) ? eeKey : s
export const allThemes: Theme[] = [...normalThemes, ...extThemes]
export const allThemesById = allThemes.reduce(
	(p, c) => ({ ...p, [c.id]: c }),
	{} as Record<ThemeId, Theme>
)

export const shapes: Shape[] = [
	{ id: 0, key: 'BASIC' },
	{ id: 1, key: 'SHARP' },
	{ id: 2, key: 'SINGL', detailOptLock: true },
	{ id: 3, key: 'EMPTY', detailOptLock: true },
]
export const allShapes = shapes
export const allShapesById = allShapes.reduce(
	(p, c) => ({ ...p, [c.id]: c }),
	{} as Record<ShapeId, Shape>
)

const white = '#fff'
const black = '#000'
const gray = '#888'
const pink = '#fde'
const red = '#f00'

const abyssList = [white, black, gray, pink, red] as const
export type Abyss = (typeof abyssList)[number]

const abyssListConf: Abyss[] = [white, black, gray]
// const abyssListEx: Abyss[] = [pink, red]

type AbyssColor = { label: string; color: Abyss }
const abyssColorsList: AbyssColor[] = [
	{ label: '白', color: white },
	{ label: '黒', color: black },
	{ label: '灰', color: gray },
]
const abyssColorsExList: AbyssColor[] = [
	...abyssColorsList,
	{ label: '血', color: red },
	{ label: '桜', color: pink },
]

const keyBy = (obj: AbyssColor[]): Record<Abyss, AbyssColor> =>
	obj.reduce(
		(p, c) => ({ ...p, [c.color]: c }),
		{} as Record<Abyss, AbyssColor>
	)

export const abyssColors = keyBy(abyssColorsList)
export const abyssColorsEx = keyBy(abyssColorsExList)

const nextI = <T,>(a: T[], v: T): T => a[(a.indexOf(v) + 1) % a.length]
export const nextAbyss = (abyss: Abyss): Abyss => nextI(abyssListConf, abyss)

export const sugarOn = Boolean(Number(process.env.NEXT_PUBLIC_SUGAR_ON))

export default config

const CA = '#A9E1EF' // 8, 9, 10, 11, 12, 13, 14, 15
const CB = '#C4633D' // 6, 7
const CC = '#713979' // 4, 5
const CD = '#132A63' // 0, 1, 2, 3

// prettier-ignore
export const timeColorMap = [
	CD, // 0h
	CD,
	CD,
	CD, // 3h
	CC, //  4h
	CC, //  5h
	CB, //   6h
	CB, //   7h
	CA, //    8h
	CA,
	CA,
	CA,
	CA,
	CA,
	CA,
	CA, //    15h
	CB, //   16h
	CB, //   17h
	CC, //  18h
	CC, //  19h
	CD, // 20h
	CD,
	CD,
	CD,
	CD, // 24h // 念の為
]

export const URL_MAKE_SEARCH_CODE =
	'https://github.com/vipzero/haikei-server/blob/main/src/utils/makeSearchWord.ts'

export const URL_GITHUB_REPO_URL = 'https://github.com/vipzero/rekka-haikei'

export const URL_TOHYO_REQ = 'https://forms.gle/SqABcPbFsTTpRsuR7'
export const URL_USE_REQ = 'https://forms.gle/fBQnrAxMnKNhmFA16'
export const URL_FEAT_REQ =
	'https://docs.google.com/forms/d/e/1FAIpQLSfVQE9W3DFNPG03x3rJumLAGZfQsuFpxJP2vTDg4g0ddU3V-w/viewform'

export const TMP_TRACK_TIME = 4 * 60 * 1000
