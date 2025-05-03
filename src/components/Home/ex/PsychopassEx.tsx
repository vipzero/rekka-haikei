import React from 'react'
import { createGlobalStyle, keyframes, css } from 'styled-components'
import { psychopassExStyles } from './PsychopassEx.styles'

// noiseBlink keyframes moved from exStyles.tsx
const noiseBlink = keyframes`
  0% {
    opacity: 1;
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

// Global styles for psychopass theme and ex
export const PsychopassGlobalStyle = css`
	body[data-theme='codegeass'] {
		${psychopassExStyles}
	}
`

// The component itself
export const PsychopassEx = () => {
	// Unlike KokakuEx, this component doesn't need to render any visual elements
	// It just applies the global styles when the theme is active
	return null
}

// export default PsychopassEx; // Keep or remove default export based on usage
