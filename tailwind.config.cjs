const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
	theme: {
		extend: {
			colors: {
				primary: colors.orange,
			},
		},
		variants: {
			extend: {
				opacity: ['disabled'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms', 'flowbite/plugin')],
};
