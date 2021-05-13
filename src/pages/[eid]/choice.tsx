import Layout from '../../components/Layout'
import BgChoice from '../../components/BgChoicePage'
import { getStaticPaths, getStaticProps } from './bg'

export { getStaticPaths, getStaticProps }

const Page = () => (
	<Layout title="背景補正 - vipstream">
		<BgChoice />
	</Layout>
)

export default Page
