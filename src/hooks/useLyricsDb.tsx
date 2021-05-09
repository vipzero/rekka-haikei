import { useEffect, useState } from 'react'
import { getFirestore } from '../../service/firebase'
import { sleep } from '../util'

async function waitLoadLyrics(): Promise<string> {
	await sleep(1000) // backend が個別保存なので少し待つ
	const fdb = getFirestore()
	const snap = await fdb.collection('song').doc('lyric').get()

	if (!snap.exists) return 'no data'
	const res = snap.data() as { text: string }

	return res.text
}

export function useLyricsDb(icy, reading) {
	const [lyric, setLyric] = useState<string>('loading')
	const [last, setLast] = useState<string>('')

	useEffect(() => {
		if (!reading) return
		if (last === icy) return
		waitLoadLyrics().then((text) => {
			setLyric(text)
			setLast(icy)
		})
	}, [icy, reading])

	return [lyric] as const
}
