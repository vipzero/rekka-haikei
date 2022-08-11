import { useEffect, useState } from 'react'
import { readEmol } from '../../service/firebase'
import { Emol } from '../types'
import { useQeuryEid } from './useQueryEid'
import { isEmoji } from '../util'

const italicizeNonEmoji = (s: string) =>
	[...s].map((c) => (isEmoji(c) || '\n 　'.includes(c) ? c : '|')).join('')
export function useEmolDb() {
	const [loaded, setLoaded] = useState<boolean>(false)
	const eventId = useQeuryEid()
	const [emol, setEmol] = useState<Emol>({ text: '' })

	useEffect(() => {
		const si = readEmol(eventId, (emol) => {
			setEmol({ ...emol, text: italicizeNonEmoji(emol.text) })
			setLoaded(true)
		})

		return () => si()
	}, [eventId])

	return [loaded, emol] as const
}
