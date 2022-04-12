import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	increment,
	limit,
	orderBy,
	query,
	setDoc,
	updateDoc,
	where,
	writeBatch,
} from 'firebase/firestore'
import config from '../src/config'
import { Schedule } from './../src/types/index'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const fdb = getFirestore(app)

const path = {
	feedback: 'feedback',
	vote: 'vote',
	books: 'books',
	songs: 'songs',
	table: 'table',
	hist: 'hist',
	counts: 'counts',
}

export const addFeedback = (message: string) => {
	return addDoc(collection(fdb, path.feedback), { message })
}
const icyIs = (icy: string) => where('icy', '==', icy)

export const _incFavorites = async (
	eventId: string,
	icy: string,
	count = 1
) => {
	const books = collection(fdb, path.vote, eventId, 'books')
	const q = query(books, icyIs(icy))

	const snaps = await getDocs(q)

	if (snaps.size === 0) {
		addDoc(books, { icy, count: 1 })
	} else {
		snaps.forEach((doc) => updateDoc(doc.ref, { count: increment(count) }))
	}
}

export const _decFavorites = (eventId: string, icy: string) =>
	_incFavorites(eventId, icy, -1)

export const incFavoritesAll = async (eventId: string, icys: string[]) => {
	const books = collection(fdb, path.vote, eventId, path.books)
	const batch = writeBatch(fdb)

	for (const icy of icys.slice(0, 450)) {
		const snaps = await getDocs(query(books, icyIs(icy)))

		if (snaps.size === 0) {
			addDoc(books, { icy, count: 1 }) // batch.add が無いので一旦 addDoc で追加
		} else {
			snaps.forEach((doc) => batch.update(doc.ref, { count: increment(1) }))
		}
	}

	batch.update(doc(fdb, path.vote, eventId), { postCount: increment(1) })
	await batch.commit()
}

const getbooksCols = (eid: string) =>
	collection(fdb, path.vote, eid, path.books)

const orderByCountTop = orderBy('count', 'desc')
export function getBooks(eventId) {
	const booksRef = getbooksCols(eventId)

	return getDocs(
		query(booksRef, orderByCountTop, limit(config.visibleRecordLimit))
	)
}
export function getBooksPostCount(eventId) {
	return getDoc(doc(fdb, path.vote, eventId))
}

export function getHistories(eventId, from) {
	return getDocs(
		query(
			collection(fdb, path.hist, eventId, path.songs),
			where('time', '>', from),
			orderBy('time', 'desc')
		)
	)
}

const tableCols = collection(fdb, path.table)
const tableDoc = (eid: string) => doc(fdb, path.table, eid)

export function loadTable(eventId) {
	return getDoc(tableDoc(eventId))
}

export function saveTable(eventId, schedule: Schedule) {
	return setDoc(tableDoc(eventId), schedule)
}

const histCols = () => collection(fdb, path.hist)
const countCols = (eid: string) => collection(fdb, path.hist, eid, path.counts)

export function getCounts(eventId, limitNum = 200) {
	return query(countCols(eventId), orderByCountTop, limit(limitNum))
}
