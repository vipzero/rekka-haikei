import Layout from '../../components/Layout'

import { getStaticPaths, getStaticProps } from './bg'
import dynamic from 'next/dynamic'

export { getStaticPaths, getStaticProps }
const BgChoice = dynamic(async () => import('../../components/BgChoicePage'), {
	ssr: false,
})

const Page = () => (
	<Layout title="背景補正 - vipstream">
		<BgChoice />
	</Layout>
)

export default Page
