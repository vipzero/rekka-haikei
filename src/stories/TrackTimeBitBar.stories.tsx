import { ComponentMeta, ComponentStory } from '@storybook/react'
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
} as ComponentMeta<typeof TrackTimeBitBar>

const Template: ComponentStory<typeof TrackTimeBitBar> = (args) => (
	<TrackTimeBitBar {...args} />
)

export const Full = Template.bind({})
Full.args = {
	startTime: +Date.now(),
	size: 100000,
}
