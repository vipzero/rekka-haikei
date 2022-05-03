import { useBookCountDb } from '../../hooks/useSongDb'

type Props = { songId: number }
const BookCount = ({ songId }: Props) => {
	const { bookCount } = useBookCountDb(songId)

	return (
		<p style={{ paddingTop: 0 }}>
			<span className="tooltip">
				<span className="tooltip-text">ブックマークされた回数</span>
				★:{bookCount}
			</span>
		</p>
	)
}
export default BookCount
