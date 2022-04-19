import Head from 'next/head'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../config/init'

type Props = {
	title?: string
	children?: ReactNode
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		<GlobalStyle />

		<Screen>
			<div>
				<main>{children}</main>
			</div>
		</Screen>
	</div>
)

const Screen = styled.div``

export default Layout
