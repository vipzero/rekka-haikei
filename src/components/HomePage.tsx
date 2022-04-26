import React from 'react'
import { Helmet } from 'react-helmet'
import { RecoilRoot } from 'recoil'
import { useEx } from '../hooks/useEx'
import { useSongDb } from '../hooks/useSongDb'
import { useStart } from '../hooks/useStart'
import Address from './HistoryPage/Address'
import Home from './Home'
import { useSettings } from '../hooks/useSettings'
import Head from 'next/head'

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
	const { abyss } = useSettings()

	useEx(song)

	if (!loaded) return <LoadingView />

	return (
		<>
			<Helmet>
				<title>{song.icy}</title>
				<meta name="theme-color" content={abyss} />
			</Helmet>
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
