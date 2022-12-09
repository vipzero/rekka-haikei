import { ComponentMeta, ComponentStory } from '@storybook/react'
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
} as ComponentMeta<typeof TrackTimeBar>

const Template: ComponentStory<typeof TrackTimeBar> = (args) => (
	<TrackTimeBar {...args} />
)

export const Full = Template.bind({})
Full.args = {
	startTime: +Date.now(),
	size: 100000,
}
