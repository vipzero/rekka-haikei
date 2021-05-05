import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { BookCount } from '../../types'

export function useBookDb(eventId) {
	const [books, setBooks] = useState<BookCount[]>([])

	useEffect(() => {
		const fdb = getFirestore()

		const booksRef = fdb.collection('book').doc(eventId).collection('books')

		booksRef
			.orderBy('count', 'desc')
			.get()
			.then((snaps) => {
				const books = snaps.docs.map((snap) => snap.data() as BookCount)

				setBooks(books)
			})
	}, [eventId])

	return [books] as const
}
