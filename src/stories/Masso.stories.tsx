import { ComponentMeta, ComponentStory } from '@storybook/react'
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
} as ComponentMeta<typeof Masso>

const Template: ComponentStory<typeof Masso> = (args) => <Masso {...args} />

export const Full = Template.bind({})
Full.args = {
	seed: 0,
}

export const Half = Template.bind({})
Half.args = {
	seed: 100,
}
