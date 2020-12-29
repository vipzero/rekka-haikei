import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Transition } from 'react-transition-group'

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

function FadeBgChanger({ urls }: { urls: string[] }) {
	const [bgStyle, setBg] = useState<string>('')
	const [anime, setAnime] = useState<boolean>(true)

	console.log(urls)

	useEffect(() => {
		setAnime(false)
		console.log('changed')
	}, [urls[0]])
	return (
		<Transition
			in={anime}
			onExited={() => {
				setBg(urls.map((v) => `url('${v}')`).join(', '))
				console.log('exited')
				setAnime(true)
			}}
			timeout={duration}
		>
			{(state) => (
				<Background
					style={{
						...defaultStyle,
						...transitionStyles[state],
						background: bgStyle,
						backgroundSize: 'contain',
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
