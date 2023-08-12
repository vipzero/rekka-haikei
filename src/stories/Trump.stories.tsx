import { Meta } from '@storybook/react'
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
