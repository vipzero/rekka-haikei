import { toast } from 'react-toastify'
import { Song } from '../types'
import { featcherVersion } from '../config'
import { formatCount } from '.'

export const wordCount = (song: Song) => {
	const wordCountsAna = Object.entries(song.wordCounts)
		.filter(([k]) => k !== song.icy)
		.map(([name, count]) => ({
			name,
			count,
			label: `[${name} (${formatCount(count)})]`,
		}))

	return [...wordCountsAna].sort((a, b) => a.count - b.count)
}

export const updateCheck = (song: Song) => {
	if (song.frontVersion && song.frontVersion.ver > featcherVersion) {
		const { msg } = song.frontVersion
		setTimeout(() => {
			toast.info(msg, { autoClose: false })
		}, 1000)
	}
}
