import { $, component$, useSignal } from '@builder.io/qwik';

type Item = {
	title: string;
	content: string;
};

export default component$(({ items }: { items: Item[] }) => {
	// Create a reactive signal to store the expanded item index
	const expandedIndex = useSignal<number | null>(null);

	const toggleItem = $((index: number) => {
		// Wrap the entire function definition with $(fn)
		expandedIndex.value = expandedIndex.value === index ? null : index;
	});

	return (
		<div class="w-full">
			{items.map((item, index) => (
				<div key={index} class="mb-4 border border-gray-200 rounded-md">
					<button
						type="button"
						class="w-full p-4 text-left focus:outline-none hover:bg-gray-100"
						onClick$={() => toggleItem(index)} // Now you can use toggleItem directly
						aria-expanded={index === expandedIndex.value}
						aria-controls={`content-${index}`}
					>
						{item.title}
					</button>
					{index === expandedIndex.value && (
						<div id={`content-${index}`} class="p-4">
							<p>{item.content}</p>
						</div>
					)}
				</div>
			))}
		</div>
	);
});
