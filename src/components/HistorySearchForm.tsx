import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styled from 'styled-components'
import { useQueryInit } from '../hooks/useQueryEid'
import { useSearch } from '../hooks/useSearch'
import { CheckBox } from './common/CheckBox'

type Props = {
	search: (s: string) => void
	searchs: string[]
	setSearchs: (s: string[]) => void
}
export function HistorySearchForm({ search, searchs, setSearchs }: Props) {
	const {
		searchs: searchHists,
		addSearch,
		delAllSearchs,
		delSearch,
	} = useSearch()
	const [multiMode, setMultiMode] = useState<boolean>(false)
	const [searchPre, setSearchPre] = useState<string>('')
	useQueryInit(
		(q) => setSearchPre(q),
		() => {}
	)

	return (
		<Wrap>
			<div>
				<textarea
					rows={multiMode ? 8 : 1}
					name="rekka-search-word"
					value={searchPre}
					autoComplete="on"
					onChange={(e) =>
						setSearchPre(
							multiMode ? e.target.value : e.target.value.split('\n')[0]
						)
					}
				/>
			</div>
			<div className="search-control">
				<CheckBox
					onChange={(multiMode) => {
						setMultiMode(multiMode)
						if (!multiMode) {
							setSearchPre(searchPre.replace(/\n/g, ' '))
						}
					}}
					checked={multiMode}
				>
					複数
				</CheckBox>
				<button
					style={{ minWidth: '100px' }}
					onClick={(e) => {
						e.preventDefault()
						if (searchPre.trim() !== '')
							addSearch({ q: searchPre, multi: multiMode })
						search(searchPre)
					}}
				>
					検索
					<div>(正規表現)</div>
				</button>
				{searchs.length > 0 && (
					<button
						onClick={(e) => {
							e.preventDefault()
							setSearchs([])
							setSearchPre('')
						}}
					>
						リセット
					</button>
				)}
			</div>
			<div>
				<div className="search-hist">
					{searchHists.map((s, i) => (
						<div key={i} className="del-btn">
							<button
								onClick={(e) => {
									e.preventDefault()
									setMultiMode(s.multi)
									search(s.q)
									setSearchPre(s.q)
								}}
							>
								{s.q.substring(0, 10)}
							</button>
							<button
								onClick={(e) => {
									e.preventDefault()
									delSearch(s)
								}}
							>
								x
							</button>
						</div>
					))}
					{searchHists.length > 0 && (
						<button
							onClick={(e) => {
								e.preventDefault()
								delAllSearchs()
							}}
						>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					)}
				</div>
			</div>
		</Wrap>
	)
}

const Wrap = styled.form`
	display: flex;
	gap: 8px;
	> :not(button) {
		margin-top: 4px;
	}

	.search-hist {
		display: flex;
		flex-wrap: wrap;
		gap: 2px;
		border-left: dotted var(--primary-color);
		padding-left: 4px;
	}
	.del-btn {
		button:first-child {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
		button:nth-of-type(2) {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			filter: brightness(0.97);
		}
	}
	.search-control {
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 3px;
	}
`
