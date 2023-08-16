import { Meta } from '@storybook/react'
import TrackTimeBitBar from '../components/Home/TrackTimeBitBar'

export default { title: 'TrackTimeBitBar', component: TrackTimeBitBar } as Meta<
	typeof TrackTimeBitBar
>

export const Full = {
	args: {
		startTime: +Date.now(),
		size: 100000,
	},
}
