import { useEffect, useState } from 'react'
import { getBooks, getBooksPostCount } from '../../service/firebase'
import { BookCount } from '../types'
import { useQeuryEid } from './useQueryEid'

export function useBookDb() {
	const eventId = useQeuryEid()
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
