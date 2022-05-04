import React from 'react'
import styled from 'styled-components'
import { useSettingsFakeBar } from '../../hooks/useSettings'
import { CheckBox } from '../common/CheckBox'

type Props = {}

export function SettingPage() {
	const { enableFakeBar, toggleEnableFakeBar } = useSettingsFakeBar()

	return (
		<Style>
			<div style={{ width: 'max-content' }}>
				<CheckBox
					onChange={() => {
						toggleEnableFakeBar()
					}}
					checked={enableFakeBar === 'on'}
				>
					疑似シークバー: 曲の再生時間がとれない場合も4分のシークバーを表示する
				</CheckBox>
			</div>
		</Style>
	)
}
const Style = styled.div``
