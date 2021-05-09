const { NODE_ENV } = process.env

const isDev = NODE_ENV === 'development'

const config = {
	isDev,
	eventId: '2021gw',
	finishTime: +new Date('2021-05-09T15:00:00.000Z'),
	lastTime: +new Date('2021-05-09T10:00:00.000Z'),
	visibleRecordLimit: 100,
}

export default config
