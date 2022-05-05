import React from 'react'
import styled from 'styled-components'
import {
	useSettingsCustomTheme,
	useSettingsFakeBar,
} from '../../hooks/useSettings'
import { CheckBox } from '../common/CheckBox'
import ToggleButton, { ConfButton } from '../Home/ToggleButton'

type Props = {}

export function SettingPage() {
	const { enableFakeBar, toggleEnableFakeBar } = useSettingsFakeBar()
	const { customTheme, setCustomTheme } = useSettingsCustomTheme()

	return (
		<Style customTheme={customTheme}>
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
			<div className="preview">
				<div id="timebar">
					<div className="wrap">
						<div className="fill" style={{ width: '30%' }} />
						<div className="pointer" />
					</div>
				</div>
				<div id="panel">
					<p>タイトル</p>
				</div>
				<div id="setting-box">
					<ToggleButton onClick={() => {}} checked>
						ON
					</ToggleButton>
					<ToggleButton onClick={() => {}} checked={false}>
						OFF
					</ToggleButton>
				</div>
			</div>
			<div>
				<h4>プレイヤーで http のストリームを使う</h4>
				<p>
					<a href="chrome://flags">chrome://flags</a> の
					<code>unsafely-treat-insecure-origin-as-secure</code>
					に対象のURLを入れることで再生可能 (2022年4月時点)
				</p>
				<p>
					<img src="https://i.imgur.com/AUViOQB.png" />
				</p>
			</div>
		</Style>
	)
}
const Style = styled.div<{ customTheme: string }>`
	.custom-theme-code {
		width: max-content;

		font-family: 'Roboto Mono', monospace;
	}
	img {
		width: 400px;
	}
	${(p) => p.customTheme}
	.preview {
		background: url('/static/pattern-randomized.svg');
		width: 400px;
		border: solid 1px;
		.wrap {
			display: flex;
			position: absolute;
			width: 400px;
			height: 4px;
			background: #222;
		}
		.fill {
			background: #ddd;
			height: 4px;
		}

		#panel {
			background-color: var(--content-bg-color);
			padding: 4px;
			margin: 4px;
		}
		#setting-box {
			padding: 8px;
			background: var(--setting-bg-color);
		}

		button {
			border-radius: 4px;
			color: var(--btn-fo-color);
			background-color: var(--btn-bg-color);
			&[data-checked='true'] {
				background: var(--btn-bg-checked-color) !important;
			}
		}
		#panel,
		[data-co] {
			p,
			a {
				font-weight: bold;
				color: var(--panel-fo-color);
				text-shadow: 1px 1px 1px var(--panel-fo-shadow-color),
					-1px -1px 1px var(--panel-fo-shadow-color),
					-1px 1px 1px var(--panel-fo-shadow-color),
					1px -1px 1px var(--panel-fo-shadow-color);
				margin: 0;
			}
		}
		.typography {
			color: var(--font-color);
		}
	}
`
