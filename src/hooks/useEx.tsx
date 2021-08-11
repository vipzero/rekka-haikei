import { useEffect } from 'react'
import { useMemo, useState } from 'react'
import { FloatingBox } from '../components'
import { isSongFull, Song } from '../types'
import { useSettings } from './useSettings'

function getEx(ex: string | false) {
	if (ex === 'nonnon') {
		return (
			<div style={{ height: '50vh' }}>
				<iframe style={{ width: '100%' }} src="https://nyanpass.com/" />
			</div>
		)
	} else if (ex === 'mia') {
		return (
			<div style={{ height: '50vh' }}>
				<iframe
					style={{ width: '100%', height: '100%' }}
					src="https://click.abyss.fun/"
				/>
			</div>
		)
	} else if (ex === 'sakurasou') {
		return (
			<div style={{ height: '30vh' }}>
				<FloatingBox>
					<a href="http://sakurasou.tv/" target="_blanck">
						<img src="/maid-chan.png"></img>
					</a>
				</FloatingBox>
			</div>
		)
	}
	return null
}
export function useEx(song: Song) {
	const { abyss, setAbyss } = useSettings()
	const [abyssStash, setAbyssStash] = useState<string | false>(false) // true (現在の設定保存)

	const exkey = useMemo(() => checkEx(song), [song])

	useEffect(() => {
		const madness = exkey === 'higurashi' || exkey === 'mia'

		if (madness) {
			setAbyss('red')
			setAbyssStash(abyss)
		} else if (exkey === 'sakurasou') {
			setAbyss('#ffdae7')
			setAbyssStash(abyss)
		} else {
			if (abyssStash) setAbyss(abyssStash)
			setAbyssStash(false)
		}
	}, [exkey])

	return useMemo(() => getEx(exkey), [exkey])
}

const has = (q: string, song: Song) => song.animeTitle?.includes(q)
const isNonnon = (s) => has('のんのんびより', s)
const isMaidInAbyss = (s) => has('アビス', s)
const isSakuraso = (s) => has('さくら荘', s)
const isHigurashi = (s) => has('ひぐらしの', s)

export function checkEx(song: Song): string | false {
	if (!isSongFull(song)) return false

	if (isNonnon(song)) {
		return 'nonnon'
	} else if (isMaidInAbyss(song)) {
		return 'mia'
	} else if (isSakuraso(song)) {
		return 'sakurasou'
	} else if (isHigurashi(song)) {
		return 'higurashi'
	}
	return false
}
