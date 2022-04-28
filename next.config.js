const withImages = require('next-images')
const withPWA = require('next-pwa')
const withTM = require('next-transpile-modules')
const runtimeCaching = require('next-pwa/cache')

const transpileModules = [
	'@fortawesome/free-regular-svg-icons',
	'@fortawesome/free-solid-svg-icons',
]

const opt = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	// webpack(config) {
	// 	config.module.rules.push({
	// 		test: /\.(png|jpeg|jpg|gif|svg)$/,
	// 		use: {
	// 			loader: 'url-loader',
	// 			options: {
	// 				limit: 100000,
	// 			},
	// 		},
	// 	})

	// 	return config
	// },
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
		runtimeCaching,
		buildExcludes: [/middleware-manifest.json$/],
	},
	// transpileModules,
}

const config = withPWA(withImages(opt))

module.exports = config
