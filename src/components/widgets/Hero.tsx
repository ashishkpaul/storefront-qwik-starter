import { component$, useContext } from '@builder.io/qwik';
import { Slider } from 'qwik-slider';
import { APP_STATE } from '~/constants';
import CarouselImageCard from '../../components/carousel/CarouselImageCard';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;
	const sliderSettingsOne = {
		scrollSpeed: 1,
		autoScroll: true,
		autoScrollSpeed: 10,
		gap: 25,
		styleClass: 'test',
		breakpoints: {
			sm: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			md: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			lg: {
				slidesPerView: 3,
				spaceBetween: 25,
			},
		},
	};

	return (
		<section class="relative md:-mt-[76px] not-prose">
			<div class="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
			<div class="relative max-w-full mx-auto px-4 sm:px-6">
				<div class="pt-0 md:pt-[76px] pointer-events-none"></div>
				<div class="py-12 md:py-20 lg:py-0 lg:flex lg:items-center lg:gap-8">
					<div class="w-full lg:w-1/2 text-center lg:text-left pb-10 md:pb-16 mx-auto">
						<h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-700">
							Join the <span class="text-[#039de1]">Marketplace</span>,{' '}
							<br class="hidden lg:block" />{' '}
							<span class="hidden lg:inline">Host Your Commerce on</span>
							<span class="sm:whitespace-nowrap text-[#039de1]"> Your Domain</span>
						</h1>
						<div class="max-w-3xl mx-auto lg:max-w-none">
							<p class="text-xl text-muted mb-6 dark:text-slate-600">
								<span class="font-semibold underline decoration-wavy decoration-1 decoration-secondary-600 underline-offset-2">
									Dingpack
								</span>{' '}
								Unlock your entrepreneurial potential! Join our vibrant <em>Marketplace </em> and{' '}
								<em>kickstart</em> your online selling journey today.{' '}
								<span class="inline md:hidden">...</span>
								<span class="hidden md:inline">
									Plus, elevate your brand presence by hosting your own ecommerce portal on your
									domain name.
								</span>
							</p>

							<div class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 lg:justify-start lg:m-0 lg:max-w-7xl">
								<div class="flex w-full sm:w-auto">
									<a class="btn btn-primary sm:mb-0 w-full" href="#" target="_blank" rel="noopener">
										Become a seller
									</a>
								</div>
								<div class="flex w-full sm:w-auto">
									<button class="btn w-full bg-gray-50 dark:bg-transparent">Learn more</button>
								</div>
							</div>
						</div>
					</div>
					<div class="w-full lg:w-1/2">
						<Slider {...sliderSettingsOne}>
							{collections.map((collection) => (
								<CarouselImageCard key={collection.id} collection={collection} />
							))}
						</Slider>
					</div>
				</div>
			</div>
		</section>
	);
});
