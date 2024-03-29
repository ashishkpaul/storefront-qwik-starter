// ./src/routes/index.tsx
import { component$, useContext } from '@builder.io/qwik';
<<<<<<< HEAD
import { routeLoader$ } from '@builder.io/qwik-city';
import { Slider } from 'qwik-slider';
import CollectionCard from '~/components/collection-card/CollectionCard';
import ProductsInCollectionCard from '~/components/products/ProductsInCollectionCard';
import Hero from '~/components/widgets/Hero';
import { APP_STATE } from '~/constants';
import {
	searchQueryWithCollectionSlug,
	searchQueryWithTerm,
} from '~/providers/shop/products/products';
import { cleanUpParams } from '~/utils';

export const useSearchLoader = routeLoader$(async ({ params }) => {
	const cleanParams = cleanUpParams(params);
	const activeFacetValueIds: string[] = cleanParams.f?.split('-') || [];
	const collectionSlug = cleanParams.slug ?? 'electronics'; // Assuming you have access to the collection slug somehow

	return activeFacetValueIds.length
		? await searchQueryWithTerm(collectionSlug, '', activeFacetValueIds)
		: await searchQueryWithCollectionSlug(collectionSlug);
});

export default component$(() => {
	const collections = useContext(APP_STATE).collections;
	const sliderSettingsTwo = {
		scrollSpeed: 1,
		autoScroll: false,
		autoScrollSpeed: 10,
		gap: 25,
		// width: '960px',
		styleClass: 'test',
		// breakpoints: {
		// 	sm: {
		// 		slidesPerView: 1,
		// 		spaceBetween: 10,
		// 	},
		// 	md: {
		// 		slidesPerView: 2,
		// 		spaceBetween: 20,
		// 	},
		// 	lg: {
		// 		slidesPerView: 3,
		// 		spaceBetween: 25,
		// 	},
		// },
	};
	// Fetch search results
	const searchSignal = useSearchLoader();
=======
// import { Image } from 'qwik-image';
import CollectionCard from '~/components/collection-card/CollectionCard';
// import { APP_STATE, HOMEPAGE_IMAGE } from '~/constants';
import { APP_STATE } from '~/constants';
import Carousel from '~/components/carousel/Carousel';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;
	return (
		<div>
			<Carousel />
>>>>>>> main

	// Render ProductCard components based on search results
	return (
		<div class="py-2 px-2 ">
			<Hero />
			<section class="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8">
				<div class="mt-4 flow-root">
					<div class="-my-2">
						<div class="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
							<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
<<<<<<< HEAD
								<h2 class="text-2xl font-light tracking-tight text-gray-900 font-serif">{$localize`Hot Deals`}</h2>
=======
								<h2 class="text-2xl font-light tracking-tight text-orange-800">{$localize`Shop by Category`}</h2>
>>>>>>> main
							</div>
							{/* <h1>Products in Collection</h1> */}
							<div class="gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
								<Slider {...sliderSettingsTwo}>
									{searchSignal.value.items.map((item) => (
										<ProductsInCollectionCard
											key={item.productId}
											productAsset={item.productAsset}
											productName={item.productName}
											slug={item.slug}
											priceWithTax={item.priceWithTax}
											currencyCode={item.currencyCode}
										/>
									))}
								</Slider>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div>
				<section class="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8">
					<div class="mt-4 flow-root">
						<div class="-my-2">
							<div class="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
								<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
									<h2 class="text-2xl font-light tracking-tight text-gray-900 font-serif">{$localize`Shop by Category`}</h2>
								</div>
								<div class="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
									{collections.map((collection) =>
										collection.featuredAsset ? (
											<CollectionCard key={collection.id} collection={collection} />
										) : null
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
});
