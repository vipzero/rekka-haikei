import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Meta, StoryFn } from '@storybook/react'
import { GlobalStyle, SubPageTheme } from '../config/init'

const Button = (props) => <button {...props} />

export default {
	title: 'Button',
	component: Button,
	argTypes: {},
	decorators: [
		(s) => (
			<>
				<GlobalStyle />
				<SubPageTheme />
				{s()}
			</>
		),
	],
	parameters: {},
	args: {},
} as Meta<typeof Button>

const TemplateIcon: StoryFn<typeof Button> = (args) => (
	<Button {...args}>
		<FontAwesomeIcon icon={faCopy} />
	</Button>
)

export const Button1 = {
	args: { children: 'button' },
}

export const CopyButton = {
	render: TemplateIcon,
}

export const Disabled = {
	args: { disabled: true, children: 'disabled' },
}
