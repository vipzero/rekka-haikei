import styled from 'styled-components'

import config from '../config'
import Layout from '../components/Layout'

function Home() {
	return <Wrap>はいけい</Wrap>
}

const Wrap = styled.div`
	width: 100vw;
`

const HomePage = () => (
	<Layout title="vipstream">
		<Home />
	</Layout>
)

export default HomePage
