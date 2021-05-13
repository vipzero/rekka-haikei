import React from 'react'

type Suponcer = {
	date: string
	name: string
	message: string
	price: number
}
const suponcers: Suponcer[] = [
	{
		date: '2099/12/31(金)',
		name: 'vipzero',
		message: 'さくら荘はいいぞ',
		price: 7753,
	},
]

function Suponcers() {
	return (
		<div>
			<h3>鯖代スポンサー</h3>
			<div>
				{suponcers.map((s, i) => (
					<div key={`sps-${i}`}>
						<div style={{ display: 'flex', gap: '0.5em' }}>
							<span>{i}</span>
							<span>{s.name}</span>
							<span>
								{s.date} 00:00:00.{`${i}`.padStart(3, '0')}
							</span>
							<span>ID:+Sup0Nc3r</span>
							<span>￥{s.price}</span>
						</div>
						<div>
							<span>{s.message}</span>
						</div>
					</div>
				))}
			</div>

			<p>
				臨時ではじめたものであり開発者の固定費になるのは辛いのでアマギフなどでサポートをお願いしたいです;;
				<br />
				鯖代分だけ回収できたら使い切るまで受付は締め切ります
				<br />
				特典として寄付者のメッセージ(好きなアニメ好きな曲仮名など適切な範囲)をこのページに記載します
				<br />
				2021盆から履歴ローディングの最適化で費用減る予定です。(検索実行時のみ全履歴ロード・履歴キャッシュ・キャッシュ管理(容量表示・削除ボタン)・時間帯指定閲覧)
				<br />
				<code>writed: 2021/05/14</code>
			</p>
			<p>
				Google CustomSearch API, Firebaseを使用しています。
				<br />
				かかっている鯖代
			</p>
			<table>
				<tr></tr>
				<tr>
					<td>2020冬</td> <td>￥1,322</td>
				</tr>
				<tr>
					<td>2020GW</td> <td>￥6,431</td>
				</tr>
			</table>
			<p>
				連絡先(背景不具合なども含め) <code>hiroflighter+himaani@gmail.com</code>
			</p>
		</div>
	)
}
export default Suponcers
