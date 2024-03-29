import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Meta, StoryObj } from '@storybook/react'

const Button = (props) => <button {...props} />

const meta = {
	title: 'Button',
	component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof Button>

export const Button1: Story = {
	args: { children: 'button' },
}

export const CopyButton: Story = {
	render: () => (
		<Button>
			<FontAwesomeIcon icon={faCopy} />
		</Button>
	),
}

export const Disabled: Story = {
	args: { disabled: true, children: 'disabled' },
}
