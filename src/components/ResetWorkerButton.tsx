function ResetWorkerButton() {
	return (
		<button
			onClick={() => {
				navigator.serviceWorker.getRegistration().then((registration) => {
					// @ts-ignore
					registration.unregister()
				})
				const channel = new MessageChannel()
				// @ts-ignore
				navigator.serviceWorker.controller.postMessage('update', [
					channel.port2,
				])
			}}
		>
			いろいろ修正ボタン
		</button>
	)
}

export default ResetWorkerButton
