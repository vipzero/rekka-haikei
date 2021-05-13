import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'

const HomeDynamic = dynamic(async () => import('../../components/HomePage'), {
	ssr: false,
})
const HomePage = () => {
	return (
		<Layout title="vipstream">
			<HomeDynamic />
		</Layout>
	)
}

export default HomePage
