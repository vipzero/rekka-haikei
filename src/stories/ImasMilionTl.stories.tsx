import { Meta } from '@storybook/react'
import { ImasMilionTl } from '../components/Home/ex/ImasMilionTl'

export default {
	title: 'ImasMilionTl',
	component: ImasMilionTl,
} as Meta<typeof ImasMilionTl>

export const Full = {
	args: {
		cd: { MTG: true },
	},
}
