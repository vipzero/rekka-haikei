import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import Head from 'next/head'
import { FC } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../config/init'
import theme from '../theme'

type Props = {
	title?: string
	hasNavbar?: false
}

const Layout: FC<Props> = ({
	children,
	title = 'This is the default title',
	hasNavbar = true,
}) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<CssBaseline />
		<GlobalStyle />
		<MuiThemeProvider theme={theme}>
			{hasNavbar ? (
				<Screen>
					<div>
						<main>{children}</main>
					</div>
				</Screen>
			) : (
				<main>{children}</main>
			)}
		</MuiThemeProvider>
	</div>
)

const Screen = styled.div``

export default Layout
