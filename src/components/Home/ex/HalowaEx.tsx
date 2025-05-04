import { RainbowFontCool } from '../..'

// 求人サイトのリンク
const workLinks: ([string] | [string, string])[] = [
	[
		'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/hellowork.html',
		'https://www.hellowork.go.jp/',
	],
	['https://www.green-japan.com/'],
	['https://jp.indeed.com/'],
	['https://www.bizreach.jp/lp/bizreach-07/pc', 'https://www.bizreach.jp'],
	['https://www.r-agent.com/entry/ts/', 'https://www.r-agent.com'],
	['https://mynavi-job20s.jp/lp/fm/', 'https://mynavi-job20s.jp'],
]

export const HalowaEx = () => {
	return (
		<div style={{ display: 'grid' }}>
			{workLinks.map(([link, label]) => (
				<RainbowFontCool key={link}>
					<a href={link} target="_blank" rel="noreferrer">
						{label || link}
					</a>
				</RainbowFontCool>
			))}
		</div>
	)
}

export default HalowaEx
