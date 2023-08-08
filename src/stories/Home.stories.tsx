import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ComponentProps, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { defaultSetting as setting } from '../atom/SettingAtom'
import Home from '../components/Home'
import { eekeys } from '../components/Home/Cvote/constants'
// import { Toast } from '../components/Toast'
import { GlobalStyle } from '../config/init'
import { SvgFilters } from '../config/SvgFilters'
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
				<link rel="stylesheet" href="https://unpkg.com/open-props" />

				<link
					rel="stylesheet"
					href="https://unpkg.com/open-props/animations.min.css"
				/>
				<GlobalStyle />
				<SvgFilters />
				{/* <Toast /> */}
				<RecoilRoot>
					<div style={{}}>{s()}</div>
				</RecoilRoot>
			</>
		),
	],
	parameters: {
		layout: 'fullscreen',
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

export const Shadow = Template.bind({})
Shadow.args = { setting: { ...setting, eeKey: 'susu' } }

export const Toaru = Template.bind({})
Toaru.args = { setting: { ...setting, eeKey: 'toaru' } }

export const Kokaku = Template.bind({})
Kokaku.args = { setting: { ...setting, eeKey: 'kokaku' } }

export const Psychopass = Template.bind({})

Psychopass.args = { setting: { ...setting, eeKey: 'psychopass' } }

export const Patema = Template.bind({})

Patema.args = { setting: { ...setting, eeKey: 'sakasa' } }

export const Sao = Template.bind({})

Sao.args = { setting: { ...setting, eeKey: 'sao' } }

export const Flip = Template.bind({})

Flip.args = { setting: { ...setting, eeKey: 'flip' } }

export const Aria = Template.bind({})

Aria.args = { setting: { ...setting, eeKey: 'ariascarlet' } }

// export const Shani = Template.bind({})
// Shani.args = { setting: { ...setting, eeKey: 'shanimas' } }

// export const Delemas = Template.bind({})
// Delemas.args = { setting: { ...setting, eeKey: 'imascd' } }

export const Shiki = Template.bind({})
Shiki.args = { setting: { ...setting, eeKey: 'subetef' } }

export const Mts10 = Template.bind({})
Mts10.args = {
	setting: {
		...setting,
		eeKey: 'mts10',
		eeOpt: { id: 'text', s: '10101:MTG' },
	},
}

export const ThemeClear = Template.bind({})
ThemeClear.args = { setting: { ...setting, theme: 0 } }

export const ThemeWhite = Template.bind({})

ThemeWhite.args = { setting: { ...setting, theme: 1 } }

export const ThemeBlack = Template.bind({})
ThemeBlack.args = { setting: { ...setting, theme: 2 } }

export const ThemeEmpty = Template.bind({})
ThemeEmpty.args = { setting: { ...setting, theme: 3 } }

export const ThemeSingl = Template.bind({})
ThemeSingl.args = { setting: { ...setting, theme: 4 } }
