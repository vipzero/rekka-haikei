import { useEffect } from 'react'
import { getIp, makeHash } from '../util'

const block = () => {
	window.close()
}

export const useBlock = () => {
	useEffect(() => {
		getIp().then((ip) => {
			if (makeHash(ip) === 2830815118) {
				block()
			}
		})
	}, [])
}
