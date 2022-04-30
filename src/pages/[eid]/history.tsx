import Layout from '../../components/Layout'
import { getStaticPaths, getStaticProps } from './bg'
import dynamic from 'next/dynamic'
import { SubPageTheme } from '../../config/init'

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
