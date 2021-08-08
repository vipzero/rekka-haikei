import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'

type Props = {}
class NextDocument extends Document<Props> {
	static async getInitialProps(ctx) {
		const sheet = new StyledComponentSheets()
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
	setGoogleTags() {
		return
	}
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
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default NextDocument
