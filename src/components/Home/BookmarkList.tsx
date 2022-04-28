import React from 'react'
import { useSettingsShowBookmark } from '../../hooks/useSettings'

type Props = {
	books: Record<string, boolean>
	toggleFavorites: (icy: string) => void
}
export function BookmarkList({ books, toggleFavorites }: Props) {
	const { visible, closeBookmark } = useSettingsShowBookmark()

	return (
		<div
			className="bookmarks"
			onClick={(e) => e.stopPropagation()}
			style={{ display: visible ? 'block' : 'none' }}
		>
			<p>
				■ブックマーク
				<span
					className="moc"
					style={{ float: 'right' }}
					onClick={closeBookmark}
				>
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
