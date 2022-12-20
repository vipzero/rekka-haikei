import { fukkatsu } from './fukkatsu'
import { config } from './protobuf/config.proto'
const { Config } = config

it('fukkatsu', (t) => {
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

it('fukkatsu2', (t) => {
	const buf = Uint8Array.from(
		Buffer.from('0801100118012800520a6161612c62622c632c64', 'hex')
	)
	const res = Config.decode(buf)

	expect(res.toJSON()).toMatchInlineSnapshot(`
		Object {
		  "ee": "YWFhLGJiLGMsZA==",
		  "showArtwork": true,
		  "showBookmark": true,
		  "showCounts": true,
		  "sideMode": "L",
		}
	`)
	expect(new TextDecoder().decode(res.ee)).toMatchInlineSnapshot(`"aaa,bb,c,d"`)
})
