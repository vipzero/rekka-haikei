import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import copy from 'copy-to-clipboard'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useFavorites } from '../../hooks/useFavorites'
import { useSettingsShowBookmark } from '../../hooks/useSettings'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { RadioButton } from '../Home/RadioButton'
import { CopyButton } from './CopyButton'

type Props = {}
export function BookmarkList() {
	const { favorites, toggleFavorites } = useFavorites()
	const [mode, setMode] = useState<'normal' | 'copy' | 'txt'>('copy')
	const text = Object.keys(favorites).join('\n')

	return (
		<Style>
			<div style={{ display: 'flex', gap: '8px' }}>
				<RadioButton
					label="テキスト"
					value={'txt'}
					current={mode}
					onClick={() => setMode('txt')}
				/>
				<RadioButton
					label="通常"
					value={'normal'}
					current={mode}
					onClick={() => setMode('normal')}
				/>
				<RadioButton
					label="分割"
					value={'copy'}
					current={mode}
					onClick={() => setMode('copy')}
				/>
			</div>
			{Object.keys(favorites).length === 0 && <p>ブックマークはまだないお</p>}
			{mode === 'txt' && (
				<div>
					<pre>
						<code>{text}</code>
					</pre>
					<CopyButton onClick={() => copy(text)} label={'コピー'} />
				</div>
			)}
			{mode === 'normal' &&
				Object.keys(favorites)
					.map((icy) => ({ icy, units: icy.split(' - ') }))
					.map(({ icy, units: [icyA, icyB] }, i) => (
						<div key={i} className="row">
							<div>
								<span>{icy}</span>
								<CopyButton onClick={() => copy(icy)} />
							</div>
							<div />
							<div />
							<button
								onClick={() => confirm('削除する') && toggleFavorites(icy)}
							>
								削除
							</button>
						</div>
					))}
			{mode === 'copy' &&
				Object.keys(favorites)
					.map((icy) => ({ icy, units: icy.split(' - ') }))
					.map(({ icy, units: [icyA, icyB] }, i) => (
						<div key={i} className="row">
							<div>
								<span>{icy}</span>
								<CopyButton onClick={() => copy(icy)} />
							</div>
							<div>
								<span>{icyA}</span>
								<CopyButton onClick={() => copy(icyA)} />
							</div>
							<div>
								<span>{icyB}</span>
								<CopyButton onClick={() => copy(icyB)} />
							</div>
							<button
								onClick={() => confirm('削除する') && toggleFavorites(icy)}
							>
								削除
							</button>
						</div>
					))}
		</Style>
	)
}

const Style = styled.div`
	pre {
		background: #ddd;
		padding: 12px 8px;
	}
	.row {
		border-bottom: solid 1px;
		display: grid;
		grid-template-columns: 2fr 1fr 1fr auto;
	}
`
