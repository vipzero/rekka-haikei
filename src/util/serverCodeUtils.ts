export type Counts = Record<string, number>

export function anaCounts(icy: string, countsOld: Counts) {
	const entries = parseCountWords(icy)
	const counts = { ...countsOld }
	const entriesNoms = entries.map(textNormalize)

	entriesNoms.forEach((v) => {
		counts[v] = (countsOld[v] || 0) + 1
	})

	const wordCounts: Counts = {}
	// 参照は normalize 保存は元の文字
	entries.forEach((ent) => (wordCounts[ent] = counts[textNormalize(ent)]))
	return { wordCounts, counts }
}

export function textNormalize(s: string) {
	return s
		.trim()
		.toLowerCase()
		.replace('　', ' ')
		.replace(/[（【「[]/, '(')
		.replace(/[）】」\]]/, ')')
		.replace('！', '!')
		.replace('？', '?')
}

const SP =
	/CV ?|[（［([](CV)? ?|[〈〉（）［］()【】[\]、・：．]| x | - |feat\.?/gi
const isTagWord = (v: string) => !!v && v !== '-'
const trimWord = (v: string) =>
	v
		.trim()
		.replace(/^[.:：&＆]/, '')
		.trim()

const parseWords = (s: string) =>
	s.replace(SP, ',').split(',').map(trimWord).filter(isTagWord)

export const uniqo = (arr: string[]) => {
	const obj: Record<string, string> = {}
	arr.filter(Boolean).forEach((v) => {
		const nv = textNormalize(v)
		if (!obj[nv]) {
			obj[nv] = v
		} else if (obj[nv] && v !== nv) {
			obj[nv] = v
		}
	})
	return Object.values(obj)
}

export const parseCountWords = (icy: string) => {
	const words = parseWords(icy)
	const entries = uniqo(words)

	return entries
}
