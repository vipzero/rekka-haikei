import { useEffect, useState } from 'react'
import { getBooks, getBooksPostCount } from '../../service/firebase'
import { BookCount, WordCount } from '../types'
import { countWordsIcys } from '../util/serverCodeUtils'
import { useQeuryEid } from './useQueryEid'

export function useBookDb() {
	const eventId = useQeuryEid()
	const [books, setBooks] = useState<BookCount[]>([])
	const [wordCounts, setWordCounts] = useState<WordCount[]>([])
	const [postCount, setPostCount] = useState<number>(-1)

	useEffect(() => {
		getBooks(eventId).then((snaps) => {
			const books = snaps.docs.map((snap) => snap.data() as BookCount)

			setWordCounts(countWordsIcys(books))
			setBooks(books)
		})
		getBooksPostCount(eventId).then((snap) => {
			if (snap.exists()) {
				setPostCount((snap.data() as { postCount: number }).postCount)
			} else {
				setPostCount(0)
			}
		})
	}, [eventId])

	return [books, postCount, wordCounts] as const
}
