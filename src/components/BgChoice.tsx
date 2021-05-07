import React from 'react'
import styled from 'styled-components'
import { useSongDb } from './useSongDb'

function Page() {
	const [loaded, song, , setBg] = useSongDb()

	if (!loaded) return <p>ちょっとまってね</p>

	return (
		<Wrap>
			{song.imageLinks?.map((link, i) => (
				<div
					key={i}
					onClick={() => {
						if (!confirm('背景を変更しますか？')) return
						setBg(link)
					}}
				>
					<img src={link} />
				</div>
			))}
		</Wrap>
	)
}

const Wrap = styled.div`
	width: 100vw;
	padding: 16px;
	display: flex;
	flex-wrap: wrap;
	div {
		border: solid black 1px;
		cursor: pointer;
		&:first-child {
			border-color: red;
		}
		margin: 4px;
		padding: 2px;
		width: 200px;
	}
	img {
		width: 100%;
	}
`

function BgChoice() {
	return <Page />
}

export default BgChoice
