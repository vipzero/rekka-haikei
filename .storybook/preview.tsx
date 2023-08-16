import React from 'react'
import { GlobalStyle } from '../src/config/init'

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
}
export const decorators = [
	(Story) => (
		<>
			<GlobalStyle />
			<Story />
		</>
	),
]

export default preview
