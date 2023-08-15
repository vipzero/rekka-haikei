import { Meta } from '@storybook/react'
import TrackTimeBitBar from '../components/Home/TrackTimeBitBar'
import { GlobalStyle } from '../config/init'

export default {
	title: 'TrackTimeBitBar',
	component: TrackTimeBitBar,
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
} as Meta<typeof TrackTimeBitBar>

export const Full = {
	args: {
		startTime: +Date.now(),
		size: 100000,
	},
}
