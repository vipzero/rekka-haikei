export const pad2 = (num: number) => String(num).padStart(2, '0')
export function formatDate(time: number, toHour: boolean = false) {
	const date = new Date(time)

	const yyyy = date.getFullYear()
	const mm = pad2(date.getMonth() + 1)
	const dd = pad2(date.getDate())
	const h = pad2(date.getHours())
	const m = pad2(date.getMinutes())
	const s = pad2(date.getSeconds())

	if (toHour) return `${mm}月${dd}日${h}時`
	return `${yyyy}-${mm}-${dd} ${h}:${m}:${s}`
}
export const formatTime = (time: number) => formatDate(time).split(' ')[1]

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

export const getIp = () =>
	fetch('https://api.ipify.org').then((res) => res.text())

export const getIp2 = async () => (await fetch('https://api.ipify.org')).text()

export const makeHash = (str: string) => {
	let hash = 5381
	let i = str.length
	while (i) {
		hash = (hash * 33) ^ str.charCodeAt(--i)
	}
	return hash >>> 0
}

export const searchUrl = (q: string) =>
	`https://www.google.co.jp/search?q=${encodeURI(q)}`
export const utanetSearchUrl = (keyword: string) =>
	searchUrl(`${keyword} site:uta-net.com`)
