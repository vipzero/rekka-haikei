import Head from 'next/head'
import { useEffect } from 'react'
import { useNetworkState } from 'react-use'

import { toast } from 'react-toastify'
import { useEx } from '../hooks/useEx'
import { useSettingsCustomTheme, useSettingsEe } from '../hooks/useSettings'
import { useSong } from '../hooks/useSongAtom'
import { useSongDb } from '../hooks/useSongDb'
import { useStart } from '../hooks/useStart'
import Home from './Home'
import { Toast } from './Toast'

function HomePage() {
	const ready = useStart()

	if (!ready) return null
	return <HomePageBase />
}

function HomePageBase() {
	const network = useNetworkState()

	useSongDb(Boolean(network.online))
	const song = useSong()
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
			<Home />
		</>
	)
}

const HomeWrap = () => <HomePage />

export default HomeWrap
