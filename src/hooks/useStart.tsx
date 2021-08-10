import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useQeuryEid } from './useQueryEid'
import { useSugar } from './useSugar'

export function useStart() {
	useSugar()
	useMigration()
	useEffect(() => {
		killCache()
	}, [])
}

function useMigration() {
	const [v, setV] = useLocalStorage<number>('version', 0)
	const [favorites, setFavortes] = useLocalStorage<Record<string, boolean>>(
		`favorite-songs`,
		{}
	)
	const [, setFavortes2] = useLocalStorage<Record<string, boolean>>(
		`bookmark_2021obon`,
		{}
	)
	useEffect(() => {
		if (v < 1) {
			if (Object.keys(favorites).length > 0) {
				setFavortes({})
				setFavortes2(favorites)
			}
		}
		setV(1)
	}, [])
}

export function killCache() {
	if (navigator.serviceWorker) {
		navigator.serviceWorker.getRegistrations().then(function (registrations) {
			for (let registration of registrations) {
				registration.unregister()
			}
		})
	}

	// self.addEventListener('install', function (event) {
	// 	// @ts-ignore
	// 	event.waitUntil(skipWaiting())
	// })

	// self.addEventListener('activate', function (event) {
	// 	// @ts-ignore
	// 	event.waitUntil(self.clients.claim())
	// 	// @ts-ignore
	// 	event.waitUntil(
	// 		caches.keys().then(function (cacheNames) {
	// 			return Promise.all(
	// 				cacheNames.map(function (cacheName) {
	// 					return caches.delete0j(cacheName)
	// 				})
	// 			)
	// 		})
	// 	)
	// })
}
