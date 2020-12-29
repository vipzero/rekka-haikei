import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

const HomeDynamic = dynamic(async () => import('../components/HomeContainer'), {
	ssr: false,
})
const HomePage = () => (
	<Layout title="vipstream">
		<HomeDynamic />
	</Layout>
)

export default HomePage
