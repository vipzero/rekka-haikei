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
export function imgCheck(url: string) {
	return new Promise((resolve, reject) => {
		const bgImg = new Image()

		bgImg.onload = () => {
			resolve(true)
		}
		bgImg.onerror = () => {
			reject()
		}
		bgImg.src = url
	})
}

export const sleep = (msec) =>
	new Promise((resolve) => setTimeout(resolve, msec))
export const between = (v, min, max) => Math.max(min, Math.min(max, v))

export const isObjEmpty = (obj: object) => Object.keys(obj).length === 0
export const not = (v: boolean) => !v

export const toggle = <T>(v: T, key: keyof T): T => ({ ...v, [key]: !v[key] })
export const isValidUrl = (url: string) => {
	try {
		new URL(url)
	} catch (_e) {
		return false
	}
	return true
}
