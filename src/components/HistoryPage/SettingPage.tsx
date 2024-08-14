import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
	customThemeVarDescs,
	defaultCustomTheme,
} from '../../atom/customThemes'
import {
	useSettingsCustomTheme,
	useSettingsFakeBar,
	useSettingsSpell,
} from '../../hooks/useSettings'
import { ConfButton } from '../Home/ConfButton'
import { CheckBox } from '../common/CheckBox'
import { ShortcutDescription } from './ShortcutDescription'
import { StreamerIcyTagDescription } from './StreamerIcyTagDescription'

export function SettingPage() {
	const { enableFakeBar, toggleEnableFakeBar } = useSettingsFakeBar()
	const { customTheme, setCustomTheme } = useSettingsCustomTheme()
	const { callSpell, text, onChangeText, parsed } = useSettingsSpell()

	const sealdStringify = (obj: typeof parsed) => {
		if (obj === false) return '復活不可'

		return JSON.stringify(obj, (k, v) => {
			if (k === 'ee') return '******'
			return v
		})
	}
	return (
		<Style customTheme={customTheme}>
			<section style={{ width: 'max-content' }}>
				<h4>設定バックアップ</h4>
				<label>ふっかつのじゅもん</label>
				<input onChange={(e) => onChangeText(e.target.value)} value={text} />
				<code>
					<pre style={{ maxWidth: '80vw', overflow: 'scroll' }}>
						{sealdStringify(parsed)}
					</pre>
				</code>
				<button
					disabled={!parsed}
					onClick={() => {
						if (callSpell()) {
							toast.success('設定を復元しました')
						} else {
							toast.error('復元に失敗しました')
						}
					}}
				>
					復元する
				</button>
			</section>
			<section style={{ width: 'max-content' }}>
				<h4>オプション</h4>
				<CheckBox
					onChange={toggleEnableFakeBar}
					checked={enableFakeBar === 'on'}
				>
					疑似シークバー: 曲の再生時間がとれない場合も4分のシークバーを表示する
				</CheckBox>
			</section>
			<section>
				<h4>カスタムテーマ(CSS)</h4>
				<div className="custom-theme-code">
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
				<div>
					<div
						style={{
							fontSize: '0.8rem',
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							justifyContent: 'start',
						}}
					>
						{customThemeVarDescs.map((v) => (
							<div key={v.var}>
								{v.var}: {v.name}
							</div>
						))}
					</div>
					<p>※SHARP の曲名は例外で --font-color が使われます</p>
					<button onClick={() => setCustomTheme(defaultCustomTheme)}>
						デフォルトに戻す
					</button>
				</div>
				<p>プレビュー</p>
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
						<ConfButton onClick={() => {}} checked helpText={''} areaKey={''}>
							ON
						</ConfButton>
						<ConfButton
							onClick={() => {}}
							checked={false}
							helpText={''}
							areaKey={''}
						>
							OFF
						</ConfButton>
					</div>
				</div>
			</section>
			<section>
				<h4>プレイヤーで http のストリームを使う</h4>
				<p>
					<a href="chrome://flags">chrome://flags</a> の
					<code>unsafely-treat-insecure-origin-as-secure</code>
					に対象のURLを入れることで再生可能 (2022年4月時点)
				</p>
				<p>
					<img src="https://i.imgur.com/AUViOQB.png" />
				</p>
			</section>
			<section>
				<StreamerIcyTagDescription />
			</section>
			<ShortcutDescription />
		</Style>
	)
}
const Style = styled.div<{ customTheme: string }>`
	> section {
		border-bottom: 1px dotted gray;
		padding-bottom: 8px;
		margin-bottom: 8px;
	}
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
		button {
			box-shadow: none;
		}
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
			background: var(--sb-bg);
			padding: 12px 4px;
			margin: 4px;
		}
		#setting-box {
			padding: 8px;
			background: var(--sb-bg);
		}

		button {
			border-radius: 4px;
			color: var(--btn-fo-color);
			background-color: var(--btn-bg);
			&[data-checked='true'] {
				color: var(--btn-fo-checked-color) !important;
				background: var(--btn-bg-checked-color) !important;
			}
		}
		#panel,
		.co-panel {
			p,
			a {
				font-weight: bold;
				color: var(--panel-fo);
				text-shadow: 1px 1px 1px var(--panel-fo-shadow-color),
					-1px -1px 1px var(--panel-fo-shadow-color),
					-1px 1px 1px var(--panel-fo-shadow-color),
					1px -1px 1px var(--panel-fo-shadow-color);
				margin: 0;
			}
		}
		.co-panel::-webkit-scrollbar {
			display: none;
		}

		.typography {
			color: var(--font-color);
		}
	}
`
