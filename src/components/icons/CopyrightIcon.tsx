import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			class="h-6 w-6" // Set the desired size here (e.g., h-24 w-24 for 24x24)
		>
			<rect width="256" height="256" fill="none" />
			<circle
				cx="128"
				cy="128"
				r="96"
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="12"
			/>
			<path
				d="M160,152a40,40,0,1,1,0-48"
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="12"
			/>
		</svg>
	);
});
