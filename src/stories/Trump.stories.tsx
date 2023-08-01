import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Trump } from '../components/Home/ex/Trump'
import { GlobalStyle } from '../config/init'

export default {
	title: 'Trump',
	component: Trump,
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
} as ComponentMeta<typeof Trump>

const Template: ComponentStory<typeof Trump> = (args) => <Trump {...args} />

export const Full = Template.bind({})
Full.args = {
	opens: [true, true, true, true, true],
}

export const Half = Template.bind({})
Half.args = {
	opens: [false, true, false, false, true],
}
