import { useRouter } from 'next/dist/client/router'
import { ParsedUrlQuery } from 'querystring'
import config from '../config'

export function useQeuryEid() {
	const router = useRouter()
	const { eid } = router.query

	if (typeof eid === 'object') return eid[0]

	return eid || config.eventId
}

const getQuery = (query: ParsedUrlQuery, path: string, queryKey: string) => {
	const q = query[queryKey]
	if (q) {
		if (typeof q === 'object') return q?.[0] || ''
		return q
	}
	const mq = path.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
	return mq ? decodeURIComponent(mq[1]) : undefined
}

export function useQeurySearch() {
	const router = useRouter()
	return getQuery(router.query, router.asPath, 'q')
}
