import { createGlobalStyle, keyframes } from 'styled-components'

const noise = keyframes`
  0% {
    opacity: 0.5;
    transform: rotate(-5deg) translate(-10%, 5%);
  }
  25% {
    transform: rotate(1deg);
  }
  50% {
    opacity: 0.75;
  }
  51% {
    opacity: 0;
  }
  52% {
    opacity: 0.75;
    transform: translate(5%, 0%);
  }
  75% {
    transform: rotate(-2deg);
  }
  100% {
    opacity: 1;
    transform: rotate(5deg) translate(0%, -10%);
  }
`

export const Lain: any = createGlobalStyle<{ r: number }>`
  /* Styles moved from exStyles.tsx for data-theme='lain' */
  body[data-theme='lain'] {
    * {
      color: hsla(0, 50%, 50%) !important;
    }

    #mask {
      display: block;
      background: hsla(${(p) => p.r % 256}, 50%, 50%, 0.4);
    }

    #bg > div {
      transform: rotate(${(p) => p.r % 360}deg);
    }

    span,
    a {
      /* width: max-content; */
      animation-name: ${noise};
      animation-direction: alternate;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-duration: 8s;
    }

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
  }
`

// export default Lain; // Assuming Lain is only used as GlobalStyle
