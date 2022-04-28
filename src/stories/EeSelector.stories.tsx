import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { ComponentProps } from 'react'
import { RecoilRoot } from 'recoil'
import { defaultSetting as setting, settingState } from '../atom/SettingAtom'
import Home from '../components/Home'
import { eekeys } from '../components/Home/Cvote/constants'
import { EeSelector } from '../components/Home/EeSelector'
import { GlobalStyle } from '../config/init'
import { Setting } from '../types'

type Props = ComponentProps<typeof Home> & { setting: Setting }

export default {
	title: 'EeSelector',
	component: EeSelector,
	argTypes: {
		['setting.eeKey']: {
			control: {
				type: 'select',
				options: eekeys,
			},
		},
	},
	decorators: [
		(s) => (
			<>
				<GlobalStyle />
				<RecoilRoot
					initializeState={({ set }) => {
						set(settingState, {
							...setting,
							ee: {
								[eekeys[0]]: true,
								[eekeys[2]]: true,
								[eekeys[4]]: true,
							},
						})
					}}
				>
					{s()}
				</RecoilRoot>
			</>
		),
	],
	parameters: {},
	args: {},
} as ComponentMeta<typeof Home>

const Template: ComponentStory<typeof EeSelector> = (args) => (
	<EeSelector {...args} />
)

export const Full = Template.bind({})
Full.args = {}
