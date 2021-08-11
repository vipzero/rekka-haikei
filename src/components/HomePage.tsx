import React from 'react'
import { Helmet } from 'react-helmet'
import { RecoilRoot } from 'recoil'
import { useEx } from '../hooks/useEx'
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

	const extraComp = useEx(song)

	if (!loaded) return <LoadingView />

	return (
		<>
			<Helmet>
				<title>{song.icy}</title>
			</Helmet>
			<Home song={song} extraComp={extraComp} />
		</>
	)
}

const RecoilHome = () => (
	<RecoilRoot>
		<HomePage />
	</RecoilRoot>
)

export default RecoilHome
