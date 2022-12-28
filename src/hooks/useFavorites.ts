import { Snap, Song } from '../types'
import { useLocalStorage } from './useLocalStorage'
import { useQeuryEid } from './useQueryEid'

export const useFavorites = () => {
	const eid = useQeuryEid()

	return useFavoritesBase(eid)
}

export const useFavoritesBase = (eventId: string) => {
	const [favorites, setFavortes] = useLocalStorage<Record<string, boolean>>(
		`bookmark_${eventId}`,
		{}
	)

	const toggleFavorites = (icy: string) => {
		setFavortes((data) => {
			const newFavorites = { ...data }

			if (newFavorites[icy]) {
				delete newFavorites[icy]
			} else {
				newFavorites[icy] = true
			}
			return newFavorites
		})
	}

	return {
		favorites,
		setFavortes,
		toggleFavorites,
	}
}

function song2Snap(song: Song, url: string): Snap {
	return {
		animeTitle: song.animeTitle || '',
		url,
		time: +new Date(),
		words: Object.keys(song.wordCounts),
		icy: song.icy,
	}
}

export const useSnaps = () => {
	const [snaps, setSnaps] = useLocalStorage<Snap[]>(`snaps`, [])
	const removeSnap = (i) => {
		setSnaps((data) => {
			const newSnaps = [...data]
			newSnaps.splice(i, 1)
			return newSnaps
		})
	}

	const addSnap = (snap: Song, url: string) =>
		setSnaps((data) => [...data, song2Snap(snap, url)])

	return { snaps, addSnap, removeSnap }
}
