import { Meta, StoryFn } from '@storybook/react'
import { Masso } from '../components/Home/ex/Masso'
import { GlobalStyle } from '../config/init'

export default {
	title: 'Masso',
	component: Masso,
	argTypes: {},
	decorators: [
		(s) => (
			<>
				<GlobalStyle />
				{s()}
			</>
		),
	],
	parameters: {},
	args: {},
} as Meta<typeof Masso>

export const Full = {
	args: {
		seed: 0,
	},
}

export const Half = {
	args: {
		seed: 100,
	},
}
