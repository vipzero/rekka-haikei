import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ImasBoard } from '../components/Home/ex/ImasBoard'
import { GlobalStyle } from '../config/init'

export default {
	title: 'ImasBoard',
	component: ImasBoard,
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
} as ComponentMeta<typeof ImasBoard>

const Template: ComponentStory<typeof ImasBoard> = (args) => (
	<ImasBoard {...args} />
)

export const Full = Template.bind({})
Full.args = {
	bools: [
		[true, true, true, true, true],
		Array(150).fill(false),
		[false, true],
		Array(150).fill(false),
	],
}
