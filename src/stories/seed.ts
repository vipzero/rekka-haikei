import { Snap, Song } from '../types'

export const seedSong: Song = {
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
	time: +new Date(),
	trackTimeMillis: 500000,
	wordCounts: { 三澤紗千香: 4, 伊藤美来: 23, 宇佐美奈々子: 4, 小日向縁: 4 },
	wordCountsAna: [
		{ count: 1, label: '[流川ガールズソング  (初)]', name: '流川ガールズ' },
		{ count: 4, label: '[三澤紗千香 (4回目)]', name: '三澤紗千香' },
		{ count: 4, label: '[宇佐美奈々子 (4回目)]', name: '宇佐美奈々子' },
		{ count: 4, label: '[小日向縁 (4回目)]', name: '小日向縁' },
		{ count: 23, label: '[伊藤美来 (23回目)]', name: '伊藤美来' },
	],
	hasMinImg: false,
}

const jam = (s: string) => s.split('').reverse().join('')

export const snaps: Snap[] = [
	{
		animeTitle: 'けものフレンズ',
		url: jam('gpj.tluafedserxam/UNv_BcLdMkx/iv/moc.gmity.i//:sptth'),
		time: 1668749891383,
		words: [
			'ぼくのフレンド(けものフレンズ　ED)',
			'けものフレンズ',
			'ぼくのフレンド',
			'けものフレンズ　ED',
			'みゆはん',
		],
		icy: 'みゆはん - ぼくのフレンド(けものフレンズ　ED)',
	},
	{
		animeTitle: 'となりの吸血鬼さん',
		url: jam(
			'0002899431551?gpj.2d_1_54422/5/44/22/gmi/vk_emina/pj.en.omocod.erotsemina.1sc//:sptth'
		),
		time: 1668750409177,
		words: [
			'和氣あず未',
			'となりの吸血鬼さん',
			'富田美憂',
			'Lynn',
			'ソフィー',
			'天野灯',
			'トワイライト',
			'夏木ひなた',
			'HAPPY!! ストレンジフレンズ',
			'エリー',
			'篠原侑',
		],
		icy: 'ソフィー・トワイライト(CV.富田美憂)、天野灯(CV.篠原侑)、夏木ひなた(CV.Lynn)、エリー(CV.和氣あず未) - HAPPY!! ストレンジフレンズ ',
	},
]
