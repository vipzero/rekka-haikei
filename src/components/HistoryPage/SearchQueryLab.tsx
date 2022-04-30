import styled from 'styled-components'
import { MAKE_SEARCH_CODE_LINK } from '../../config'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useSongDb } from '../../hooks/useSongDb'
import { searchImageUrl } from '../../util'

type Props = {}

const defaultText = `
{icy} 壁紙
{anime} アニメ
{icy} -写真 -3次元
{icy} -artwork -shop
{anime} AND (主人公 OR グッズ)
{anime} AND (キャラ OR 名シーン OR 2話)
`

export function SearchQueryLab() {
	const [loaded, song] = useSongDb()
	const [text, setText] = useLocalStorage<string>('sq_lab', defaultText)
	if (!loaded) return <p>ロード中</p>
	const anime = song.animeTitle?.replace('-', ' ') || 'のんのんびより'

	const icy = song.icy.replace('-', ' ')

	return (
		<Style>
			<p>
				アルゴリズムの改善募集中です。 背景用の画像は
				Google検索(カスタムサーチAPI)で見つけています。
				<a href={MAKE_SEARCH_CODE_LINK}>該当コード</a>
			</p>
			<p>
				下のツールでリンクを生成し、画像検索をテストできます。
				<b>いい感じの壁紙が見つかる「任意のワード」を探しています。</b>
			</p>
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
				<div style={{ display: 'grid' }}>
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
			</section>
		</Style>
	)
}
const Style = styled.div`
	li::before {
		content: '・';
	}
`
