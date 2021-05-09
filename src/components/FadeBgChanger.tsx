import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { Transition } from 'react-transition-group'
import { imgCheck } from '../util'

const duration = 1000
const transitionStyles = {
	entering: { opacity: 1 },
	entered: { opacity: 1 },
	exiting: { opacity: 0 },
	exited: { opacity: 0 },
}

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0,
}

async function enableUrl(urls: string[]) {
	for (const url of urls) {
		const ok = await imgCheck(url).catch(() => false)

		if (ok) return url
	}
	return false
}

function useBgs(urls: string[], sid: number, lockCount: number) {
	const [anime, setAnime] = useState<boolean>(true)
	const [url, setUrl] = useState<string>('')
	const [lock, setLock] = useState<number>(lockCount)

	useEffect(() => {
		setLock(lockCount)
	}, [sid, lockCount])

	const locked = lock === 0

	useEffect(() => {
		if (locked) return

		enableUrl(urls)
			.then((url) => {
				if (url) {
					setUrl(url)
					setAnime(false)
					setLock((v) => v - 1)
				}
			})
			.catch(() => {})
	}, [urls[0], locked])
	return { anime, url, setAnime }
}

type Props = {
	urls: string[]
	sid: number
	lockCount: number
	px: 'right' | 'center' | 'left'
}
function FadeBgChanger({ sid, urls, px, lockCount }: Props) {
	const [bgStyle, setBg] = useState<string>('')
	const { anime, url, setAnime } = useBgs(urls, sid, lockCount)
	const divRef = useRef<HTMLDivElement>(null)

	return (
		<Transition
			in={anime}
			onExited={() => {
				setBg(`url('${url}')`)
				setAnime(true)
			}}
			timeout={duration}
		>
			{(state) => (
				<Background
					ref={divRef}
					style={{
						...defaultStyle,
						...transitionStyles[state],
						backgroundImage: bgStyle,
						backgroundSize: 'contain',
						backgroundPositionX: px,
						backgroundPositionY: 'center',
					}}
				/>
			)}
		</Transition>
	)
}

const Background = styled.div`
	height: 100vh;
	width: 100vw;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
`

export default FadeBgChanger
