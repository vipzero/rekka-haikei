import { AppProps } from 'next/app'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps<{}>) => (
	<>
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			/>
			<link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" />
			<meta name="theme-color" content="#000" key="themeColor" />
			<link rel="manifest" href="/manifest.json" />
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
				integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
				crossOrigin="anonymous"
				referrerPolicy="no-referrer"
			/>
			{/* eslint-disable-next-line @next/next/no-sync-scripts */}
			<title>music stream</title>
		</Head>
		<Component {...pageProps} />
	</>
)

export default App
