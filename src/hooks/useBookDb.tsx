import { useEffect, useState } from 'react'
import { getBooks, getBooksPostCount } from '../../service/firebase'
import { BookCount } from '../../types'

export function useBookDb(eventId) {
	const [books, setBooks] = useState<BookCount[]>([])
	const [postCount, setPostCount] = useState<number>(-1)

	useEffect(() => {
		getBooks(eventId).then((snaps) => {
			const books = snaps.docs.map((snap) => snap.data() as BookCount)

			setBooks(books)
		})
		getBooksPostCount(eventId).then((snap) => {
			setPostCount((snap.data() as { postCount: number }).postCount)
		})
	}, [eventId])

	return [books, postCount] as const
}
