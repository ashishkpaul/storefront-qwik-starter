// ./src/routes/index.tsx
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Slider } from 'qwik-slider';
import ProductCard from '~/components/products/ProductCard';
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
	// const collections = useContext(APP_STATE).collections;
	const sliderSettingsTwo = {
		scrollSpeed: 1,
		autoScroll: true,
		autoScrollSpeed: 10,
		gap: 25,
		// width: '960px',
		styleClass: 'test',
	};
	// Fetch search results
	const searchSignal = useSearchLoader();

	// Render ProductCard components based on search results
	return (
		<div>
			<h1>Products in Collection</h1>
			<div class="bg">
				<Slider {...sliderSettingsTwo}>
					{searchSignal.value.items.map((item) => (
						<ProductCard
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
	);
});
