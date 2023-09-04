const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./public/**/*.html',
		'./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue,md,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
				mono: ['Azeret Mono', ...defaultTheme.fontFamily.mono],
			},
		},
	},
	plugins: [],
};
