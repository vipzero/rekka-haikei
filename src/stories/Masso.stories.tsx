import { Meta } from '@storybook/react'
import { Masso } from '../components/Home/ex/Masso'

export default { title: 'Masso', component: Masso } as Meta<typeof Masso>

export const Full = {
	args: {
		seed: 0,
	},
}

export const Half = {
	args: {
		seed: 100,
	},
}
