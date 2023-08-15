import styled, { keyframes } from 'styled-components'

const trainings = `
プッシュアップ,大胸筋,手の平とつま先を地面につけて体を持ち上げる動作。胸筋（大胸筋）を鍛えるトップクラスの自重トレーニングです。
ダンベルフライ,大胸筋,ダンベルを持ちながら腕を広げて体を横に伸ばす動作。胸筋を中心に鍛えます。
ダンベルロウ,広背筋,ダンベルを片手で持ち上げ、肘を後ろに引いて背中の広背筋を鍛える動作。
チンアップ,広背筋,バーに吊り下がり、手のひらが自分を向くように上へ引き上げる動作。背中の広背筋を鍛える効果があります。
ダンベルショルダープレス,肩三角筋,ダンベルを上げて肩に押し上げる動作。肩の三角筋を中心に鍛えます。
パイクプッシュアップ,肩三角筋,プランクのポジションからお尻を上げて三角形の形になり、上半身を押し上げる動作。肩の三角筋を強化します。
ダイヤモンドプッシュアップ,二頭筋,手をダイヤモンド形に組んで行うプッシュアップ。特に二頭筋を刺激します。
トライセプスディップス,二頭筋,椅子やベンチを使って行うディップス。上腕の後部の筋肉、二頭筋を鍛える効果があります。
スクワット,大腿四頭筋,足を肩幅に開き、膝を曲げて体を下げる動作。大腿の前面を鍛えます。
ルンジ,大腿四頭筋,前方や後方に一歩進んで膝を曲げる動作。大腿の前面を中心に鍛えます。
グルートブリッジ,ハムストリング,仰向けに寝てお尻を持ち上げる動作。お尻の筋肉とハムストリングを鍛えます。
プランク,腹直筋,前腕または手の平で支えた状態で体を直線に保つ動作。腹直筋を強化します。
クランチ,腹直筋,背中を床に付けた状態から上半身を起こす動作。腹筋を鍛えるトレーニングです。
`
	.trim()
	.split('\n')
	.map((v) => v.split(','))
	.map(([name, muscle, desc]) => ({ name, muscle, desc }))

type Props = {
	seed: number
}
export const Masso = ({ seed }: Props) => {
	const training =
		trainings[Math.floor((seed || 0) * trainings.length) % trainings.length]
	return (
		<div style={{ position: 'relative' }}>
			<StyledRoulette>
				<Arrow />
			</StyledRoulette>
			<Content>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<p className="title">{training.name}</p>
					<p className="sub">{training.muscle}</p>
				</div>
				<p className="desc">{training.desc}</p>
			</Content>
		</div>
	)
}
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const StyledRoulette = styled.div`
	position: absolute;
	width: 200px;
	height: 200px;
	border: 5px solid #e0e0e0;
	border-radius: 50%;
	position: relative;
	animation: ${spinAnimation} 4s linear infinite;
`

const Arrow = styled.div`
	position: absolute;
	width: 0;
	height: 0;
	top: -10px;
	left: calc(50% - 5px);
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 20px solid #ff9800;
	transform: rotate(45deg);
`

const Content = styled.div`
	position: absolute;
	top: 40px;
	background: white;
	border: 1px solid #ccc;
	padding: 8px;
	margin: 8px;
	max-width: 300px;
	display: grid;
	grid-gap: 2px;

	.title {
		font-size: 0.8rem;
		margin: 0 0 5px;
	}

	.sub {
		font-size: 0.8rem;
		color: #666;
		margin: 0 0 5px;
	}

	.desc {
		font-size: 0.8rem;
		color: #444;
		margin: 0;
	}
`
