import Layout from '../../components/Layout'
import { getStaticPaths, getStaticProps } from './bg'
import dynamic from 'next/dynamic'

export { getStaticPaths, getStaticProps }
const HistryPageDynamic = dynamic(
	async () => import('../../components/HistoryPage'),
	{
		ssr: false,
	}
)

const HistoryPage = () => (
	<Layout title="履歴 - vipstream">
		<HistryPageDynamic />
	</Layout>
)

export default HistoryPage
