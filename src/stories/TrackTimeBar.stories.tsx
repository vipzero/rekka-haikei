import { Meta } from '@storybook/react'
import TrackTimeBar from '../components/Home/TrackTimeBar'

export default {
	title: 'TrackTimeBar',
	component: TrackTimeBar,
} as Meta<typeof TrackTimeBar>

export const Full = {
	args: {
		startTime: +Date.now(),
		size: 100000,
	},
}
