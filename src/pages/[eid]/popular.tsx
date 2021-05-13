import Layout from '../../components/Layout'
import Popular from '../../components/PopularPage'
import { getStaticPaths, getStaticProps } from './bg'

export { getStaticPaths, getStaticProps }

const Page = () => (
	<Layout title="ブクマ数統計 - vipstream">
		<Popular />
	</Layout>
)

export default Page
