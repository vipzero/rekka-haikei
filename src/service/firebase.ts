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
import ky from 'ky'
import { AnimeVotes } from '../components/Home/Cvote/useCvoteDb'
import config from '../config'
import { Emol, History, HistoryRaw, Schedule, Song } from '../types'

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
const P_EMOL = 'emol'
const P_FEEDBACK = 'feedback'
const P_VOTE = 'vote'
const P_BOOKS = 'books'
const P_SONGS = 'songs'
const P_TABLE = 'table'
const P_HIST = 'hist'
const P_COUNTS = 'counts'
const P_CVOTE = 'cvote'
const P_YO = 'yo'
const P_CURRENT = 'current'

// refs
const voteDoc = (eid: string) => doc(fdb, P_VOTE, eid)
const booksCol = (eid: string) => collection(fdb, P_VOTE, eid, P_BOOKS)
const _tablesCol = () => collection(fdb, P_TABLE)
const tableDoc = (eid: string) => doc(fdb, P_TABLE, eid)
const _histsCol = () => collection(fdb, P_HIST)
const histSongsDoc = (eid: string, time: string) =>
	doc(fdb, P_HIST, eid, P_SONGS, time)
const histSongsCol = (eid: string) => collection(fdb, P_HIST, eid, P_SONGS)
const countsCol = (eid: string) => collection(fdb, P_HIST, eid, P_COUNTS)
const animeDoc = (aid: string) => doc(fdb, P_CVOTE, aid)
const songDoc = (eid: string) => doc(fdb, P_SONG, eid)
const emolDoc = (eid: string) => doc(fdb, P_EMOL, eid)
const _bookCountDoc = () => doc(fdb, P_YO, P_CURRENT)

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

export const getHistoriesStorage = async (eventId) => {
	const { url } = getArchiveUrl(eventId)
	const res = ky.get(url)
	return await res.text()
}

export const getHistoriesDb = (eventId, from) =>
	getDocs(
		query(
			histSongsCol(eventId),
			where('time', '>', from),
			orderBy('time', 'desc')
		)
	)

export const getHistoriesDbRange = (
	eventId: string,
	start: number,
	end: number
) =>
	getDocs(
		query(
			histSongsCol(eventId),
			where('time', '>', start),
			where('time', '<', end),
			orderBy('time', 'desc')
		)
	)

export const loadTable = (eventId) => getDoc(tableDoc(eventId))
export const saveTable = (eventId, schedule: Schedule) =>
	setDoc(tableDoc(eventId), schedule)

export const getCounts = (eventId, limitNum = 200) =>
	getDocs(query(countsCol(eventId), orderByCountTop, limit(limitNum)))

export const voteChar = (animeId: string, charId: string) =>
	setDoc(animeDoc(animeId), { [charId]: increment(1) }, { merge: true })

export const readCvote = (
	animeId: string,
	onNext: (cvote: AnimeVotes) => void
) =>
	onSnapshot(animeDoc(animeId), (snap) => {
		if (!snap.exists()) return

		onNext(snap.data() as AnimeVotes)
	})

export const readSong = (eid: string, onNext: (song: Song) => void) =>
	onSnapshot(songDoc(eid), (snap) => {
		if (!snap.exists()) return

		onNext(snap.data() as Song)
	})
export const readEmol = (eid: string, onNext: (emol: Emol) => void) =>
	onSnapshot(emolDoc(eid), (snap) => {
		if (!snap.exists()) return

		onNext(snap.data() as Emol)
	})

export const watchHistSong = (
	eid: string,
	id: number,
	onNext: (hist: HistoryRaw) => void
) =>
	onSnapshot(histSongsDoc(eid, String(id)), (snap) => {
		if (!snap.exists()) {
			console.error('hist not found')
			console.error(snap.id)
			console.error({ eid, id })
		}

		onNext(snap.data() as HistoryRaw)
	})
export const incSongBookCount = (eid: string, id: number) =>
	updateDoc(histSongsDoc(eid, String(id)), {
		b: increment(1),
		// a: increment(1),
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

export const BRate = 10
export const calcG = (n?: number | null, b?: number | null) =>
	(b ?? 0) ** 2 / ((n ?? 0) + BRate)
export function toHistory({ title, time, n, b }: HistoryRaw): History {
	return { title, time, n: n ?? null, b: b ?? null, g: calcG(n, b) }
}

export const readRecentHistory = (
	eventId: string,
	onNext: (histories: History[]) => void
) =>
	onSnapshot(
		query(histSongsCol(eventId), orderBy('time', 'desc'), limit(10)),
		(snaps) => {
			const histories = snaps.docs.map((snap) =>
				toHistory(snap.data() as HistoryRaw)
			)
			onNext(histories)
		}
	)

type StoragePaths = {
	url: string
	destination: string
	filename: string
	localFile: string
}
const distPath = 'archive'
export const getArchiveUrl = (eid: string): StoragePaths => {
	const localFile = `data/archvie_${eid}.csv`
	const filename = `hist_${eid}.csv`
	const destination = `${distPath}/${filename}`
	const url = `${process.env.NEXT_PUBLIC_STRAGE_URL}${destination}`
	return { url, destination, filename, localFile }
}
