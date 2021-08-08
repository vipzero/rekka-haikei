import { useEffect } from 'react'
import { useSugar } from './useSugar'

export function useStart() {
	useSugar()
	useEffect(() => {
		killCache()
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

	self.addEventListener('install', function (event) {
		// @ts-ignore
		event.waitUntil(skipWaiting())
	})

	self.addEventListener('activate', function (event) {
		// @ts-ignore
		event.waitUntil(self.clients.claim())
		// @ts-ignore
		event.waitUntil(
			caches.keys().then(function (cacheNames) {
				return Promise.all(
					cacheNames.map(function (cacheName) {
						return caches.delete(cacheName)
					})
				)
			})
		)
	})
}
