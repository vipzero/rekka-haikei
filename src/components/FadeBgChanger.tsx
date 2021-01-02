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

		if (ok) {
			return url
		}
	}
	return false
}

type Props = {
	urls: string[]
	px: 'right' | 'center' | 'left'
}
function FadeBgChanger({ urls, px }: Props) {
	const [bgStyle, setBg] = useState<string>('')
	const [anime, setAnime] = useState<boolean>(true)
	const [url, setUrl] = useState<string>('')
	const divRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		enableUrl(urls)
			.then((url) => {
				if (url) {
					setUrl(url)
					setAnime(false)
				}
			})
			.catch(() => {})
	}, [urls[0]])

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
