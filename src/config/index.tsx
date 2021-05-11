import { Theme } from '../types'

const { NODE_ENV } = process.env

const isDev = NODE_ENV === 'development'

const config = {
	isDev,
	eventId: '2021gw',
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
