const { NODE_ENV } = process.env

const isDev = NODE_ENV === 'development'

const config = {
	isDev,
}

export default config
