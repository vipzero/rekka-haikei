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

export const Snap2 = {
	args: {
		snap: snaps[1],
	},
}

const Cols: Record<string, unknown> = {}
const hour = 60 * 60 * 1000
const day = 24 * hour

range(24).forEach((v) => {
	Cols[`Hour${v}`] = {
		args: {
			snap: { ...snaps[1], animeTitle: `${v}時`, time: (v - 9) * hour },
		},
	}
})

range(7).forEach((v) => {
	Cols[`Day${v}`] = {
		args: {
			snap: { ...snaps[1], animeTitle: `${v}曜`, time: (v + 3) * day },
		},
	}
})

export const {
	Hour0,
	Hour3,
	Hour6,
	Hour9,
	Hour12,
	Hour15,
	Hour18,
	Hour21,
	Day0,
	Day1,
	Day2,
	Day3,
	Day4,
	Day5,
	Day6,
} = Cols

// export const Col1 = Template.bind({})
// Col1.args = {
// 	snap: { ...snaps[1], time: 0 },
// }
