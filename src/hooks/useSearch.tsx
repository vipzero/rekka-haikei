import { incFavoritesAll } from '../../service/firebase'
import { useLocalStorage } from './useLocalStorage'
import { useQeuryEid } from './useQueryEid'

type Search = {
	q: string
	multi: boolean
}
export const useSearch = () => {
	const [searchs, setSearchs] = useLocalStorage<Search[]>(`search`, [])

	const addSearch = (nq: Search) => {
		setSearchs([nq, ...drop(searchs, nq)].slice(0, 10))
	}
	const drop = (searchs: Search[], v: Search) =>
		searchs.filter((e) => !(e.multi === v.multi && e.q === v.q))
	const delSearch = (nq: Search) => setSearchs(drop(searchs, nq))
	const delAllSearchs = () => setSearchs([])

	return {
		searchs,
		addSearch,
		delSearch,
		delAllSearchs,
	}
}
