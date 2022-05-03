import { useBookCountDb } from '../../hooks/useSongDb'

type Props = { songId: number }
const BookCount = ({ songId }: Props) => {
	const { bookCount } = useBookCountDb(songId)

	return <p style={{ paddingTop: 0 }}>★:{bookCount}</p>
}
export default BookCount
