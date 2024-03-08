import { component$ } from '@builder.io/qwik';

export const DealsLink = component$(() => {
	return (
		<a href="#" aria-label="View source on GitHub">
			<svg
				width="50"
				height="50"
				viewBox="0 0 24 24"
				style="background: linear-gradient(to right, #FF5733, #FFC300); color: #fff; position: absolute; top: 0; border: 0; right: 0;"
				aria-hidden="true"
			>
				<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
				<path
					d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
					fill="currentColor"
					style="transform-origin: 130px 106px;"
				></path>
				<path
					d="M11 6h3l3.29-3.3a1 1 0 0 1 1.42 0l2.58 2.59a1 1 0 0 1 0 1.41L19 9h-8v2a1 1 0 0 1-1 1a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2m-6 5v4l-2.29 2.29a1 1 0 0 0 0 1.41l2.58 2.59a1 1 0 0 0 1.42 0L11 17h4a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1v-1h-7v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9Z"
					fill="currentColor"
				></path>
			</svg>
		</a>
	);
});
