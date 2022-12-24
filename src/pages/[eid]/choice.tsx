import Layout from '../../components/Layout'

import { getStaticPaths, getStaticProps } from './bg'
import dynamic from 'next/dynamic'
import { SubPageTheme } from '../../config/init'

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
