import Head from 'next/head'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { useEx } from '../hooks/useEx'
import { useSettingsEe } from '../hooks/useSettings'
import { useSongDb } from '../hooks/useSongDb'
import { useStart } from '../hooks/useStart'
import Address from './HistoryPage/Address'
import Home from './Home'

const LoadingView = () => (
	<div>
		<span>{'■■■■■■■■■■□□□ NOWLOADING'}</span>
		<Address />
	</div>
)

function HomePage() {
	const ready = useStart()

	if (!ready) return null
	return <HomePageBase />
}

function HomePageBase() {
	const [loaded, song] = useSongDb()
	const { abyss } = useSettingsEe()

	useEx(song)

	return (
		<>
			<Head>
				<title>{song.icy}</title>
				<meta name="theme-color" content={abyss} />
			</Head>
			<Home song={song} />
		</>
	)
}

const RecoilHome = () => (
	<RecoilRoot>
		<HomePage />
	</RecoilRoot>
)

export default RecoilHome
