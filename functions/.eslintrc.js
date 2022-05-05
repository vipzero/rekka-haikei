module.exports = {
	extends: ['nzap', 'nzap/typescript'],
	root: true,
	env: {
		es6: true,
		node: true,
	},
	ignorePatterns: [
		'/lib/**/*', // Ignore built files.
	],
}
