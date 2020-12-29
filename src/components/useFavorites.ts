import { useLocalStorage } from './useLocalStorage'

export const useFavorites = () => {
	const [favorites, setFavortes] = useLocalStorage<Record<string, boolean>>(
		'favorite-songs',
		{}
	)

	const addFavorites = (icy) => {
		const newFavorites = { ...favorites }

		newFavorites[icy] = true
		setFavortes(newFavorites)
	}
	const removeFavorites = (icy) => {
		const newFavorites = { ...favorites }

		delete newFavorites[icy]
		setFavortes(newFavorites)
	}
	const toggleFavorites = (icy) => {
		if (favorites[icy]) {
			removeFavorites(icy)
		} else {
			addFavorites(icy)
		}
	}

	return {
		favorites,
		setFavortes,
		addFavorites,
		removeFavorites,
		toggleFavorites,
	}
}
