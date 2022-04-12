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
	onSnapshot,
	orderBy,
	query,
	runTransaction,
	setDoc,
	updateDoc,
	where,
	writeBatch,
} from 'firebase/firestore'
import { AnimeVotes } from '../src/components/Home/Cvote/useCvoteDb'
import config from '../src/config'
import { Schedule, Song } from './../src/types/index'

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

const P_SONG = 'song'
const P_FEEDBACK = 'feedback'
const P_VOTE = 'vote'
const P_BOOKS = 'books'
const P_SONGS = 'songs'
const P_TABLE = 'table'
const P_HIST = 'hist'
const P_COUNTS = 'counts'
const P_CVOTE = 'cvote'

// refs
const voteDoc = (eid: string) => doc(fdb, P_VOTE, eid)
const booksCol = (eid: string) => collection(fdb, P_VOTE, eid, P_BOOKS)
const tablesCol = () => collection(fdb, P_TABLE)
const tableDoc = (eid: string) => doc(fdb, P_TABLE, eid)
const histsCol = () => collection(fdb, P_HIST)
const songsCol = (eid: string) => collection(fdb, P_HIST, eid, P_SONGS)
const countsCol = (eid: string) => collection(fdb, P_HIST, eid, P_COUNTS)
const animeDoc = (aid: string) => doc(fdb, P_CVOTE, aid)
const songDoc = (eid: string) => doc(fdb, P_SONG, eid)

// querys
const icyIs = (icy: string) => where('icy', '==', icy)
const orderByCountTop = orderBy('count', 'desc')
const limitRecord = limit(config.visibleRecordLimit)

export const addFeedback = (message: string) =>
	addDoc(collection(fdb, P_FEEDBACK), { message })

export const incFavoritesAll = async (eventId: string, icys: string[]) => {
	const books = booksCol(eventId)
	const batch = writeBatch(fdb)

	for (const icy of icys.slice(0, 450)) {
		const snaps = await getDocs(query(books, icyIs(icy)))

		if (snaps.size === 0) {
			addDoc(books, { icy, count: 1 }) // batch.add が無いので一旦 addDoc で追加
		} else {
			snaps.forEach((doc) => batch.update(doc.ref, { count: increment(1) }))
		}
	}

	batch.update(voteDoc(eventId), { postCount: increment(1) })
	await batch.commit()
}

export const getBooks = (eventId) =>
	getDocs(query(booksCol(eventId), orderByCountTop, limitRecord))

export const getBooksPostCount = (eventId) => getDoc(voteDoc(eventId))

export const getHistories = (eventId, from) =>
	getDocs(
		query(songsCol(eventId), where('time', '>', from), orderBy('time', 'desc'))
	)

export const loadTable = (eventId) => getDoc(tableDoc(eventId))
export const saveTable = (eventId, schedule: Schedule) =>
	setDoc(tableDoc(eventId), schedule)

export const getCounts = (eventId, limitNum = 200) =>
	query(countsCol(eventId), orderByCountTop, limit(limitNum))

export const voteChar = (animeId: string, charId: string) =>
	updateDoc(animeDoc(animeId), { [charId]: increment(1) })

export const readCvote = (
	animeId: string,
	onNext: (cvote: AnimeVotes) => void
) =>
	onSnapshot(animeDoc(animeId), (snap) => {
		if (!snap.exists()) return

		onNext(snap.data() as AnimeVotes)
	})

export const readSong = (animeId: string, onNext: (song: Song) => void) =>
	onSnapshot(animeDoc(animeId), (snap) => {
		if (!snap.exists()) return

		onNext(snap.data() as Song)
	})

export const saveSongBg = async (url: string, eid: string, time: number) => {
	const songRef = songDoc(eid)
	runTransaction(fdb, async (trans) => {
		// This code may get re-run multiple times if there are conflicts.
		const doc = await trans.get(songRef)
		const song = doc.data() as Song
		const imageLinks = song.imageLinks || []

		// song changed guard
		if (song.time !== time) return
		trans.update(songRef, {
			imageLinks: [url, ...imageLinks.filter((v) => v !== url)],
		})
	})
}
