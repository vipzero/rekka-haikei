import React, { useEffect, useState } from 'react'
import { History, HistoryRaw } from '../types'
import { useQeuryEid } from './useQueryEid'
import { readRecentHistory } from '../service/firebase'

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
