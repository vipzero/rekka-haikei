import { AppProps } from 'next/app'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			/>
			<link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" />
			<meta name="theme-color" content="#000" key="themeColor" />
			<link rel="manifest" href="/manifest.json" />
			<link href="https://cd06e2316155.jp.ngrok.io/x" type="stylesheet" />
			<title>music stream</title>
		</Head>
		<Component {...pageProps} />
	</>
)

export default App
