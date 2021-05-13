/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images')
const webpack = require('webpack')

require('dotenv')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
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
			const env = Object.keys(process.env).reduce((acc, curr) => {
				acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
				return acc
			}, {})

			config.plugins.push(new webpack.DefinePlugin(env))
			return config
		},
		async rewrites() {
			return [{ source: '/:eid/:path*', destination: `/:path*?eid=:eid` }]
		},
	})
)
