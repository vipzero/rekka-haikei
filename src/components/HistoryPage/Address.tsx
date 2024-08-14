import styled from 'styled-components'
import { URL_FEAT_REQ, URL_TOHYO_REQ, URL_USE_REQ } from '../../config'
import { EventLinks } from '../EventLinks'

const notes: Record<string, string> = {
	'2024-08-12:08': 'feat Agebar追加',
	'2023-08-12:08': 'feat ブクマ検索ボタン追加',
	'2023-08-08:08': 'feat 画像のレスポンシブ対応',
	'2023-05-05:05': 'feat BINGO',
	'2023-04-28:05': 'feat PictureInPicture',
	'2023-01-01:06': 'feat アーティストタグ追加',
	'2023-01-01:05': 'feat 放送年シーズン統計',
	'2023-01-01:04': 'enha 類似背景除外',
	'2023-01-01:03': 'enha アートワーク背景リスト追加',
	'2023-01-01:02': 'feat スナップ',
	'2023-01-01:01': 'feat カスタムテーマテンプレ追加',
	'2022-12-30:01': 'feat gif 禁止設定',
	'2022-12-23:01': 'feat ダークモード',
	'2022-12-20:01': 'feat 設定バックアップ',
	'2022-12-01:00': 'anno 投票数リセット',
	'2022-05-08:00': 'feat モザイク切り替え',
	'2022-05-07:15': 'enha コピー目印',
	'2022-05-07:12': 'feat スケジュールテキスト生成',
	'2022-05-05:23': 'enha 履歴検索高速化',
	'2022-05-04:15': 'feat カスタムテーマ',
	'2022-05-04:03': 'feat 設定ページ追加',
	'2022-05-04:01': 'feat 疑似トラックバー',
	'2022-05-04:00': 'feat 履歴ブックソート追加',
	'2022-05-01:15': 'feat リアタイブック数',
	'2022-04-30:15': 'feat 検索ラボ',
	'2022-04-30:14': 'feat 検索保存',
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
				<a href={URL_TOHYO_REQ}>投票リクエスト</a>
				<a href={URL_USE_REQ}>使用リクエスト</a>
				<a href={URL_FEAT_REQ}>機能リクエスト</a>
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
	overflow: auto;
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
