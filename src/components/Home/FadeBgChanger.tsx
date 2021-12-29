import React, { useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'
import { useSettings } from '../../hooks/useSettings'
import { useBgs } from './useBgs'

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

type Props = {
	urls: string[]
	sid: number
	lockCount: number
	px: 'right' | 'center' | 'left'
	changedUrl: (url: string) => void
}
function FadeBgChanger({ sid, urls, px, lockCount, changedUrl }: Props) {
	const [bgStyle, setBg] = useState<string>('')
	const { anime, url, setAnime } = useBgs(urls, sid, lockCount)

	const divRef = useRef<HTMLDivElement>(null)
	const { abyss } = useSettings()
	useEffect(() => {
		changedUrl(url)
	}, [url])

	return (
		<SuperBack style={{ backgroundColor: abyss }}>
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
		</SuperBack>
	)
}
const SuperBack = styled.div`
	height: 100vh;
	width: 100vw;
	pointer-events: none;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -10;
`

const Background = styled.div`
	height: 100vh;
	width: 100vw;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -10;
`

export default FadeBgChanger
