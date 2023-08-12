import { Meta, StoryFn } from '@storybook/react'
import TrackTimeBar from '../components/Home/TrackTimeBar'
import { GlobalStyle } from '../config/init'

export default {
	title: 'TrackTimeBar',
	component: TrackTimeBar,
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
} as Meta<typeof TrackTimeBar>

export const Full = {
	args: {
		startTime: +Date.now(),
		size: 100000,
	},
}
