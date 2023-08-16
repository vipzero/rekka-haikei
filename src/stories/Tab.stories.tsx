import { Meta } from '@storybook/react'
import { Tabs } from '../components/common/Tab'

export default { title: 'Tabs', component: Tabs } as Meta<typeof Tabs>

export const Full = {
	args: {
		items: [
			{ label: 'リスト' },
			{ label: '投票' },
			{ label: '結果' },
			{ label: 'ブックマーク' },
		],
	},
}
