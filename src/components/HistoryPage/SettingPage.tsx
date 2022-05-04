import React from 'react'
import styled from 'styled-components'
import {
	useSettingsCustomTheme,
	useSettingsFakeBar,
} from '../../hooks/useSettings'
import { CheckBox } from '../common/CheckBox'

type Props = {}

export function SettingPage() {
	const { enableFakeBar, toggleEnableFakeBar } = useSettingsFakeBar()
	const { customTheme, setCustomTheme } = useSettingsCustomTheme()

	return (
		<Style>
			<div style={{ width: 'max-content' }}>
				<h4>オプション</h4>
				<CheckBox
					onChange={() => {
						toggleEnableFakeBar()
					}}
					checked={enableFakeBar === 'on'}
				>
					疑似シークバー: 曲の再生時間がとれない場合も4分のシークバーを表示する
				</CheckBox>
			</div>
			<div className="custom-theme-code">
				<h4>カスタムテーマ(CSS)</h4>
				<p>「CUSTM」選択時に有効</p>
				<textarea
					style={{ width: '600px', height: '400px' }}
					rows={10}
					name="rekka-search-word"
					value={customTheme}
					autoComplete="on"
					onChange={(e) => setCustomTheme(e.target.value)}
				/>
			</div>
		</Style>
	)
}
const Style = styled.div`
	.custom-theme-code {
		width: max-content;

		font-family: 'Roboto Mono', monospace;
	}
`
