import { useEffect, useState } from 'react'
import { readRecentHistory } from '../service/firebase'
import { History } from '../types'
import { useQeuryEid } from './useQueryEid'

export function useRecentHistoryDb(enabled: boolean) {
	const [histories, setHistories] = useState<History[]>([])
	const eventId = useQeuryEid()

	useEffect(() => {
		if (!enabled) return

		const si = readRecentHistory(eventId, setHistories)

		return () => si()
	}, [eventId, enabled])
	return histories
}
