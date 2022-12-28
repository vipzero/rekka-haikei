const webpack = require('webpack')

module.exports = {
	typescript: { reactDocgen: false },
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'storybook-addon-next-router',
	],
	framework: '@storybook/react',
	core: {
		builder: 'webpack5',
	},
	webpackFinal: async (config) => {
		config.plugins = [
			...config.plugins,
			new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
		]

		return config
	},
}
