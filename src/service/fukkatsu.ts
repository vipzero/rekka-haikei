import { Setting } from '../types'
import { config } from './protobuf/config.proto'

const { Config } = config
const strToBytes = (s: string) => new TextEncoder().encode(s)
const bytesToStr = (b: Uint8Array) => new TextDecoder().decode(b)

export const settingToBuf = (setting: Setting): Uint8Array => {
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
	return Config.encode(cauldron).finish()
}

const henyoChar = (n: number) => String.fromCodePoint(0x3300 + n)

export const sammonSpell = (setting: Setting): string => {
	const buf = settingToBuf(setting)
	const bits = Array.from(buf)
		.map((b) => b.toString(2).padStart(8, '0'))
		.join('')
	const b6s = bits.match(/.{6}/g)
	if (!b6s) throw new Error('b6s is null')

	return Array.from(b6s)
		.map((b) => b.padEnd(6, '0'))
		.map((b) => henyoChar(parseInt(b, 2)))
		.join('')
}

export const spell = (str: string): string => {}

export const fukkatsu = (str: string): Buffer => {
	return Buffer.from([])
}
