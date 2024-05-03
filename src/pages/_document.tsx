import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

// @ts-ignore
class NextDocument extends Document {
	render() {
		return (
			<Html lang={'ja'}>
				<Head>
					<link
						href="https://fonts.googleapis.com/css?family=Nova+Mono&display=optional"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Major+Mono+Display&display=optional"
						rel="stylesheet"
					/>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
						integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
						crossOrigin="anonymous"
						referrerPolicy="no-referrer"
					/>
					<link rel="stylesheet" href="https://unpkg.com/open-props" />

					<link
						rel="stylesheet"
						href="https://unpkg.com/open-props/animations.min.css"
					/>

					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin=""
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}

	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}
}

export default NextDocument
