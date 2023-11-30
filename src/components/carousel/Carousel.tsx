import { component$ } from '@builder.io/qwik';
import CarouselImage from '~/components/carousel/CarouselImage';
import { Collection } from '~/generated/graphql';

interface IProps {
	collections: Collection[];
}

export default component$(({ collections }: IProps) => {
	// Specify the maximum number of items to display in the carousel
	const maxItemsToShow = 3; // Adjust this number based on your needs

	return (
		<div id="default-carousel" class="relative w-full" data-carousel="slide">
			<div class="relative h-48 md:h-64 lg:h-80 xl:h-96 2xl:h-96 overflow-hidden flex items-center justify-center">
				{collections.slice(0, maxItemsToShow).map((collection) => (
					<div
						class="hidden duration-700 ease-in-out md:block"
						data-carousel-item
						key={collection.id}
					>
						<CarouselImage collection={collection} />
					</div>
				))}
			</div>
			{/* Slider indicators */}
			<div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-8 left-1/2">
				{collections.slice(0, maxItemsToShow).map((_, index) => (
					<button
						type="button"
						class="w-3 h-3 rounded-full"
						aria-current={index === 0 ? 'true' : 'false'}
						aria-label={`Slide ${index + 1}`}
						data-carousel-slide-to={index}
						key={index}
					></button>
				))}
			</div>
			{/* Slider controls */}
			<button
				type="button"
				class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
				data-carousel-prev
			>
				{/* Previous button content */}
			</button>
			<button
				type="button"
				class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
				data-carousel-next
			>
				{/* Next button content */}
			</button>
		</div>
	);
});
