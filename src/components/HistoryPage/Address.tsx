import React from 'react'
import styled from 'styled-components'
import { EventLinks } from '../EventLinks'

const notes: Record<string, string> = {
	'2022-04-30:12': 'styl UI',
	'2022-04-30:00': 'feat ブックマークページ追加',
	'2022-04-29:20': 'styl 背景ハードロック追加',
	'2022-04-29:02': 'styl デバッグパネル',
	'2022-04-29:01': 'feat 回転許可',
	'2022-04-29:00': 'feat アートワーク非表示ボタン',
	'2022-04-26:19': 'feat アプリ化',
	'2022-04-12:19': 'feat 投票表示モード追加(追加分)',
	'2022-04-12:17': 'feat 履歴移動バグ修正',
	'2022-01-01:02': 'feat ホバーでプレイヤー表示',
	'2022-01-01:01': 'feat 人気タグカウント',
	'2021-12-31:02': 'feat 画像検索リンク',
	'2021-12-31:01': 'fixd タグ直接検索修正',
	'2021-12-30:01': 'feat 履歴コピペモード',
	'2021-12-29:00': 'feat ダウンロードボタン',
	'2021-12-27:14': 'feat 歌詞検索リンク',
	'2021-12-27:13': 'styl 検索変更',
	'2021-12-27:11': 'styl ボタン変更',
	'2021-12-26:20': 'feat スケジュールにラベル追加',
	'2021-12-26:19': 'styl ボタン変更・説明追加',
	'2021-08-01:08': 'feat スケジュール絞り込み',
	'2021-08-01:07': 'feat 共同編集スケジュール',
	'2021-08-01:06': 'feat 履歴日没カラー帯',
	'2021-08-01:05': 'feat 複数検索',
	'2021-08-01:04': 'feat フェード色設定',
	'2021-08-01:03': 'feat 背景ロック設定',
	'2021-08-01:02': 'feat 履歴勢いグラフ',
	'2021-08-01:01': 'feat タグ直接検索',
	'2021-08-01:11': 'feat 編曲追加,アートワーク解像度改善',
	'2021-08-01:00': 'feat イベント毎ページ',
}

function Address() {
	return (
		<div>
			<p>
				<a href="./bg">戻る</a>
			</p>
			<p style={{ display: 'flex', gap: '4px' }}>
				<a href="https://forms.gle/SqABcPbFsTTpRsuR7">投票リクエスト</a>
				<a href="https://forms.gle/fBQnrAxMnKNhmFA16">使用リクエスト</a>
			</p>
			<EventLinks />
			<div>
				<p>更新ノート</p>
				<List>
					{Object.entries(notes).map(([date, msg], i) => (
						<p key={`msg-${i}_${date}`}>
							<code>{date}</code>
							{msg}
						</p>
					))}
				</List>
			</div>
			<p>
				連絡先<code>hiroflighter+haikei@gmail.com</code>
			</p>
		</div>
	)
}

const List = styled.div`
	max-height: 20vh;
	overflow: scroll;
	border: solid gray 1px;
	padding: 4px;
	p {
		margin-top: 1px;
		margin-bottom: 0;
	}
	code {
		margin-right: 1rem;
	}
`
export default Address
