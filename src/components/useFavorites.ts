import { useLocalStorage } from './useLocalStorage'

export const useFavorites = () => {
	const [favorites, setFavortes] = useLocalStorage<Record<string, boolean>>(
		'favorite-songs',
		{}
	)

	const addFavorites = (icy) => {
		setFavortes((data) => ({ ...data, [icy]: true }))
	}
	const removeFavorites = (icy) => {
		setFavortes((data) => {
			const newFavorites = { ...data }

			delete newFavorites[icy]
			return newFavorites
		})
	}
	const toggleFavorites = (icy) => {
		setFavortes((data) => {
			const newFavorites = { ...data }

			if (newFavorites[icy]) {
				delete newFavorites[icy]
			} else {
				favorites[icy] = true
			}
			return newFavorites
		})
	}

	return {
		favorites,
		setFavortes,
		addFavorites,
		removeFavorites,
		toggleFavorites,
	}
}
