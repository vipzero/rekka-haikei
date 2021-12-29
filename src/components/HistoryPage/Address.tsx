import React from 'react'
import styled from 'styled-components'
import { EventLinks } from '../EventLinks'

const notes: Record<string, string> = {
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
	p {
		margin-top: 4px;
		margin-bottom: 0;
	}
	code {
		margin-right: 1rem;
	}
`
export default Address
