import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useBookCountDb } from '../../hooks/useSongDb'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

type Props = { songId: number }
const BookCount = ({ songId }: Props) => {
	const { bookCount } = useBookCountDb()

	return <p>b:{bookCount}</p>
}
export default BookCount
