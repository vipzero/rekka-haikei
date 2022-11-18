import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ComponentProps } from 'react'
import { SnapReplica } from '../components/BookPage/SnapReplica'
import { GlobalStyle } from '../config/init'
import { Setting } from '../types'
import { snaps } from './seed'

type Props = ComponentProps<typeof SnapReplica> & { setting: Setting }

export default {
	title: 'SnapReplica',
	component: SnapReplica,
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
} as ComponentMeta<typeof SnapReplica>

const Template: ComponentStory<typeof SnapReplica> = (args) => (
	<SnapReplica {...args} />
)

export const Snap1 = Template.bind({})
Snap1.args = {
	snap: snaps[0],
}

export const Snap2 = Template.bind({})
Snap2.args = {
	snap: snaps[1],
}
