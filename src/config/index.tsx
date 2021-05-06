const { NODE_ENV } = process.env

const isDev = NODE_ENV === 'development'

const config = {
	isDev,
	eventId: '2021gw',
	visibleRecordLimit: 100,
}

export default config
