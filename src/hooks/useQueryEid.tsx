import { useRouter } from 'next/dist/client/router'
import config from '../config'

export function useQeuryEid() {
	const router = useRouter()
	const { eid } = router.query

	console.log(+new Date())

	if (typeof eid === 'object') return eid[0]

	return eid || config.eventId
}
