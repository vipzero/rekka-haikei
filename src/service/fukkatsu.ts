import { Setting } from '../types'
import { config } from './protobuf/config.proto'

const { Config } = config
const strToBytes = (s: string) => new TextEncoder().encode(s)
const bytesToStr = (b: Uint8Array) => new TextDecoder().decode(b)

export const sammonSpell = (setting: Setting): string => {
	const cauldron = new Config()
	cauldron.showArtwork = setting.showArtwork
	cauldron.showBookmark = setting.showBookmark
	cauldron.showCounts = setting.showCounts
	cauldron.sideMode = {
		l: config.Config.SideMode.L,
		r: config.Config.SideMode.R,
		wide: config.Config.SideMode.WIDE,
	}[setting.sideMode]
	const eeLine = Object.entries(setting.ee)
		.filter(([k, v]) => v > 0)
		.map(([k, v]) => k)
		.join(',')

	cauldron.ee = strToBytes(eeLine)
	const buf = Config.encode(cauldron).finish()
	console.log(buf.length)
	console.log(buf.byteLength)

	return bytesToStr(buf)
}

export const fukkatsu = (str: string): Buffer => {
	return Buffer.from([])
}
