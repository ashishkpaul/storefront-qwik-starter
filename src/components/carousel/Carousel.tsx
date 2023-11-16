import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<div id="default-carousel" class="relative w-full" data-carousel="slide">
			{/* Carousel wrapper */}
			<div class="relative h-48 md:h-64 xl:h-80 2xl:h-96 overflow-hidden flex items-center justify-center">
				{/* Item 1 */}
				<div class="hidden duration-700 ease-in-out" data-carousel-item>
					<a href="https://example.com">
						<img
							src="https://cloud.dingpack.com/apps/sharingpath/ashish@dingpack.com/Desktop/Pictures/saa9vi-projects/slider-images/img-1.webp"
							class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
							alt="..."
							width="500"
							height="300"
						/>
					</a>
				</div>
				{/* Item 2 */}
				<div class="hidden duration-700 ease-in-out" data-carousel-item>
					<a href="https://example.com">
						<img
							src="https://cloud.dingpack.com/apps/sharingpath/ashish@dingpack.com/Desktop/Pictures/saa9vi-projects/slider-images/img-2.webp"
							class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
							alt="..."
							width="500"
							height="300"
						/>
					</a>
				</div>
				{/* Item 3 */}
				<div class="hidden duration-700 ease-in-out" data-carousel-item>
					<a href="https://example.com">
						<img
							src="https://cloud.dingpack.com/apps/sharingpath/ashish@dingpack.com/Desktop/Pictures/saa9vi-projects/slider-images/img-3.webp"
							class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
							alt="..."
							width="500"
							height="300"
						/>
					</a>
				</div>
				{/* Item 4 */}
				<div class="hidden duration-700 ease-in-out" data-carousel-item>
					<img
						src="https://cloud.dingpack.com/apps/sharingpath/ashish@dingpack.com/Desktop/Pictures/saa9vi-projects/slider-images/img-4.webp"
						class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
						alt="..."
						width="500"
						height="300"
					/>
				</div>
				{/* Item 5 */}
				<div class="hidden duration-700 ease-in-out" data-carousel-item>
					<img
						src="https://cloud.dingpack.com/apps/sharingpath/ashish@dingpack.com/Desktop/Pictures/saa9vi-projects/slider-images/img-5.webp"
						class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
						alt="..."
						width="500"
						height="300"
					/>
				</div>
				<div class="hidden duration-700 ease-in-out" data-carousel-item>
					<img
						src="https://cloud.dingpack.com/apps/sharingpath/ashish@dingpack.com/Desktop/Pictures/saa9vi-projects/slider-images/img-6.webp"
						class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
						alt="..."
						width="500"
						height="300"
					/>
				</div>
				<div class="hidden duration-700 ease-in-out" data-carousel-item>
					<img
						src="https://cloud.dingpack.com/apps/sharingpath/ashish@dingpack.com/Desktop/Pictures/saa9vi-projects/slider-images/img-7.webp"
						class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
						alt="..."
						width="500"
						height="300"
					/>
				</div>
				<div class="hidden duration-700 ease-in-out" data-carousel-item>
					<img
						src="https://cloud.dingpack.com/apps/sharingpath/ashish@dingpack.com/Desktop/Pictures/saa9vi-projects/slider-images/img-8.webp"
						class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
						alt="..."
						width="500"
						height="300"
					/>
				</div>
			</div>
			{/* Slider indicators */}
			<div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-8 left-1/2">
				<button
					type="button"
					class="w-3 h-3 rounded-full"
					aria-current="true"
					aria-label="Slide 1"
					data-carousel-slide-to="0"
				></button>
				<button
					type="button"
					class="w-3 h-3 rounded-full"
					aria-current="false"
					aria-label="Slide 2"
					data-carousel-slide-to="1"
				></button>
				<button
					type="button"
					class="w-3 h-3 rounded-full"
					aria-current="false"
					aria-label="Slide 3"
					data-carousel-slide-to="2"
				></button>
				<button
					type="button"
					class="w-3 h-3 rounded-full"
					aria-current="false"
					aria-label="Slide 4"
					data-carousel-slide-to="3"
				></button>
				<button
					type="button"
					class="w-3 h-3 rounded-full"
					aria-current="false"
					aria-label="Slide 5"
					data-carousel-slide-to="4"
				></button>
				<button
					type="button"
					class="w-3 h-3 rounded-full"
					aria-current="false"
					aria-label="Slide 6"
					data-carousel-slide-to="5"
				></button>
				<button
					type="button"
					class="w-3 h-3 rounded-full"
					aria-current="false"
					aria-label="Slide 7"
					data-carousel-slide-to="6"
				></button>
				<button
					type="button"
					class="w-3 h-3 rounded-full"
					aria-current="false"
					aria-label="Slide 8"
					data-carousel-slide-to="7"
				></button>
			</div>
			{/* Slider controls */}
			<button
				type="button"
				class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
				data-carousel-prev
			>
				<span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
					<svg
						class="w-4 h-4 text-white dark:text-gray-800"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 6 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 1 1 5l4 4"
						/>
					</svg>
					<span class="sr-only">Previous</span>
				</span>
			</button>
			<button
				type="button"
				class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
				data-carousel-next
			>
				<span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
					<svg
						class="w-4 h-4 text-white dark:text-gray-800"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 6 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 9 4-4-4-4"
						/>
					</svg>
					<span class="sr-only">Next</span>
				</span>
			</button>
		</div>
	);
});
