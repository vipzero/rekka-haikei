import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { range } from 'lodash'
import { ComponentProps } from 'react'
import { GlobalStyle, SubPageTheme } from '../config/init'
import { Setting } from '../types'
import { snaps } from './seed'

const Button = (props) => <button {...props} />

type Props = ComponentProps<typeof Button> & { setting: Setting }

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
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />
const TemplateIcon: ComponentStory<typeof Button> = (args) => (
	<Button {...args}>
		<FontAwesomeIcon icon={faCopy} />
	</Button>
)

export const Button1 = Template.bind({})
Button1.args = { children: 'button' }

export const CopyButton = TemplateIcon.bind({})

export const Disabled = Template.bind({})
Disabled.args = { disabled: true, children: 'disabled' }
