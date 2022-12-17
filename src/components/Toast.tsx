import React from 'react'
import { ToastContainer } from 'react-toastify'

export const Toast = () => (
	<ToastContainer
		position="bottom-left"
		autoClose={5000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		theme="colored"
	/>
)
