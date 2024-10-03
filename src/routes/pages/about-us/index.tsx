import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<div class="p-8 bg-gray-50 min-h-screen">
			<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 ">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
				<p class="text-lg text-gray-700">
					Welcome to our website! Here’s some static content about our company.
				</p>
			</div>
		</div>
	);
});
