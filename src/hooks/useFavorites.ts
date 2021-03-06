import { incFavoritesAll } from '../../service/firebase'
import { useLocalStorage } from './useLocalStorage'
import { useQeuryEid } from './useQueryEid'

export function useSyncFavorite() {
	const eventId = useQeuryEid()
	const [synced, setSynced] = useLocalStorage<boolean>(
		'synced-favorite-0',
		false
	)
	const doSync = async (favorites: Record<string, boolean>) => {
		if (synced) return

		setSynced(true)
		await incFavoritesAll(eventId, Object.keys(favorites))
	}

	return [synced, doSync] as const
}

export const useFavorites = () => {
	const [favorites, setFavortes] = useLocalStorage<Record<string, boolean>>(
		'favorite-songs',
		{}
	)

	const toggleFavorites = (icy) => {
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
