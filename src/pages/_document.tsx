import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class NextDocument extends Document {
	override render() {
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
						type="text/css"
						href="https://csshake.surge.sh/csshake.min.css"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}

	static override async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				})
			const initialProps = await Document.getInitialProps(ctx)
			// const styles = () => (
			// <div>
			// 	{initialProps.styles}
			// 		{}
			// 	</div>
			// )
			return {
				...initialProps,
				styles: sheet.getStyleElement(),
			}
		} finally {
			sheet.seal()
		}
	}
}

export default NextDocument
