import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import React from 'react'
import config from '../config'

type Props = {}
const GA_TAG = 'UA-49286104-12'
const GA_URL = `https://www.googletagmanager.com/gtag/js?id=${GA_TAG}`
const gaProps = {
	__html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TAG}');
`,
}

class Document extends NextDocument<Props> {
	static async getInitialProps(ctx) {
		const sheet = new StyledComponentSheets()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await NextDocument.getInitialProps(ctx)

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
				<Head />

				<body>
					<Main />
					<NextScript />
					{config.isDev && (
						<>
							<script async src={GA_URL} />
							<script dangerouslySetInnerHTML={gaProps} />
						</>
					)}
				</body>
			</Html>
		)
	}
}

export default Document
