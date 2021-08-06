/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images')
const withPWA = require('next-pwa')

module.exports = withPWA(
	withImages({
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
			// runtimeCaching: []
		},
	})
)
