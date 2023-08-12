import { Meta, StoryFn } from '@storybook/react'
import range from 'lodash/range'
import { SnapReplica } from '../components/BookPage/SnapReplica'
import { GlobalStyle } from '../config/init'
import { snaps } from './seed'

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
} as Meta<typeof SnapReplica>

export const Snap1 = {
	args: {
		snap: snaps[0],
	},
}

export const Snap2 = {
	args: {
		snap: snaps[1],
	},
}

const Cols: Record<string, unknown> = {}
const min = 60 * 1000
const hour = 60 * min
const day = 24 * hour

range(24).forEach((v) => {
	Cols[`Hour${v}`] = {
		args: {
			snap: { ...snaps[1], animeTitle: `${v}時`, time: (v - 9) * hour },
		},
	}
})

range(7).forEach((v) => {
	const time = (v + 3) * day
	Cols[`Day${v}`] = {
		args: {
			snap: { ...snaps[1], animeTitle: `${v}曜`, time },
		},
	}
	Cols[`Day${v}Ni`] = {
		args: {
			snap: { ...snaps[1], animeTitle: `${v}曜`, time: time + 12 * hour },
		},
	}
})

range(10).forEach((v) => {
	Cols[`Min${v}`] = {
		args: {
			snap: { ...snaps[0], animeTitle: `${v}Min`, time: v * min },
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
	Day0Ni,
	Day1,
	Day1Ni,
	Day2,
	Day2Ni,
	Day3,
	Day3Ni,
	Day4,
	Day4Ni,
	Day5,
	Day5Ni,
	Day6,
	Day6Ni,
	Min0,
	Min1,
	Min2,
	Min3,
	Min4,
	Min5,
	Min6,
	Min7,
} = Cols

// export const Col1 = Template.bind({})
// Col1.args = {
// 	snap: { ...snaps[1], time: 0 },
// }
