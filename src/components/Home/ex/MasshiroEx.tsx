import React from 'react'
import styled, { keyframes } from 'styled-components'

const skipping = keyframes`
	0% {
		transform: translate(0%) rotateY(-90deg);
	}
	50% {
		opacity: 1;
		transform: translate(0%) rotateY(90deg);
	}
	51% {
		opacity: 0;
		transform: translate(0%) rotateY(90deg);
	}
	100% {
		opacity: 0;
		transform: translate(0%) rotateY(90deg);
	}
`

const skippingBack = keyframes`
	0% {
		opacity: 0;
		transform: translate(0%) rotateY(-90deg);
	}
	50% {
		opacity: 0;
		transform: translate(0%) rotateY(-90deg);
	}
	51% {
		opacity: 1;
		transform: translate(0%) rotateY(-90deg);
	}
	100% {
		transform: translate(0%) rotateY(90deg);
	}
`

const skippingMove = keyframes`
	0% {
		left: 20%;
	}
	100% {
		left: 60%;
	}
`

const MasshiroExContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 20vw;
	animation: ${skippingMove} 10s linear infinite alternate;
	> div {
		position: relative;
	}
`

const MashiroImage = styled.img`
	width: 100%;
	position: absolute;
	right: 0;
	bottom: 0;
`

const MashiroA = styled(MashiroImage)`
	animation: ${skipping} 2s linear infinite;
`

const MashiroB = styled(MashiroImage)`
	animation: ${skippingBack} 2s linear infinite;
`

export const MasshiroEx = () => (
	<MasshiroExContainer>
		<div>
			<MashiroA id="mashiro-a" src="/static/mashiro-a.png" />
			<MashiroB id="mashiro-b" src="/static/mashiro-b.png" />
		</div>
	</MasshiroExContainer>
)

export default MasshiroEx
