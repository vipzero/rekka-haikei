import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout'

const HomeDynamic = dynamic(async () => import('../components/HomePage'), {
	ssr: false,
})
const HomePage = () => {
	const router = useRouter()
	const { eid } = router.query

	console.log({ eid })

	return (
		<Layout title="vipstream">
			<HomeDynamic />
		</Layout>
	)
}

export default HomePage
