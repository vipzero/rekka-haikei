import styled from 'styled-components'

const colNum = 50
const chars = ['@', 'P', 'B', 'H', 'S']

const heads = `
双双高星水如我天萩菊秋四三
横市龍福佐遊佐赤メ古櫻橘結城的大乙椎白氏白成望小首村池輿関早棟柳浅神二久森上ナ南久三矢五大栗小辻前水村桃楊ア大渋砂松喜喜キ冴土野浜星本赤浅安今緒工佐長岡西藤北ラ脇及高堀依井小西榊島白道双三綾神多速古吉海大北城難日諸若一月中丹藤松上桐塩松水八愛相木杉十向有江奥黒涼宮梅岸桐小鷺瀬新藤イ小西槙夢ル大日ク原間荒黒ケ鷹斉姫太持伊大財仙松相松衛並浜真柳相東水高ヘ木高服相三和佐沢兵篠川片高柊安
中周大箱エ春最伊望北木矢ロ七天永所野松高篠ジ島高横宮真白詩田佐福徳舞北二豊百桜馬玲
小芹風市櫻八杜福七幽大大園西浅樋田白和月三黛有斑桑緋
姫橘岡兜御秋ピ天神伊紅猪冬大秋黒花榊天卯猫水蒼蒼牙若眉北九清木伊鷹白東神美舞握円柏風三ア桜安華天古葛山渡信硲都
`
	.trim()
	.split('\n')
	.map((l) => l.split(''))

type Props = {
	bools: boolean[][]
}

const sum = (a: number, b: number) => a + b
export const ImasBoard = ({ bools }: Props) => {
	const rowNum = bools.map((row) => Math.ceil(row.length / colNum)).reduce(sum)

	return (
		<Style data-open={open} onClick={(e) => e.stopPropagation()}>
			{bools.map((row, i) => (
				<div key={i} className="row">
					{row.map((b, j) => (
						<div
							key={j}
							data-hit={b}
							style={{
								background: `hsla(${
									((i + j / 50 + (j % 50)) / (rowNum + colNum)) * 360
								},50%,50%,10)`,
							}}
						>
							{heads[i]?.[j] ? (
								<div className="tooltip">
									<span className="tooltip-text" data-tooltip-pos="top">
										{heads[i]?.[j] || ''}
									</span>
									{b ? '.' : chars[i] || '|'}
								</div>
							) : b ? (
								'.'
							) : (
								chars[i] || '|'
							)}
						</div>
					))}
				</div>
			))}
		</Style>
	)
}

const Style = styled.div`
	width: 400px;
	border: solid 1px;
	font-size: 8px;
	line-height: 8px;
	font-family: monospace;
	background: #888;
	display: grid;
	opacity: 0.9;
	/* color: transparent; */
	text-align: center;
	div,
	span {
		cursor: default;
	}
	[data-hit='true'] {
	}
	[data-hit='false'] {
		background: #fff !important;
	}
	.row {
		border-top: dotted 1px gray;
		display: grid;
		grid-template-columns: repeat(${colNum}, 1fr);
	}
`
