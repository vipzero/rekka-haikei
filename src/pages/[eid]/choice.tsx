import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'

import { SubPageTheme } from '../../config/init'
import { getStaticPaths, getStaticProps } from './bg'

export { getStaticPaths, getStaticProps }
const BgChoice = dynamic(
	async () => import('../../components/BgChoise/BgChoicePage'),
	{
		ssr: false,
	}
)

const Page = () => (
	<Layout title="背景補正 - vipstream">
		<SubPageTheme />
		<BgChoice />
	</Layout>
)

export default Page
