import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../src/config'

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measumentId: process.env.FIREBASE_MEASUREMENT_ID,
}

const init = () => {
	if (firebase.apps.length === 0) {
		firebase.initializeApp(firebaseConfig)
	}
}

export const addFeedback = (message: string) => {
	const fdb = getFirestore()

	return fdb.collection('feedback').add({ message })
}

export const getFirestore = () => {
	init()
	return firebase.firestore()
}

export const _incFavorites = async (
	eventId: string,
	icy: string,
	count = 1
) => {
	const fdb = getFirestore()
	const books = fdb.collection('vote').doc(eventId).collection('books')

	const snaps = await books.where('icy', '==', icy).get()

	if (snaps.size === 0) {
		books.add({ icy, count: 1 })
	} else {
		snaps.forEach((doc) =>
			doc.ref.update({ count: firebase.firestore.FieldValue.increment(count) })
		)
	}
}

export const _decFavorites = (eventId: string, icy: string) =>
	_incFavorites(eventId, icy, -1)

export const incFavoritesAll = async (eventId: string, icys: string[]) => {
	const fdb = getFirestore()
	const books = fdb.collection('vote').doc(eventId).collection('books')
	const batch = fdb.batch()

	for (const icy of icys.slice(0, 450)) {
		const snaps = await books.where('icy', '==', icy).get()

		if (snaps.size === 0) {
			books.add({ icy, count: 1 })
		} else {
			snaps.forEach((doc) =>
				doc.ref.update({
					count: firebase.firestore.FieldValue.increment(1),
				})
			)
		}
	}

	batch.update(fdb.collection('vote').doc(config.eventId), {
		postCount: firebase.firestore.FieldValue.increment(1),
	})
	await batch.commit()
}

export function getBooks(eventId) {
	const fdb = getFirestore()
	const booksRef = fdb.collection('vote').doc(eventId).collection('books')

	return booksRef
		.orderBy('count', 'desc')
		.limit(config.visibleRecordLimit)
		.get()
}
export function getBooksPostCount(eventId) {
	const fdb = getFirestore()

	return fdb.collection('vote').doc(eventId).get()
}

export function getHistories(eventId) {
	const fdb = getFirestore()

	return fdb
		.collection('hist')
		.doc(eventId)
		.collection('songs')
		.orderBy('time', 'desc')
		.get()
}

export function getCounts(eventId) {
	const fdb = getFirestore()

	return fdb
		.collection('hist')
		.doc(eventId)
		.collection('counts')
		.orderBy('count', 'desc')
		.limit(200)
		.get()
}
