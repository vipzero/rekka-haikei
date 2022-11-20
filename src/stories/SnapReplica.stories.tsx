import { ComponentMeta, ComponentStory } from '@storybook/react'
import { range } from 'lodash'
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

const Cols = {}

range(24).forEach((v) => {
	const Col = Template.bind({})
	Col.args = {
		snap: { ...snaps[1], animeTitle: `${v}時`, time: (v - 9) * 60 * 60 * 1000 },
	}
	Cols[`Hour${v}`] = Col
})

export const Cols0 = Cols['Hour0']
export const Cols3 = Cols['Hour3']
export const Cols6 = Cols['Hour6']
export const Cols9 = Cols['Hour9']
export const Cols12 = Cols['Hour12']
export const Cols15 = Cols['Hour15']
export const Cols18 = Cols['Hour18']
export const Cols21 = Cols['Hour21']

// export const Col1 = Template.bind({})
// Col1.args = {
// 	snap: { ...snaps[1], time: 0 },
// }
