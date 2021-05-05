import { useEffect } from 'react'
import {
	incFavoritesAll,
	incFavorites,
	decFavorites,
} from '../../service/firebase'
import { useLocalStorage } from './useLocalStorage'

export const useFavorites = () => {
	const [favorites, setFavortes] = useLocalStorage<Record<string, boolean>>(
		'favorite-songs',
		{}
	)
	const [synced, setSynced] = useLocalStorage<boolean>(
		'synced-favorite-songs',
		false
	)

	useEffect(() => {
		if (synced) return

		incFavoritesAll(Object.keys(favorites))
		setSynced(true)
	}, [synced])

	const toggleFavorites = (icy) => {
		setFavortes((data) => {
			const newFavorites = { ...data }

			if (newFavorites[icy]) {
				delete newFavorites[icy]
				decFavorites(icy)
			} else {
				newFavorites[icy] = true
				incFavorites(icy)
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
