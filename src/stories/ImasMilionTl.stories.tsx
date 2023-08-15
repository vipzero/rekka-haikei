import { Meta } from '@storybook/react'
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
} as Meta<typeof ImasMilionTl>

export const Full = {
	args: {
		cd: { MTG: true },
	},
}
