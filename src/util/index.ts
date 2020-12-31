export function formatDate(time: number) {
	const date = new Date(time)

	const yyyy = date.getFullYear()
	const mm = String(date.getMonth() + 1).padStart(2, '0')
	const dd = String(date.getDate()).padStart(2, '0')
	const h = String(date.getHours()).padStart(2, '0')
	const m = String(date.getMinutes()).padStart(2, '0')
	const s = String(date.getSeconds()).padStart(2, '0')

	return `${yyyy}-${mm}-${dd} ${h}:${m}:${s}`
}

export const sleep = (msec) =>
	new Promise((resolve) => setTimeout(resolve, msec))
export const between = (v, min, max) => Math.max(min, Math.min(max, v))

export const isObjEmpty = (obj: object) => Object.keys(obj).length === 0
