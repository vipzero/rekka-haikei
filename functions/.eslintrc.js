module.exports = {
	root: true,
	env: { es6: true, node: true },
	extends: [],
	parserOptions: {
		project: ['tsconfig.json', 'tsconfig.dev.json'],
		sourceType: 'module',
	},
	ignorePatterns: [],
	plugins: ['@typescript-eslint', 'import'],
	rules: {},
}
