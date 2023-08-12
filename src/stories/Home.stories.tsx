import { Meta } from '@storybook/react'

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
} as Meta<typeof HomeRecoil>

export const Full = {
	args: {
		song,
		setting,
	},
}

export const Lain = {
	args: { setting: { ...setting, eeKey: 'lain' } },
}

export const SteinsGate = {
	args: { setting: { ...setting, eeKey: 'steinsgate' } },
}

export const Shadow = {
	args: { setting: { ...setting, eeKey: 'susu' } },
}

export const Kokaku = {
	args: { setting: { ...setting, eeKey: 'kokaku' } },
}

export const Psychopass = {
	args: { setting: { ...setting, eeKey: 'psychopass' } },
}

export const Patema = {
	args: { setting: { ...setting, eeKey: 'sakasa' } },
}

export const Sao = {
	args: { setting: { ...setting, eeKey: 'sao' } },
}

export const Flip = {
	args: { setting: { ...setting, eeKey: 'flip' } },
}

export const Aria = {
	args: { setting: { ...setting, eeKey: 'ariascarlet' } },
}

export const Shiki = {
	args: { setting: { ...setting, eeKey: 'subetef' } },
}

export const Parapara = {
	args: { setting: { ...setting, eeKey: 'parapara' } },
}

export const Mts10 = {
	args: {
		setting: {
			...setting,
			eeKey: 'mts10',
			eeOpt: { id: 'text', s: '10101:MTG' },
		},
	},
}

export const Masso = {
	args: { setting: { ...setting, eeKey: 'masso' } },
}

export const ThemeClear = {
	args: { setting: { ...setting, theme: 0 } },
}

export const ThemeWhite = {
	args: { setting: { ...setting, theme: 1 } },
}

export const ThemeBlack = {
	args: { setting: { ...setting, theme: 2 } },
}

export const ThemeEmpty = {
	args: { setting: { ...setting, theme: 3 } },
}

export const ThemeSingl = {
	args: { setting: { ...setting, theme: 4 } },
}
