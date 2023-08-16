import { Meta } from '@storybook/react'
import { Trump } from '../components/Home/ex/Trump'

export default {
	title: 'Trump',
	component: Trump,
} as Meta<typeof Trump>

export const Full = {
	args: {
		opens: [true, true, true, true, true],
	},
}

export const Half = {
	args: {
		opens: [false, true, false, false, true],
	},
}

export const None = {
	args: {
		opens: [false, false, false, false, false],
	},
}
