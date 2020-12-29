import { createMuiTheme } from '@material-ui/core/styles'
// import lime from '@material-ui/core/colors/lime'

const theme = createMuiTheme({
	palette: {},
	typography: {},
	overrides: {
		MuiPaper: {
			root: {
				padding: '10px',
				marginBottom: '10px',
			},
		},
		MuiSvgIcon: {
			root: {
				marginTop: '5px',
				marginRight: '5px',
			},
		},
		MuiFormControl: {
			root: {
				width: '100%',
			},
		},
	},
	props: {
		MuiButton: {
			variant: 'contained',
		},
	},
})

export default theme
