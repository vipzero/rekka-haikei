import { incFavoritesAll } from '../../service/firebase'
import { useLocalStorage } from './useLocalStorage'

export function useSyncFavorite() {
	const [synced, setSynced] = useLocalStorage<boolean>(
		'synced-favorite-songs-new',
		false
	)
	const doSync = (favorites) => {
		if (synced) return

		incFavoritesAll(Object.keys(favorites))
		setSynced(true)
	}

	return [synced, doSync]
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
