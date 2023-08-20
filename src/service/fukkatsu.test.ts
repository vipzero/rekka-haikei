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
	expect(res.ee && new TextDecoder().decode(res.ee)).toMatchInlineSnapshot(
		`"aaa,bb,c,d"`
	)
})

it('sammonSpell', () => {
	const spell = sammonSpell({
		theme: '',
		shape: 1,
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
		ee: { sakurasou: 2, susu: 1, mosaic: 0 },
		eeKey: false,
		eeOpt: null,
		eeSim: false,
		customTheme: '',
		showEmol: false,
		blockGif: false,
		eeMemo: {},
		bingo: '',
	})
	expect(spell).toMatchInlineSnapshot(
		`"ꔈꔀꔐꔀꔘꔀꔨꔁꕚꔱꔀꔀꔀꔂꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔁꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀ"`
	)
	// `"ꔈꔀꔐꔀꔘꔀꔨꔁꕚꕚꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀ"`
})
it('spell', () => {
	expect(spell('ꔈꔀꔐꔀꔘꔀꔨꔁꕚꔭꔀꔀꔀꔂꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔁꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀꔀ'))
		.toMatchInlineSnapshot(`
		{
		  "ee": {
		    "ariascarlet": 0,
		    "bobo": 0,
		    "flip": 0,
		    "gaming": 0,
		    "gkgurashi": 0,
		    "gotoyome": 0,
		    "halowa": 0,
		    "higurashi": 0,
		    "issyuukanfr": 0,
		    "jojo": 0,
		    "kokaku": 0,
		    "lain": 0,
		    "masshiro": 0,
		    "masso": 0,
		    "mia": 0,
		    "mosaic": 0,
		    "move": 0,
		    "mts10": 0,
		    "nonnon": 0,
		    "offline": 0,
		    "oregairu": 0,
		    "oreimo": 0,
		    "oreshura": 0,
		    "parapara": 0,
		    "psychopass": 0,
		    "rain": 0,
		    "rainbow": 0,
		    "rozen": 0,
		    "sakasa": 0,
		    "sakurasou": 2,
		    "sao": 0,
		    "spin": 0,
		    "steinsgate": 0,
		    "subetef": 0,
		    "susu": 1,
		  },
		  "showArtwork": false,
		  "showBookmark": false,
		  "showCounts": false,
		  "sideMode": "r",
		}
	`)
})
