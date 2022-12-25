import styled from 'styled-components'

export function ShortcutDescription() {
	return (
		<Style>
			<h4>ショートカットキー</h4>
			<p>
				<span>m</span>モザイク
			</p>
			<p>
				<span>シフト,スペース</span>モザイク
			</p>

			<p>
				<span>t</span>テーマ切り替え
			</p>
			<p>
				<span>f</span>お気に入り表示
			</p>
			<p>
				<span>h</span>履歴表示
			</p>
		</Style>
	)
}

const Style = styled.div`
	span::after {
		content: ': ';
	}
`
