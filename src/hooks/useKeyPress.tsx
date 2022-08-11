import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function useKeyPress(targetKey) {
	const [keyPressed, setKeyPressed] = useState<boolean>(false)
	function downHandler({ key }) {
		if (key === targetKey) {
			setKeyPressed(true)
		}
	}
	const upHandler = ({ key }) => {
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

export const useKeyPressChange = (targetKey, callback) => {
	const keyPressed = useKeyPress(targetKey)
	// const firstUpdate = useRef(true)
	// useLayoutEffect(() => {
	// 	if (firstUpdate.current) {
	// 		firstUpdate.current = false
	// 		return
	// 	}
	// })

	useEffect(() => {
		if (!keyPressed) return
		callback(keyPressed)
	}, [keyPressed])
}
