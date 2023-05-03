
import { createHash } from 'crypto'
import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

const makeHash = (s) => createHash('md5').update(s).digest('base64')
const makeHashC = (s, c = 10) => (c <= 0 ? s : makeHashC(makeHash(s), c - 1))

export const useHistoryAuth = () => {
	const [str, setAuthed] = useLocalStorage<string>('auth-history', '')
	const unlock = (s) => setAuthed(s)
	const isOk = (s) => makeHashC(s) === 'n4TX53Q63j2MflyifcC6eA=='
	const authed = useMemo(() => isOk(str), [str])
	const submit = (k: string) => {
		if (isOk(k)) unlock(k)
	}

	return { authed, submit }
}
