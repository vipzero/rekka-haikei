import dynamic from 'next/dynamic'

import Layout from '../../components/Layout'
import { getStaticPaths, getStaticProps } from './bg'

export { getStaticPaths, getStaticProps }
const BookPageDynamic = dynamic(
	async () => import('../../components/BookPage'),
	{
		ssr: false,
	}
)

const Page = () => (
	<Layout title="ブックマーク - vipstream">
		<BookPageDynamic />
	</Layout>
)

export default Page
