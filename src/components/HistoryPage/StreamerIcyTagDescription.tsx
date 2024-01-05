import styled from 'styled-components'

export function StreamerIcyTagDescription() {
	return (
		<Style>
			<h4>配信タグの受け取り方</h4>
			<p></p>
			<h5>基本形</h5>
			<p>
				<code>{'<アーティスト名> - <曲名>'}</code>
				または、<code>{'<曲名> - <アーティスト名>'}</code>
			</p>
			<p>
				{'例: '}
				<b>{'渡辺さらさ (千本木彩花) x 奈良田愛 (花守ゆみり) - 星の旅人'}</b>
			</p>
			<p>
				{
					'→ 渡辺さらさ 千本木彩花 奈良田愛 花守ゆみり 星の旅人 かげきしょうじょ!!'
				}
				<br />
				アニメ名もDBにヒットした場合付与されます
			</p>
			<h5>背景検索ワード付与</h5>
			<p>
				末尾にかっこで囲んだ検索ワードをつけると、追加の背景検索ワードとして扱います。
				<br />
				<b>
					<code>{'<アーティスト名> - <曲名>{検索ワード}'}</code>
				</b>
				または、
				<b>
					<code>{'<アーティスト名> - <曲名>【検索ワード】'}</code>
				</b>
			</p>
			<p>
				{'例: '}
				<b>{'Silent Joker - 真壁瑞希{SSR}'}</b>
			</p>
			<p>{'→ 検索に使う文字「Silent Joker 真壁瑞希 SSR」'}</p>
			<h5>背景検索ワード完全指定</h5>
			二重のかっこで囲んだ検索ワードをつけると、背景検索ワードとして扱います。
			<p>
				<b>
					<code>{'<アーティスト名> - <曲名>{{検索ワード}}'}</code>
				</b>
			</p>
			<p>
				{'例: '}
				<b>{'Silent Joker - 真壁瑞希{{ミリオンライブ}}'}</b>
			</p>
			<p>{'→ 検索に使う文字「ミリオンライブ」'}</p>
		</Style>
	)
}

const Style = styled.div`
	p {
		line-height: 1.6rem;
	}
	b {
		border: solid 1px gray;
		padding: 4px;
	}
`
