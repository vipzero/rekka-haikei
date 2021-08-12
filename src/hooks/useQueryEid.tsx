import { useRouter } from 'next/dist/client/router'
import config from '../config'

export function useQeuryEid() {
	const router = useRouter()
	const { eid } = router.query

	if (typeof eid === 'object') return eid[0]

	return eid || config.eventId
}

export function useQeurySearch() {
	const router = useRouter()
	const { q } = router.query

	if (typeof q === 'object') return q[0]

	return q
}
