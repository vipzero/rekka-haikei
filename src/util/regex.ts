import safe from 'safe-regex'

export const safeRegex = (s: string) => {
	try {
		if (safe(s)) {
			return true
		}
	} catch (_e) {
		return false
	}
	return false
}
