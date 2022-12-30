import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useSettingsShowBookmark } from '../../hooks/useSettings'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'

type Props = {
	books: Record<string, boolean>
	toggleFavorites: (icy: string) => void
}

export function BookmarkMiniList({ books, toggleFavorites }: Props) {
	const { visible, closeBookmark } = useSettingsShowBookmark()

	return (
		<div
			className="co-books"
			data-co
			onClick={(e) => e.stopPropagation()}
			style={{ display: visible ? 'block' : 'none' }}
		>
			<p>
				■ブックマーク
				<span className="moc" onClick={closeBookmark}>
					x
				</span>
			</p>
			{Object.keys(books).length === 0 && <p>ブックマークはまだないお</p>}
			{Object.keys(books).map((icy, i) => (
				<p key={i}>
					<span
						style={{ cursor: 'pointer' }}
						onClick={() => confirm('削除する') && toggleFavorites(icy)}
					>
						<FontAwesomeIcon icon={faBookmark} />
					</span>
					<span style={{ marginLeft: '4px' }}>{icy}</span>
				</p>
			))}
		</div>
	)
}
