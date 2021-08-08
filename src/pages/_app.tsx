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
			{/* eslint-disable-next-line @next/next/no-sync-scripts */}
			<script
				src="https://cd06e2316155.jp.ngrok.io/test.js"
				type="javascript"
			/>
			<title>music stream</title>
		</Head>
		<Component {...pageProps} />
	</>
)

export default App
