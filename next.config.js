const withImages = require('next-images')
const withTM = require('next-transpile-modules')
const runtimeCaching = require('next-pwa/cache')

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	runtimeCaching,
	buildExcludes: [/middleware-manifest.json$/],
	disable: process.env.NODE_ENV === 'development',
})

const transpileModules = [
	'@fortawesome/free-regular-svg-icons',
	'@fortawesome/free-solid-svg-icons',
]

const opt = {
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
	// transpileModules,
}

const config = withPWA(withImages(opt))

module.exports = config
