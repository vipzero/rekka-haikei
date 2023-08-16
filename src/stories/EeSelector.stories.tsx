import { Meta, StoryObj } from '@storybook/react'
import { EeSelector } from '../components/Home/EeSelector'
import { GlobalStyle } from '../config/init'

export default {
	title: 'EeSelector',
	component: EeSelector,
	parameters: {},
} as Meta<typeof EeSelector>
type Story = StoryObj<typeof EeSelector>

export const Full: Story = {
	parameters: { consoles: { hideNoControlsWarning: true } },
	args: {
		comps: {
			mia: 1, // old
			sakura: 1,
			steinsgate: 2,
		},
		eeKey: 'flip',
	},
}
