import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import Home from '../components/Home'
import { EeSelector } from '../components/Home/EeSelector'
import { GlobalStyle } from '../config/init'

export default {
	title: 'EeSelector',
	component: EeSelector,
	decorators: [
		(s) => (
			<>
				<GlobalStyle />
				{s()}
			</>
		),
	],
	parameters: {},
} as ComponentMeta<typeof Home>
type Story = ComponentStoryObj<typeof EeSelector>

export const Full: Story = {
	parameters: { consoles: { hideNoControlsWarning: true } },
	args: {
		comps: {
			mia: true, // old
			sakura: 1,
			steinsgate: 2,
		},
		eeKey: 'flip',
	},
}
