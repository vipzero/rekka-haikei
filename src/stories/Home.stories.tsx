import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { ComponentProps } from 'react'
import { RecoilRoot } from 'recoil'
import { defaultValue as setting, settingState } from '../atom/SettingAtom'
import Home from '../components/Home'
import { eekeys } from '../components/Home/Cvote/constants'
import { GlobalStyle } from '../config/init'
import { Setting } from '../types'

type Props = ComponentProps<typeof Home> & { setting: Setting }

const HomeRecoil = ({ setting, ...props }: Props) => {
	return (
		<RecoilRoot
			initializeState={({ set }) => {
				set(settingState, setting)
			}}
		>
			<Home {...props} />
		</RecoilRoot>
	)
}

const song = {
	imageSearchWord: '普通の女子校生が【ろこどる】やってみた。',
	writer: '滝澤俊輔(TRYTONELABO)',
	artist: '宇佐美奈々子(CV.伊藤美来)・小日向縁(CV.三澤紗千香)',
	arranger: '滝澤俊輔',
	composer: '桜アス恵',
	animeTitle: '普通の女子校生が【ろこどる】やってみた。',
	title: '流川ガールズソング ',
	imageLinks: [
		'https://cs1.anime.dmkt-sp.jp/anime_kv/img/11/37/1/11371_1_9_8b.png?1551176652000',
	],
	icy: '宇佐美奈々子(CV.伊藤美来)・小日向縁(CV.三澤紗千香) - 流川ガールズソング ',
	singer: '宇佐美奈々子(伊藤美来)/小日向縁(三澤紗千香)',
	time: 1641221903552,
	wordCounts: { 三澤紗千香: 4, 伊藤美来: 23, 宇佐美奈々子: 4, 小日向縁: 4 },
	wordCountsAna: [
		{ count: 1, label: '[流川ガールズソング  (初)]', name: '流川ガールズ' },
		{ count: 4, label: '[三澤紗千香 (4回目)]', name: '三澤紗千香' },
		{ count: 4, label: '[宇佐美奈々子 (4回目)]', name: '宇佐美奈々子' },
		{ count: 4, label: '[小日向縁 (4回目)]', name: '小日向縁' },
		{ count: 23, label: '[伊藤美来 (23回目)]', name: '伊藤美来' },
	],
}

export default {
	title: 'Home',
	component: Home,
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
				{s()}
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
	args: {
		song,
	},
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
