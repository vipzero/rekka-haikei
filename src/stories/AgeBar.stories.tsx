import { Meta, StoryObj } from '@storybook/react'
import { AgeBar } from '../components/Home/AgeBar'

export default {
	title: 'AgeBar',
	component: AgeBar,
	decorators: [
		(s) => (
			<div
				style={{
					width: '400px',
				}}
			>
				{s()}
			</div>
		),
	],
} as Meta<typeof AgeBar>

type Story = StoryObj<typeof AgeBar>

export const Recent: Story = { args: { y: 0, m: 4 } }
export const Ago10: Story = { args: { y: 11, m: 4 } }
export const Ago20: Story = { args: { y: 24, m: 4 } }
