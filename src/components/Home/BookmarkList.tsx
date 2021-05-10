import React from 'react'

type Props = {
	visible: boolean
	books: Record<string, boolean>
	onClickClose: () => void
	onToggleBook: (icy: string) => void
}
export function BookmarkList({
	books,
	visible,
	onClickClose,
	onToggleBook: toggleFavorites,
}: Props) {
	return (
		<div
			className="bookmarks"
			onClick={(e) => e.stopPropagation()}
			style={{ display: visible ? 'block' : 'none' }}
		>
			<p>
				■ブックマーク
				<span className="moc" style={{ float: 'right' }} onClick={onClickClose}>
					x
				</span>
			</p>
			{Object.keys(books).length === 0 && <p>ブックマークはまだないお</p>}
			{Object.keys(books).map((icy, i) => (
				<p key={i}>
					<span>{icy}</span>
					<span
						style={{ float: 'right', cursor: 'pointer' }}
						onClick={() => confirm('削除する') && toggleFavorites(icy)}
					>
						[削除]
					</span>
				</p>
			))}
		</div>
	)
}
