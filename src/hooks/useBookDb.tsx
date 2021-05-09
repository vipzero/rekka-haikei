import { useEffect, useState } from 'react'
import { getBooks } from '../../service/firebase'
import { BookCount } from '../../types'

export function useBookDb(eventId) {
	const [books, setBooks] = useState<BookCount[]>([])

	useEffect(() => {
		getBooks(eventId).then((snaps) => {
			const books = snaps.docs.map((snap) => snap.data() as BookCount)

			setBooks(books)
		})
	}, [eventId])

	return [books] as const
}
