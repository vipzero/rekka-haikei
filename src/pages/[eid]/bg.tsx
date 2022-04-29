import dynamic from 'next/dynamic'
import ErrorBoundary from '../../components/ErrorBoundary'
import Layout from '../../components/Layout'
import { events } from '../../config'
import { ProtectFlash } from '../../config/init'

const HomeDynamic = dynamic(async () => import('../../components/HomePage'), {
	ssr: false,
})
const HomePage = () => {
	return (
		<Layout title="vipstream">
			<ErrorBoundary>
				<HomeDynamic />
			</ErrorBoundary>
			<ProtectFlash />
		</Layout>
	)
}

const paths = events.map((e) => ({ params: { eid: e.id } }))

export const getStaticPaths = async () => ({ paths, fallback: false })
export const getStaticProps = async () => ({ props: {} })

export default HomePage
