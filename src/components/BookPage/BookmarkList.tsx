import copy from 'copy-to-clipboard'
import { useState } from 'react'
import styled from 'styled-components'
import { useFavorites } from '../../hooks/useFavorites'
import { RadioButton } from '../Home/RadioButton'
import { CopyButton } from './CopyButton'

export function BookmarkList() {
	const { favorites, toggleFavorites } = useFavorites()
	const [mode, setMode] = useState<'normal' | 'copy' | 'txt'>('normal')
	const [lastCopy, setLastCopy] = useState<string>('')
	const text = Object.keys(favorites).join('\n')

	const copyAciton = (s: string) => {
		setLastCopy(s)
		copy(s)
	}
	return (
		<Style>
			<div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
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
					<CopyButton onClick={() => copyAciton(text)} label={'コピー'} />
				</div>
			)}
			{mode === 'normal' && (
				<div className="table-body">
					{Object.keys(favorites)
						.map((icy) => ({ icy, units: icy.split(' - ') }))
						.map(({ icy, units: [_icyA, _icyB] }, i) => (
							<div key={i} className="row">
								<div data-active={icy === lastCopy} key={icy}>
									<span>{icy}</span>
									<CopyButton onClick={() => copyAciton(icy)} />
								</div>
								<button
									onClick={() => confirm('削除する') && toggleFavorites(icy)}
								>
									削除
								</button>
							</div>
						))}
				</div>
			)}
			{mode === 'copy' && (
				<div>
					{Object.keys(favorites)
						.map((icy) => ({ icy, units: icy.split(' - ') }))
						.map(({ icy, units: [icyA, icyB] }, i) => (
							<div key={i} className="row-sp">
								{[icy, icyA, icyB].map((str) => (
									<div data-active={str === lastCopy} key={str}>
										<span>{str}</span>
										<CopyButton onClick={() => copyAciton(str)} />
									</div>
								))}

								<button
									onClick={() => confirm('削除する') && toggleFavorites(icy)}
								>
									削除
								</button>
							</div>
						))}
				</div>
			)}
		</Style>
	)
}

const Style = styled.div`
	pre {
		background: #ddd;
		padding: 12px 8px;
	}
	.table-body {
	}
	.row,
	.row-sp {
		border-bottom: solid 1px;
		display: grid;
		grid-template-columns: 2fr auto;
		padding: 4px;
		gap: 12px;
		> div {
			position: relative;
			button {
				display: none;
				position: absolute;
				bottom: 0;
				right: 0;
			}
			&:hover {
				button {
					display: block;
				}
			}
		}
		[data-active='true'] {
			background: #dfa;
		}
	}
	.row-sp {
		grid-template-columns: 2fr 1fr 1fr auto;
	}
`
