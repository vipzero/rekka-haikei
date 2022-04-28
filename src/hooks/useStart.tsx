import { useEffect, useState } from 'react'
import { History } from '../types'
import { useLocalStorage } from './useLocalStorage'
import { useSugar } from './useSugar'

export function useStart() {
	useSugar()
	const migReady = useMigration()
	useEffect(() => {
		killCache()
	}, [])
	return migReady
}

function useMigration() {
	const [v, setV] = useLocalStorage<number>('version', 0)
	const [ready, setReady] = useState<boolean>(false)

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
		if (v < 5) {
			localStorage.removeItem('hists__2022gw')
			localStorage.removeItem('hists__2021winter')
			localStorage.removeItem('hists__2021obon')
			localStorage.removeItem('hists__2021gw')
			localStorage.removeItem('hists__2020nematu')
		}
		if (v < 6) {
			localStorage.removeItem('theme')
		}
		setV(6)
		setReady(true)
	}, [])
	return ready
}

export function killCache() {
	// if (navigator.serviceWorker) {
	// 	navigator.serviceWorker.getRegistrations().then(function (registrations) {
	// 		for (let registration of registrations) {
	// 			registration.unregister()
	// 		}
	// 	})
	// }
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
