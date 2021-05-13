import dynamic from 'next/dynamic'
import Layout from '../../components/Layout'
import { events } from '../../config'

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

const paths = events.map((e) => ({ params: { eid: e.id } }))

export const getStaticPaths = async () => ({ paths, fallback: false })
export const getStaticProps = async () => ({ props: {} })

export default HomePage
