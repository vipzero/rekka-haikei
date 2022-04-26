import { AppProps } from 'next/app'
import Head from 'next/head'

const APP_NAME = 'rekka haikei'
const APP_DESCRIPTION = 'music stream'

const App = ({ Component, pageProps }: AppProps<{}>) => (
	<>
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			/>
			<link
				rel="shortcut icon"
				href="/icons/icon-512x512.png"
				key="shortcutIcon"
			/>
			<link rel="manifest" href="/manifest.json" />
			<title>music stream</title>
			<meta name="application-name" content={APP_NAME} />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="apple-mobile-web-app-status-bar-style" content="default" />
			<meta name="apple-mobile-web-app-title" content={APP_NAME} />
			<meta name="description" content={APP_DESCRIPTION} />
			<meta name="format-detection" content="telephone=no" />
			<meta name="mobile-web-app-capable" content="yes" />
			<meta name="theme-color" content="#fff" key="themeColor" />
			{/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
			{/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}

			<link
				rel="apple-touch-icon"
				sizes="192x192"
				href="/icons/icon-192x192.png"
			/>
		</Head>
		<Component {...pageProps} />
	</>
)

export default App
