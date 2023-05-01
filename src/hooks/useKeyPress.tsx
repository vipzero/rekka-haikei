import { useEffect, useState } from 'react'

export function useKeyPress(targetKey) {
	const [keyPressed, setKeyPressed] = useState<boolean>(false)
	function downHandler({ key, target }: KeyboardEvent) {
		if (target instanceof HTMLTextAreaElement) return

		if (key === targetKey) {
			setKeyPressed(true)
		}
	}
	const upHandler = ({ key, target }) => {
		if (target instanceof HTMLTextAreaElement) return
		if (key === targetKey) {
			setKeyPressed(false)
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', downHandler)
		window.addEventListener('keyup', upHandler)

		return () => {
			window.removeEventListener('keydown', downHandler)
			window.removeEventListener('keyup', upHandler)
		}
	}, [])
	return keyPressed
}

export const useKeyPressToggle = (targetKey, callback) => {
	const keyPressed = useKeyPress(targetKey)

	useEffect(() => {
		callback(keyPressed)
	}, [keyPressed])
}

export const useKeyPressOne = (targetKey, callback) => {
	useKeyPressToggle(targetKey, (keyPressed) => {
		if (!keyPressed) return
		callback(keyPressed)
	})
}
