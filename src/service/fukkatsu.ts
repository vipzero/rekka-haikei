import { eeId } from '../components/Home/Cvote/constants'
import { Setting } from '../types'
import { config } from './protobuf/config.proto'

const { Config } = config
const eeToBytes = (s: Setting['ee']): number[] => {
	const b4s: number[] = []
	Object.entries(eeId).forEach(([k, v]) => {
		b4s[v] = s[k] || 0
	})
	return b4s
	// return uint8to4(Uint8Array.from(b4s))
}
const bytesToEe = (ua8: number[]): Setting['ee'] => {
	// const ua8 = uint4to8(ua)
	const s: Setting['ee'] = {}
	Object.entries(eeId).forEach(([k, v]) => {
		s[k] = ua8[v] || 0
	})
	return s
}
const bytesToStr = (b: Uint8Array) => new TextDecoder().decode(b)

export const encodeSetting = (setting: Setting): Uint8Array => {
	const cauldron = new Config()
	cauldron.showArtwork = setting.showArtwork
	cauldron.showBookmark = setting.showBookmark
	cauldron.showCounts = setting.showCounts
	cauldron.sideMode = {
		l: Config.SideMode.L,
		r: Config.SideMode.R,
		wide: Config.SideMode.WIDE,
	}[setting.sideMode]

	cauldron.ee2 = eeToBytes(setting.ee)
	return Config.encode(cauldron).finish()
}

export const decodeSetting = (buf: Uint8Array): Partial<Setting> => {
	const res = Config.decode(buf)
	const sideMode: Setting['sideMode'] | undefined = (
		{
			[Config.SideMode.L]: 'l',
			[Config.SideMode.R]: 'r',
			[Config.SideMode.WIDE]: 'wide',
			[Config.SideMode.BL]: 'bl',
			[Config.SideMode.BW]: 'bw',
			[Config.SideMode.BR]: 'br',
		} as Record<config.Config.SideMode, Setting['sideMode']>
	)[res.sideMode]

	const makeEe = () => {
		const ee: Setting['ee'] = {}
		if (res.ee) {
			bytesToStr(res.ee)
				.split(',')
				.forEach((key) => {
					ee[key] = 1
				})
			return ee
		} else if (res.ee2) {
			return bytesToEe(res.ee2)
		}
		return ee
	}
	const ee: Setting['ee'] = makeEe()

	return {
		showArtwork: res.showArtwork,
		showBookmark: res.showBookmark,
		showCounts: res.showCounts,
		sideMode: sideMode || 'l',
		ee,
	}
}

const point = 'ꔀ'.codePointAt(0) || 0
const codeRange = Math.floor(Math.log2(319)) // 8
const henyoChar = (n: number) => String.fromCodePoint(point + n)
const unHenyo = (s: string) => (s.codePointAt(0) || 0) - point

export const sammonSpell = (setting: Setting): string => {
	const buf = encodeSetting(setting)
	const bits = Array.from(buf)
		.map((b) => b.toString(2).padStart(8, '0'))
		.join('')
	const b6s = bits.match(new RegExp(`.{${codeRange}}`, 'g')) || []

	return Array.from(b6s)
		.map((b) => b.padEnd(codeRange, '0'))
		.map((b) => henyoChar(parseInt(b, 2)))
		.join('')
}

export const uint8to4 = (buf: Uint8Array): Uint8Array => {
	return Uint8Array.from(
		Buffer.from(buf)
			.toString('hex')
			.split('')
			.map((b) => parseInt(b, 16))
	)
}

export const uint4to8 = (buf: Uint8Array): Uint8Array => {
	return Buffer.from(
		[...buf].map((b) => (b % 16).toString(16)).join('') + '0',
		'hex' // 'FF' -> 'F'
	)
}

export const spell = (str: string): Partial<Setting> => {
	const u8s = (
		[...str]
			.map(unHenyo)
			.map((b) => b.toString(2).padStart(codeRange, '0'))
			.join('')
			.match(/.{8}/g) || []
	).map((b) => parseInt(b, 2))
	const buf = new Uint8Array(Array.from(u8s))
	return decodeSetting(buf)
}
export const spellCatch = (str: string): Partial<Setting> | false => {
	try {
		return spell(str)
	} catch {}
	return false
}
