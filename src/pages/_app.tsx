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
			<link
				href="https://fonts.googleapis.com/css?family=Nova+Mono&display=optional"
				rel="stylesheet"
			/>
			<link
				href="https://fonts.googleapis.com/css?family=Major+Mono+Display&display=optional"
				rel="stylesheet"
			/>
			<title>vipstream</title>
		</Head>
		<Component {...pageProps} />
	</>
)

export default App
