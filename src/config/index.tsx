import { Event, Theme } from '../types'

const { NODE_ENV } = process.env

const isDev = NODE_ENV === 'development'

export const events: Event[] = [
	{ id: '2021obon', label: '2021盆', current: true },
	// { id: 'christmashimanaraunnun', label: 'クリスマス暇なら云々' },
	// { id: '2021obon_pre', label: '2021盆pre' },
	{ id: '2021gw', label: '2021GW' },
	{ id: '2020nematu', label: '2020冬' },
]

const config = {
	isDev,
	eventId: process.env.EVENT_ID || events[0].id,
	finishTime: +new Date('2021-08-16T15:00:00.000Z'),
	lastTime: +new Date('2021-08-16T10:00:00.000Z'),
	visibleRecordLimit: 100,
}

export const themes: Theme[] = [
	{ id: 0, key: 'CLEAR' },
	{ id: 1, key: 'WHITE' },
	{ id: 2, key: 'BLACK' },
	{ id: 3, key: 'EMPTY' },
	{ id: 4, key: 'SINGL' },
]

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
