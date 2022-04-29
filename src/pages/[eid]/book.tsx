import BookPage from '../../components/BookPage/BookPage'
import Layout from '../../components/Layout'
import { getStaticPaths, getStaticProps } from './bg'

export { getStaticPaths, getStaticProps }

const Page = () => (
	<Layout title="ブックマーク - vipstream">
		<BookPage />
	</Layout>
)

export default Page
