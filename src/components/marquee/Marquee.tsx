import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<div class="overflow-x-hidden">
			<div class="py-1 animate-marquee whitespace-nowrap">
				<span class="text-1xl mx-1">
					Offers that make you go 'Wow!' Your wallet will thank you.
				</span>
				<span class="text-1xl mx-1">Your wishes delivered. Today. Tomorrow. Always</span>
				{/* <span class="text-1xl mx-1">Your favorite items,</span>
				<span class="text-1xl mx-1">now at unbeatable prices.</span>
				<span class="text-1xl mx-1">Your wishes delivered. Today. Tomorrow. Always.</span> */}
			</div>
		</div>
	);
});
