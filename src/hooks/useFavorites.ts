import { fit } from 'object-fit-math'
import { storageKeys } from '../config'
import { Snap, Song } from '../types'
import { imgCheck } from '../util'
import { updateLocalStorage, useLocalStorage } from './useLocalStorage'
import { useQeuryEid } from './useQueryEid'

export const useFavorites = () => {
	const eid = useQeuryEid()

	return useFavoritesBase(eid)
}

export const useFavoritesBase = (eventId: string) => {
	const [favorites, setFavortes] = useLocalStorage<Record<string, boolean>>(
		`bookmark_${eventId}`,
		{}
	)

	const toggleFavorites = (icy: string) => {
		setFavortes((data) => {
			const newFavorites = { ...data }

			if (newFavorites[icy]) {
				delete newFavorites[icy]
			} else {
				newFavorites[icy] = true
			}
			return newFavorites
		})
	}

	return {
		favorites,
		setFavortes,
		toggleFavorites,
	}
}

function song2Snap(song: Song, url: string): Snap {
	return {
		animeTitle: song.animeTitle || '',
		url,
		time: +new Date(),
		words: Object.keys(song.wordCounts),
		icy: song.icy,
	}
}

const genCanvas = (w: number, h: number) => {
	const canvas = document.createElement('canvas')
	canvas.height = h
	canvas.width = w
	return canvas
}
const packImage = async (url: string) => {
	const img = await imgCheck(url).catch(() => false as const)
	if (!img) return false
	const bw = img.naturalWidth
	const bh = img.naturalHeight
	const rate = 1.618
	const tw = 200
	const th = 200 / rate
	const dp = 0.1 // 余白
	const dpb = 1 - dp
	const { width: ow, height: oh } = fit(
		{ width: bw, height: bh },
		{ width: tw, height: th },
		'contain'
	)

	const w = ow * dpb
	const h = oh * dpb
	const dw = bw - ow * dpb
	const dh = bh - oh * dpb

	//canvasに描画
	const cw = tw
	const ch = th
	const canvas = genCanvas(cw, ch)
	const ctx = canvas.getContext('2d')
	if (!ctx) return false
	const rx = Math.random()
	const ry = Math.random()

	const dx = dw * rx
	const dy = dh * ry

	ctx.drawImage(img, dx, dy, w, h, 0, 0, cw, ch)
	return canvas.toDataURL()
}

export const useSnaps = () => {
	const [snaps, setSnaps] = useLocalStorage<Snap[]>(storageKeys.snaps, [])
	const removeSnap = (i) => {
		setSnaps((data) => {
			const newSnaps = [...data]
			newSnaps.splice(i, 1)
			return newSnaps
		})
	}

	return { snaps, removeSnap }
}

export const addSnap = async (snap: Song, url: string) => {
	const res = await packImage(url)
	if (!res) return false
	updateLocalStorage<Snap[]>(
		storageKeys.snaps,
		(data) => [...data, song2Snap(snap, res)],
		[]
	)

	return true
}
