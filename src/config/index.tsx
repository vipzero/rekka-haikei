import { Event, Theme } from '../types'

const { NODE_ENV } = process.env

const isDev = NODE_ENV === 'development'

export const events: Event[] = [
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

export default config
