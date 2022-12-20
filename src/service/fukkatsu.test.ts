import { sammonSpell, spell } from './fukkatsu'

import { config } from './protobuf/config.proto'
const { Config } = config
it('config protbuf encode', () => {
	const c = new Config()
	c.showArtwork = true
	c.showBookmark = true
	c.showCounts = true
	c.sideMode = config.Config.SideMode.L
	c.ee = new TextEncoder().encode('aaa,bb,c,d')
	const buf = Config.encode(c).finish()

	expect(Buffer.from(buf).toString('hex')).toMatchInlineSnapshot(
		`"0801100118012800520a6161612c62622c632c64"`
	)
})

it('config protbuf decode', () => {
	const buf = Uint8Array.from(
		Buffer.from('0801100118012800520a6161612c62622c632c64', 'hex')
	)
	const res = Config.decode(buf)

	expect(res.toJSON()).toMatchInlineSnapshot(`
		{
		  "ee": "YWFhLGJiLGMsZA==",
		  "showArtwork": true,
		  "showBookmark": true,
		  "showCounts": true,
		  "sideMode": "L",
		}
	`)
	expect(new TextDecoder().decode(res.ee)).toMatchInlineSnapshot(`"aaa,bb,c,d"`)
})

it('sammonSpell', () => {
	const spell = sammonSpell({
		theme: '',
		showSetting: false,
		showBookmark: false,
		showArtwork: false,
		showCounts: false,
		showHistory: false,
		sideMode: 'r',
		lockBgNum: 0,
		showTool: false,
		showHelp: false,
		feedBackText: '',
		enableFakeBar: 'off',
		abyss: '#fff',
		abyssEx: null,
		ee: { aaa: 1, bb: 1, c: 1, d: 0 },
		eeKey: false,
		eeOpt: null,
		eeSim: false,
		customTheme: '',
		showEmol: false,
	})
	expect(spell).toMatchInlineSnapshot(
		`"㌂㌀㌀㌐㌀㌁㌠㌀㌊㌀㌅㌒㌂㌆㌅㌡㌘㌒㌱㌢㌘㌢㌱㌣"`
	)
})
it('spell', () => {
	expect(spell('㌂㌀㌀㌐㌀㌁㌠㌀㌊㌀㌅㌒㌂㌆㌅㌡㌘㌒㌱㌢㌘㌢㌱㌣'))
		.toMatchInlineSnapshot(`
		{
		  "ee": {
		    "aaa": 1,
		    "bb": 1,
		    "c": 1,
		  },
		  "showArtwork": false,
		  "showBookmark": false,
		  "showCounts": false,
		  "sideMode": "r",
		}
	`)
})
