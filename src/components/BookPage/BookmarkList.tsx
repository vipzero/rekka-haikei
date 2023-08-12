import copy from 'copy-to-clipboard'
import { useState } from 'react'
import styled from 'styled-components'
import { useFavorites } from '../../hooks/useFavorites'
import { RadioButton } from '../Home/RadioButton'
import { youtubeMusicSearchUrl, youtubeSearchUrl } from '../../util'
import { CopyButton } from './CopyButton'

const RichCell = ({
	text,
	active,
	onAnyClick,
}: {
	text: string
	active: boolean
	onAnyClick: () => void
}) => (
	<div data-active={active}>
		<span>{text}</span>
		<div className="buttons">
			<button
				onClick={() => {
					onAnyClick()
					window.open(youtubeSearchUrl(text))
				}}
			>
				YT
			</button>
			<button
				onClick={() => {
					onAnyClick()
					window.open(youtubeMusicSearchUrl(text))
				}}
			>
				YTM
			</button>
			<CopyButton
				onClick={() => {
					copy(text)
					onAnyClick()
				}}
			/>
		</div>
	</div>
)

export function BookmarkList() {
	const { favorites, toggleFavorites } = useFavorites()
	const [mode, setMode] = useState<'normal' | 'copy' | 'txt'>('normal')
	const [lastCopy, setLastCopy] = useState<string>('')
	const text = Object.keys(favorites).join('\n')

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
					<CopyButton onClick={() => copy(text)} label={'コピー'} />
				</div>
			)}
			{mode === 'normal' && (
				<div className="table-body">
					{Object.keys(favorites)
						.map((icy) => ({ icy, units: icy.split(' - ') }))
						.map(({ icy, units: [_icyA, _icyB] }, i) => (
							<div key={i} className="row">
								<RichCell
									text={icy}
									active={icy === lastCopy}
									onAnyClick={() => setLastCopy(icy)}
								/>
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
									<RichCell
										key={str}
										text={str}
										active={str === lastCopy}
										onAnyClick={() => setLastCopy(str)}
									/>
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
			.buttons {
				display: none;
				position: absolute;
				bottom: 0;
				right: 0;
				button {
					padding: 2px 4px;
				}
			}
			&:hover {
				.buttons {
					display: flex;
					justify-content: end;
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
