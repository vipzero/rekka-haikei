import Head from 'next/head'
import React, { useEffect } from 'react'
import { useNetworkState } from 'react-use'
import { RecoilRoot } from 'recoil'
import { useEx } from '../hooks/useEx'
import { useSettingsCustomTheme, useSettingsEe } from '../hooks/useSettings'
import { useSongDb, YoProvider } from '../hooks/useSongDb'
import { useStart } from '../hooks/useStart'
import Home from './Home'
import { Toast } from './Toast'
import { toast } from 'react-toastify'

function HomePage() {
	const ready = useStart()

	if (!ready) return null
	return <HomePageBase />
}

function HomePageBase() {
	const network = useNetworkState()

	const [loaded, song] = useSongDb(Boolean(network.online))
	const { abyss, setEekey } = useSettingsEe()
	const { customTheme } = useSettingsCustomTheme()

	useEx(song)
	useEffect(() => {
		if (!network.online) {
			toast.error('インターネットが壊れています', { autoClose: false })
			setEekey('offline')
		}
	}, [network.online])

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
