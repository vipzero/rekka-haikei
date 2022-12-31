import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const updateLocalStorage = <T = unknown>(
	key: string,
	value: SetStateAction<T>,
	initialValue: T
) => saveLocalStorage(key, value, getLocalStorage(key, initialValue))

export function getLocalStorage<T = unknown>(key: string, initialValue: T) {
	if (typeof window === 'undefined') return initialValue
	try {
		const item = window.localStorage.getItem(key)

		return item ? (JSON.parse(item) as T) : initialValue
	} catch (error) {
		return initialValue
	}
}

export function saveLocalStorage<T = unknown>(
	key: string,
	value: SetStateAction<T>,
	initialValue: T
): { ok: boolean; value: T } {
	try {
		if (typeof window === 'undefined') return { ok: false, value: initialValue }
		const valueToStore = value instanceof Function ? value(initialValue) : value

		window.localStorage.setItem(key, JSON.stringify(valueToStore))
		return { value: valueToStore, ok: true }
	} catch (error) {
		console.log(error)
	}
	return { ok: false, value: initialValue }
}

export function useLocalStorage<T = unknown>(
	key: string,
	initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
	const [storedValue, setStoredValue] = useState<T>(() =>
		getLocalStorage(key, initialValue)
	)

	const setValue = (value: SetStateAction<T>) => {
		const res = saveLocalStorage(key, value, storedValue)
		if (res.ok) {
			setStoredValue(res.value)
		}
	}
	useEffect(() => {
		return () => {
			// NOTE: read が上手く行かないパターンがあるので OFF
			// setStoredValue(initialValue)
		}
	}, [key])

	return [storedValue, setValue]
}
