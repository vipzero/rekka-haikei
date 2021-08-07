function ResetWorkerButton() {
	return (
		<button
			onClick={() => {
				navigator.serviceWorker.getRegistration().then((registration) => {
					// @ts-ignore
					registration.unregister()
				})
			}}
		>
			いろいろ修正ボタン
		</button>
	)
}

export default ResetWorkerButton
