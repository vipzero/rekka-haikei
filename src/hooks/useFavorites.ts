import { Snap, Song } from '../types'
import { imgCheck } from '../util'
import { useLocalStorage } from './useLocalStorage'
import { useQeuryEid } from './useQueryEid'
import pica from 'pica'

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
	const isHorizonalLong = bw < bh * rate
	const dp = 0.1 // 余白
	const dpb = 1 - dp
	const [w, h, dw, dh] = isHorizonalLong
		? [bw * dpb, (bw / rate) * dpb, bw * dp, bh - bw / rate + bh * dp]
		: [bh * rate * dpb, bh * dpb, bw - bh * rate + bw * dp, bh * dp] // [w, h, 余白, 余白]
	console.log({ isHorizonalLong })
	console.log({ w, h, dw, dh })
	console.log({ bw, bh })

	//canvasに描画
	const canvas = genCanvas(w, h)
	const ctx = canvas.getContext('2d')
	if (!ctx) return false
	const rx = Math.random()
	const ry = Math.random()

	const dx = dw * rx
	const dy = dh * ry

	ctx.drawImage(img, dx, dy, w, h, 0, 0, w, h)

	const canvas2 = genCanvas(tw, th)

	const res = await pica().resize(canvas, canvas2)
	return res.toDataURL()
}

export const useSnaps = () => {
	const [snaps, setSnaps] = useLocalStorage<Snap[]>(`snaps`, [])
	const removeSnap = (i) => {
		setSnaps((data) => {
			const newSnaps = [...data]
			newSnaps.splice(i, 1)
			return newSnaps
		})
	}

	const addSnap = async (snap: Song, url: string) => {
		const res = await packImage(url)
		if (!res) return false
		setSnaps((data) => [...data, song2Snap(snap, res)])
		return true
	}

	return { snaps, addSnap, removeSnap }
}
