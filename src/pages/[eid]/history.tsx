import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'
import { SubPageTheme } from '../../config/init'
import { getStaticPaths, getStaticProps } from './bg'

export { getStaticPaths, getStaticProps }
const HistryPageDynamic = dynamic(
	async () => import('../../components/HistoryPage'),
	{
		ssr: false,
	}
)

const HistoryPage = () => (
	<Layout title="履歴 - vipstream">
		<SubPageTheme />
		<HistryPageDynamic />
	</Layout>
)

export default HistoryPage
