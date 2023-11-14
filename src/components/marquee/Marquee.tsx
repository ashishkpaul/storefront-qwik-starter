import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<div class="overflow-x-hidden">
			<div class="py-1 animate-marquee whitespace-nowrap">
				<span class="text-1xl mx-1">Marquee Item 1</span>
				<span class="text-1xl mx-1">Marquee Item 2</span>
				<span class="text-1xl mx-1">Marquee Item 3</span>
				<span class="text-1xl mx-1">Marquee Item 4</span>
				<span class="text-1xl mx-1">Marquee Item 5</span>
			</div>
		</div>
	);
});
