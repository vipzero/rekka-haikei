// @ts-ignore

import React, { PropsWithChildren } from 'react'

type State = { hasError: boolean }
class ErrorBoundary extends React.Component<PropsWithChildren<{}>, State> {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		console.error(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return <h3>エラー中。。</h3>
		}

		return this.props.children
	}
}

export default ErrorBoundary
