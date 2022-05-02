import { useBookCountDb } from '../../hooks/useSongDb'

type Props = { songId: number }
const BookCount = ({ songId }: Props) => {
	const { bookCount } = useBookCountDb(songId)

	return <p>b:{bookCount}</p>
}
export default BookCount
