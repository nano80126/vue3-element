module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: '2020',
		sourceType: 'module',
		ecmaFeatures: {}
	},
	extends: [
		'./.eslintrc-auto-import.json',
		'eslint:recommended',
		// 'plugin:vue/vue3-recommended',
		'plugin:vue/vue3-essential',
		// 'eslint-config-prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier'
	],
	overrides: [],
	// plugins: ['vue', '@typescript-eslint', 'prettier'],
	// globals: {
	// 	defineProps: 'readonly',
	// 	defineEmits: 'readonly',
	// 	defineExpose: 'readonly',
	// 	withDefaults: 'readonly'
	// },
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['error', 'warn'] }] : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
		// 'prettier/prettier': 1
		// indent: ['error', 4]

		// 'prettier/prettier': ['off', 'intent']
		// 'vue/first-attribute-linebreak': [
		// 	1, // 'warn
		// 	{
		// 		singleline: 'beside',
		// 		multiline: 'beside'
		// 	}
		// ],
		// 'vue/max-attributes-per-line': [
		// 	1, // 'error'
		// 	{
		// 		singleline: {
		// 			max: 10
		// 		},
		// 		multiline: {
		// 			max: 5
		// 		}
		// 	}
		// ]
		// ['warn', { useTabs: true, tabWidth: 1 }]
	}
};
