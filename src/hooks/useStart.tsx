import { useEffect, useState } from 'react'
import { storageKeys } from '../config'
import { Setting } from '../types'
import { useLocalStorage } from './useLocalStorage'

export function useStart() {
	const migReady = useMigration()
	useEffect(() => {
		killCache()
	}, [])
	return migReady
}
const getSettingsStorage = () =>
	JSON.parse(localStorage.getItem(storageKeys.setting) || '{}')
const setSettingsStorage = (v: Partial<Setting>) =>
	localStorage.setItem(storageKeys.setting, JSON.stringify(v))

function useMigration() {
	const [v, setV] = useLocalStorage<number>('version', 0)
	const [ready, setReady] = useState<boolean>(false)

	useEffect(() => {
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
		if (v < 7) {
			const v = JSON.parse(localStorage.getItem('hists_v2') || '{}')
			delete v['2020nematu']
			delete v['2021gw']
			delete v['2021obon']
			delete v['2021winter']
			localStorage.setItem('hists_v2', JSON.stringify(v))
		}
		if (v < 8) {
			const settings = getSettingsStorage() as Partial<Setting>
			const ee: Record<string, number> = {}
			Object.entries(
				(settings.ee as Record<string, true | number> | undefined) || {}
			).forEach(([k, v]) => {
				ee[k] = v === true ? 1 : v
			})
			if (ee.patema) ee.sakasa = 1

			delete ee.patema

			setSettingsStorage({ ...settings, ee })
		}
		setV(8)
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
