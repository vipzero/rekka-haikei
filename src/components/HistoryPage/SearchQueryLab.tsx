import styled from 'styled-components'
import { URL_MAKE_SEARCH_CODE } from '../../config'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useSongDb } from '../../hooks/useSongDb'
import { searchImageUrl } from '../../util'

const WORDS = [
	'meme',
	'キャプ画',
	'キャラ',
	'かわいい',
	'グッズ',
	'ネタ画像',
	'壁紙',
	'相関図',
	'名シーン',
	'作画',
	'wallpaper',
	'敵',
	'ヒット',
	'似てる',
	'2話',
]

const defaultText = `
{icy} 壁紙
{anime} アニメ
{icy} -写真 -3次元
{icy} -artwork -shop
${WORDS.map((w) => `{anime} AND ${w}`).join('\n')}

{anime} AND (キャラ OR 名シーン OR 2話)
`

export function SearchQueryLab() {
	const { loaded, song } = useSongDb()
	const [text, setText] = useLocalStorage<string>('sq_lab', defaultText)
	if (!loaded) return <p>ロード中</p>
	const anime = song.animeTitle?.replace('-', ' ') || 'のんのんびより'

	const icy = song.icy.replace(' - ', ' OR ')

	return (
		<Style>
			<p>
				<b>いい感じの壁紙が見つかる「検索ワード」を探しています。</b>
				いい感じの検索ワードが見つかったら教えて下さい。
				アルゴリズムの改善募集中です。 背景用の画像は
				Google検索(カスタムサーチAPI)で見つけています。
				<a href={URL_MAKE_SEARCH_CODE}>該当コード</a>
			</p>
			<p>
				<code>
					{JSON.stringify(WORDS)}
					など
				</code>
			</p>
			<p>下のツールでリンクを生成し、画像検索をテストできます。</p>
			<section>
				<p>検索につかえること</p>
				<ul>
					<li>任意のワード</li>
					<li>曲名・アニメ名(取得できた場合)など</li>
					<li>カテゴリ(アニメ・映画)</li>
					<li>ランダム</li>
					<li>時間</li>
					<li>Google 検索クエリ(マイナス検索,AND,ORなど)</li>
					<li>{`「夜は"夜"を検索につける」「タグからランダムに1つ使う」なども可能です。`}</li>
				</ul>
			</section>
			<section>
				<p>補足(他にやっている処理)</p>
				<ul>
					<li>一部サイトはブラックリストで省く(Amazonなど)</li>
					<li>曲名などからハイフンを空白に置き換える</li>
					<li>検索オプションの言語は日本語(lang_ja)</li>
				</ul>
			</section>
			<section>
				<h3>実験ツール</h3>
				<div>
					実験用変数(現在の曲から)
					<p>{`{anime} → ${anime} ${song.animeTitle ? '' : '(取得失敗)'}`}</p>
					<p>{`{icy} → ${icy}`}</p>
				</div>
				<div>
					<textarea
						style={{ width: '400px' }}
						rows={10}
						name="rekka-search-word"
						value={text}
						autoComplete="on"
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<button onClick={() => setText(defaultText)}>初期テキストに戻す</button>
				<div className="generated">
					{text
						.trim()
						.split('\n')
						.filter((v) => !!v.trim())
						.map((word) =>
							word.replace(/\{anime\}/, anime).replace(/\{icy\}/, icy)
						)
						.map((q, i) => (
							<a
								href={searchImageUrl(q)}
								key={i}
								target="_blank"
								rel="noreferrer"
							>
								{q}
							</a>
						))}
				</div>
				<div style={{ display: 'grid' }}>
					<h4>再生中の曲の検索ワード</h4>
					<a
						href={searchImageUrl(song.imageSearchWord)}
						target="_blank"
						rel="noreferrer"
					>
						{song.imageSearchWord}
					</a>
				</div>
			</section>
		</Style>
	)
}
const Style = styled.div`
	li::before {
		content: '・';
	}
	p {
		padding: 8px;
	}
	.generated {
		display: grid;
		border: solid gray;
		padding: 8px;
		border-radius: 8px;
	}
`
