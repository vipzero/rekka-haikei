import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Home from '../components/Home'

export default {
	title: 'Home',
	component: Home,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	decorators: [(storyFn) => <RecoilRoot>{storyFn()}</RecoilRoot>],
} as ComponentMeta<typeof Home>

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />

export const Full = Template.bind({})
Full.args = {
	song: {
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
	},
	extraComp: null,
}

export const Half = Template.bind({})
Half.args = {
	// label: 'Button',
}
