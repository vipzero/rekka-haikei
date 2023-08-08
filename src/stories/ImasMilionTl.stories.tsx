import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ImasMilionTl } from '../components/Home/ex/ImasMilionTl'
import { GlobalStyle } from '../config/init'

export default {
	title: 'ImasMilionTl',
	component: ImasMilionTl,
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
} as ComponentMeta<typeof ImasMilionTl>

const Template: ComponentStory<typeof ImasMilionTl> = (args) => (
	<ImasMilionTl {...args} />
)

export const Full = Template.bind({})
Full.args = {
	cd: { MTG: true },
}
