import Layout from '../../components/Layout'
import History from '../../components/HistoryPage'
import { getStaticPaths, getStaticProps } from './bg'

export { getStaticPaths, getStaticProps }

const HistoryPage = () => (
	<Layout title="履歴 - vipstream">
		<History />
	</Layout>
)

export default HistoryPage
