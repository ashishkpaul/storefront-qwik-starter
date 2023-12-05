const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
	theme: {
		extend: {
			colors: {
				primary: colors.blue,
			},
			animation: {
				marquee: 'marquee 25s linear infinite',
			},
			keyframes: {
				marquee: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
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
