import { faCompactDisc } from '@fortawesome/free-solid-svg-icons'
import { Meta, StoryObj } from '@storybook/react'
import { ConfButton } from '../components/Home/ConfButton'

const meta = {
	title: 'ConfButton',
	component: ConfButton,
} satisfies Meta<typeof ConfButton>

export default meta

type Story = StoryObj<typeof ConfButton>

export const Base: Story = {
	args: {
		helpText: 'デバッグ',
		icon: faCompactDisc,
		checked: false,
		onClick: () => {},
		showToggleIcon: true,
		disabled: false,
	},
}
