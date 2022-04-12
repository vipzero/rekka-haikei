const withImages = require('next-images')
// const withPWA = require('next-pwa')
// const isProduction = process.env.NODE_ENV === 'production'
const withTM = require('next-transpile-modules')
const runtimeCaching = require('next-pwa/cache')

const transpileModules = [
	'@fortawesome/free-regular-svg-icons',
	'@fortawesome/free-solid-svg-icons',
]

const opt = {
	webpack(config) {
		config.module.rules.push({
			test: /\.(png|jpeg|jpg|gif|svg)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 100000,
				},
			},
		})

		return config
	},
	pwa: {
		dest: 'public',
		runtimeCaching,
		disable: process.env.NODE_ENV === 'development',
		register: true,
	},
	transpileModules,
}
//
//
const config = withTM(transpileModules)(withImages(opt))

module.exports = config
