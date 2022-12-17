import Head from 'next/head'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { useEx } from '../hooks/useEx'
import { useSettingsCustomTheme, useSettingsEe } from '../hooks/useSettings'
import { useSongDb, YoProvider } from '../hooks/useSongDb'
import { useStart } from '../hooks/useStart'
import Home from './Home'
import { Toast } from './Toast'

const LoadingView = () => (
	<div>
		<span>{'■■■■■■■■■■□□□ NOWLOADING'}</span>
		{/* <Address /> */}
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
	const { customTheme } = useSettingsCustomTheme()

	useEx(song)
	if (!loaded) return <LoadingView />

	return (
		<>
			<Head>
				<title>{song.icy}</title>
				<meta name="theme-color" content={abyss} />
			</Head>
			<style>{customTheme}</style>
			<Toast />
			<Home song={song} />
		</>
	)
}

const RecoilHome = () => (
	<RecoilRoot>
		<YoProvider>
			<HomePage />
		</YoProvider>
	</RecoilRoot>
)

export default RecoilHome
