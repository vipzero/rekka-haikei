import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { ComponentProps, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { defaultSetting as setting, settingState } from '../atom/SettingAtom'
import Home from '../components/Home'
import { eekeys } from '../components/Home/Cvote/constants'
import { GlobalStyle } from '../config/init'
import { useSettings } from '../hooks/useSettings'
import { Setting } from '../types'
import { seedSong as song } from './seed'

type Props = ComponentProps<typeof Home> & { setting: Setting }

const HomeRecoil = ({ setting, ...props }: Props) => {
	const { setSetting } = useSettings()
	useEffect(() => {
		setSetting(setting)
	}, [])
	return <Home {...props} />
}

export default {
	title: 'Home',
	component: HomeRecoil,
	argTypes: {
		['setting.eeKey']: {
			control: {
				type: 'select',
				options: eekeys,
			},
		},
		// backgroundColor: { control: 'color' },
	},
	decorators: [
		(s) => (
			<>
				<GlobalStyle />
				<RecoilRoot>{s()}</RecoilRoot>
			</>
		),
	],
	parameters: {
		nextRouter: {
			path: '/[eid]/bg',
			asPath: '/2000winter/bg',
			query: { id: '2000winter' },
		},
	},
	args: { song },
} as ComponentMeta<typeof Home>

const Template: ComponentStory<typeof HomeRecoil> = (args) => (
	<HomeRecoil {...args} />
)

export const Full = Template.bind({})
Full.args = {
	song,
	setting,
}

export const Lain = Template.bind({})
Lain.args = { setting: { ...setting, eeKey: 'lain' } }

export const SteinsGate = Template.bind({})
SteinsGate.args = { setting: { ...setting, eeKey: 'steinsgate' } }

export const Toaru = Template.bind({})
Toaru.args = { setting: { ...setting, eeKey: 'toaru' } }

export const Kokaku = Template.bind({})
Kokaku.args = { setting: { ...setting, eeKey: 'kokaku' } }

export const Psychopass = Template.bind({})

Psychopass.args = { setting: { ...setting, eeKey: 'psychopass' } }

export const Patema = Template.bind({})

Patema.args = { setting: { ...setting, eeKey: 'patema' } }

export const Sao = Template.bind({})

Sao.args = { setting: { ...setting, eeKey: 'sao' } }

export const Flip = Template.bind({})

Flip.args = { setting: { ...setting, eeKey: 'flip' } }
