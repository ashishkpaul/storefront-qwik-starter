import { component$, useContext } from '@builder.io/qwik';
import { Slider } from 'qwik-slider';
import HelpDesk from '~/components/icons/HelpDesk';
import SellerCentric from '~/components/icons/SellerCentric';
import { APP_STATE } from '~/constants';
import CarouselImageCard from '../../components/carousel/CarouselImageCard';
import ChartGrow from '../icons/ChartGrow';
import LocalStore from '../icons/LocalStore';
import ShopFind from '../icons/ShopFind';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;

	// Slider configuration
	const collectionInSlider = {
		scrollSpeed: 1,
		autoScroll: true,
		autoScrollSpeed: 10,
		gap: 25,
	};

	// Filter only collections that have a promo banner enabled
	const filteredCollections = collections.filter(
		(collection) => collection.customFields?.promoBannerStatus
	);

	return (
		<section class="relative md:-mt-[76px] not-prose">
			<div class="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
			<div class="relative max-w-full mx-auto px-4 sm:px-6">
				<div class="pt-0 md:pt-[76px] pointer-events-none"></div>
				<div class="py-12 md:py-20 lg:py-0 lg:flex lg:items-center lg:gap-8">
					<div class="w-full lg:w-1/2 text-center lg:text-left pb-10 md:pb-16 mx-auto">
						<h1 class="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-700">
							<span class="text-[#039de1]">BuyLits:</span> Your Local City Online Store:{' '}
							<span class="text-[#039de1]">Buy</span> and <span class="text-[#039de1]">Sell</span>{' '}
							with Ease
						</h1>
						<div class="max-w-3xl mx-auto lg:max-w-none">
							<p class="text-xl text-muted mb-6 dark:text-slate-600">
								{/* Find unique and quality items from local vendors, support local businesses, and grow
								your own online store. */}
								<span class="flex items-center gap-2">
									<ShopFind /> Find unique and quality items from local vendors.
								</span>
								<span class="flex items-center gap-2 mt-4">
									<ChartGrow /> Grow your own online store.
								</span>
								<span class="flex items-center gap-2 mt-4">
									<LocalStore /> And Support local businesses.
								</span>
							</p>

							<div class="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4 lg:justify-start lg:m-0 lg:max-w-7xl">
								<div class="flex w-full sm:w-auto">
									<a
										class="btn btn-primary sm:mb-0 w-full flex items-center justify-center gap-2 text-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
										href="https://seller.buylits.com/get-auth-status"
										target="_blank"
										rel="noopener"
									>
										<SellerCentric />
										Seller: Sign In | Sign Up
									</a>
								</div>
								<div class="flex w-full sm:w-auto">
									<a
										class="btn w-full flex items-center justify-center gap-2 text-lg bg-gradient-to-r from-gray-500 to-black hover:from-gray-600 hover:to-black text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
										href="https://#/learn-more"
										target="_blank"
										rel="noopener"
									>
										<HelpDesk />
										Learn more
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="w-full lg:w-1/2">
						<Slider {...collectionInSlider}>
							{filteredCollections.map((collection) => (
								<CarouselImageCard key={collection.id} collection={collection} />
							))}
						</Slider>
					</div>
				</div>
			</div>
		</section>
	);
});
