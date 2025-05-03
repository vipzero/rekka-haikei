import { useMouse } from 'rooks'

// noiseBlink keyframes moved from exStyles.tsx
// The component itself just renders the custom pointer image
export const KokakuEx = () => {
	const mouse = useMouse()

	// Render the global style component along with the pointer
	// Note: GlobalStyle component <KokakuGlobalStyle /> should be rendered once at the root level,
	// not within this component. The styles will be applied globally when the theme/ex is active.
	return (
		// Render only the pointer image. The global style component should be handled elsewhere.
		<img
			id="kokaku-pointer" // ID is used by the global style
			style={{
				position: 'absolute',
				// Add pointerEvents: 'none' to prevent image blocking interactions
				pointerEvents: 'none',
				// Random offset for glitch effect
				top: (mouse.pageY || -100) + Math.random() * 15 - 20,
				left: (mouse.pageX || -100) + Math.random() * 20 - 20,
				// Ensure it's visible when the theme/ex is active (handled by global style)
			}}
			src="/static/sac-min.png"
			alt="" // Add alt text for accessibility
		/>
		// </> // Fragment removed as GlobalStyle is no longer rendered here
	)
}

// export default KokakuEx; // Keep or remove default export based on usage
