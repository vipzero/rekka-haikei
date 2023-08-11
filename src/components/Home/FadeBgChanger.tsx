import { fit } from 'object-fit-math'
import { useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { useMeasure } from 'react-use'
import styled from 'styled-components'
import { useSettingsEe } from '../../hooks/useSettings'
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
	height: '100vh',
	weight: '100vw',
	opacity: 0,
}

type Props = {
	urls: string[]
	sid: number
	lockCount: number
	px: 'right' | 'center' | 'left'
	changedUrl: (url: string) => void
	hasMinImg: boolean
	artwork?: string
}
function FadeBgChanger({
	sid,
	urls,
	px,
	lockCount,
	changedUrl,
	hasMinImg,
	artwork,
}: Props) {
	const [bgStyle, setBg] = useState<string>('')

	const [ref, { width, height }] = useMeasure<HTMLDivElement>()
	const { anime, url, setAnime, size } = useBgs(urls, sid, lockCount, hasMinImg)
	const bgSize = fit(
		{ width, height },
		{ width: size.w, height: size.h },
		'contain'
	)

	const divRef = useRef<HTMLDivElement>(null)
	const { abyss } = useSettingsEe()
	useEffect(() => {
		changedUrl(url)
	}, [url])
	const transBack = artwork ? `url(${artwork})` : bgStyle

	return (
		<SuperBack
			id="bg"
			ref={ref}
			style={{
				backgroundColor: abyss,
				// @ts-ignore
				'--bg-h': `${bgSize.height}px`,
				'--bg-w': `${bgSize.width}px`,
			}}
		>
			<Transition
				in={anime}
				onExited={() => {
					setBg(`url('${url}')`)
					setAnime(true)
				}}
				timeout={duration}
			>
				{(state) => (
					<div
						style={{
							...defaultStyle,
							...transitionStyles[state],
						}}
					>
						<div className="clone" style={{ backgroundImage: transBack }}></div>
						<Background
							id="bg-img"
							ref={divRef}
							style={{
								backgroundImage: bgStyle,
								backgroundSize: 'contain',
								backgroundPositionX: px,
								backgroundPositionY: 'center',
							}}
						>
							<div className="channel r"></div>
							<div className="channel g"></div>
							<div className="channel b"></div>
						</Background>
					</div>
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
	overflow: hidden;
	.clone {
		position: absolute;
		height: 100vh;
		width: 100vw;
		background-size: 176%;
		background-position: 69% 38%;

		top: 0;
		left: 0;
		z-index: -13;
		filter: blur(1vw);
	}
`

const Background = styled.div`
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -10;
`

export default FadeBgChanger
