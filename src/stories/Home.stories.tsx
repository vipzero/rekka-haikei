import { Meta } from '@storybook/react'

import { ComponentProps, useEffect } from 'react'
import { defaultSetting } from '../atom/SettingAtom'
import Home from '../components/Home'
import { Eekey, ExThemeKey, eekeys } from '../components/Home/Cvote/constants'
// import { Toast } from '../components/Toast'
import { SvgFilters } from '../config/SvgFilters'
import { useSettings } from '../hooks/useSettings'
import { useLoadedManage, useSongManage } from '../hooks/useSongAtom'
import { Setting } from '../types'
import { seedSong as song } from './seed'

type Props = ComponentProps<typeof Home> & { setting: Setting }

const HomeConnect = ({ setting, ...props }: Props) => {
	const { setSetting } = useSettings()
	const [, setSong] = useSongManage()
	const [, setLoaded] = useLoadedManage()
	useEffect(() => {
		setSetting(setting)
		setSong(song)
		setLoaded(true)
	}, [])
	return <Home {...props} />
}

export default {
	title: 'Home',
	component: HomeConnect,
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
				<SvgFilters />
				{/* <Toast /> */}

				<div style={{}}>{s()}</div>
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
} as Meta<typeof HomeConnect>

export const Full = {
	args: {},
}
const eeArgs = (eeKey: Eekey) => ({ args: { setting: { eeKey } } })

export const Lain = eeArgs('lain')
export const Yojitsu = eeArgs('yojitsu')
export const SteinsGate = eeArgs('steinsgate')
export const Shadow = eeArgs('susu')
export const Kokaku = eeArgs('kokaku')
export const Psychopass = eeArgs('psychopass')
export const Patema = eeArgs('sakasa')
export const Sao = eeArgs('sao')
export const Flip = eeArgs('flip')
export const Aria = eeArgs('ariascarlet')
export const Shiki = eeArgs('subetef')
export const Parapara = eeArgs('parapara')
export const Bkbk = eeArgs('bkbk')
export const Mts10A = {
	args: {
		setting: {
			...defaultSetting,
			eeKey: 'mts10',
			eeMemo: {
				mts10: '11000:MTG:AAAAAAAAAAAAAAAAAA==,AAAAAAAAAAAAAAAAAA==',
			},
		},
	},
}

export const Mts10B = {
	args: {
		setting: {
			...defaultSetting,
			eeKey: 'mts10',
			eeMemo: {
				mts10: '01010:MTG:AAAAAAAAAAAAAAAAAA==,AAAAAAAAAAAAAAAAAA==',
			},
		},
	},
}

export const Masso = eeArgs('masso')
export const Birth = {
	args: {
		setting: {
			...defaultSetting,
			eeKey: 'birth',
			eeMemo: {
				birth: '05/05:nakano nino:五等分の花嫁',
			},
		},
	},
}

const themeArgs = (theme: number | ExThemeKey) => ({
	args: { setting: { ...defaultSetting, theme } },
})

export const ThemeClear = themeArgs(0)
export const ThemeWhite = themeArgs(1)
export const ThemeBlack = themeArgs(2)
export const ThemeCodeGeass = themeArgs('codegeass')
export const ThemeYojitsu = themeArgs('yojitsu')
export const ThemePhycopass = themeArgs('psychopass')
export const ThemeKokaku = themeArgs('kokaku')
export const ThemeLain = themeArgs('lain')
export const ThemeChoco = themeArgs('choco')
export const ThemeCyber = themeArgs('cyberpunk')
export const ThemeDiy = themeArgs('diy')
