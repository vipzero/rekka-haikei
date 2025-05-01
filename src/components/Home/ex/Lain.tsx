import { createGlobalStyle } from 'styled-components'

export const Lain: any = createGlobalStyle<{ r: number }>`
#button-grid-panel {
	grid-template-areas:
		'bp bp bp bp bp bp'
		'_c _c _c _c _c _c' 
		'fd sh bb ss dd _h'
		'fd sh bb ss dd _h'
		'fd vt _d lk la _h'
		'vh vt _d lk la ha'
		'vh vb rr th pp ha'
		'vh vb rr th pp ha'
		'_a _a _a _a pi bi'
		'ts ts ts ts ts ts' !important;

}

* {
	color: hsla(0, 50%, 50%) !important;
}
#bg > div {
	transform: rotate(${(p) => p.r % 360}deg);
}
#mask {
	background: hsla(${(p) => p.r % 256}, 50%, 50%, 0.4);
}
`

export default Lain
