/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images')
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
			return config
		},
	})
)
