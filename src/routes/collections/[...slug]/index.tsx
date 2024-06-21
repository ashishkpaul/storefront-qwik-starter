import { $, QwikKeyboardEvent, component$, useStore, useTask$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { Slider } from 'qwik-slider';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import CollectionCard from '~/components/collection-card/CollectionCard';
import Filters from '~/components/facet-filter-controls/Filters';
import FiltersButton from '~/components/filters-button/FiltersButton';
import ProductCard from '~/components/products/ProductCard';
import { SearchResponse } from '~/generated/graphql';
import { getCollectionBySlug } from '~/providers/shop/collections/collections';

import {
	searchQueryWithCollectionSlug,
	searchQueryWithTerm,
} from '~/providers/shop/products/products';
import { FacetWithValues } from '~/types';
import {
	changeUrlParamsWithoutRefresh,
	cleanUpParams,
	enableDisableFacetValues,
	generateDocumentHead,
	groupFacetValues,
} from '~/utils';

export const useCollectionLoader = routeLoader$(async ({ params }) => {
	return await getCollectionBySlug(params.slug);
});

export const useSearchLoader = routeLoader$(async ({ params: p, url }) => {
	const params = cleanUpParams(p);
	const activeFacetValueIds: string[] = url.searchParams.get('f')?.split('-') || [];
	const take = 25;
	const skip = 0;
	return activeFacetValueIds.length
		? await searchQueryWithTerm(params.slug, '', activeFacetValueIds, take, skip)
		: await searchQueryWithCollectionSlug(params.slug, take, skip);
});

export default component$(() => {
	const { params: p, url } = useLocation();
	const params = cleanUpParams(p);
	const activeFacetValueIds: string[] = url.searchParams.get('f')?.split('-') || [];
	const take = 25;

	const collectionSignal = useCollectionLoader();
	const searchSignal = useSearchLoader();

	const state = useStore<{
		showMenu: boolean;
		search: SearchResponse;
		facedValues: FacetWithValues[];
		facetValueIds: string[];
		skip: number;
		allItemsLoaded: boolean;
		totalItemsLoaded: number;
		totalAvailableItems: number;
		isLoading: boolean;
	}>({
		showMenu: false,
		search: searchSignal.value as SearchResponse,
		facedValues: groupFacetValues(searchSignal.value as SearchResponse, activeFacetValueIds),
		facetValueIds: activeFacetValueIds,
		skip: 0,
		allItemsLoaded: false,
		totalItemsLoaded: searchSignal.value.items.length,
		totalAvailableItems: searchSignal.value.totalItems,
		isLoading: false,
	});

	useTask$(async ({ track }) => {
		track(() => collectionSignal.value.slug);
		params.slug = cleanUpParams(p).slug;
		state.facetValueIds = url.searchParams.get('f')?.split('-') || [];
		state.skip = 0; // Reset skip when collection changes
		state.search = state.facetValueIds.length
			? await searchQueryWithTerm(params.slug, '', state.facetValueIds, take, state.skip)
			: await searchQueryWithCollectionSlug(params.slug, take, state.skip);
		state.facedValues = groupFacetValues(state.search as SearchResponse, state.facetValueIds);
		state.skip += take;
		state.totalItemsLoaded = state.search.items.length;
		state.allItemsLoaded = state.totalItemsLoaded >= state.search.totalItems;
	});

	const onFilterChange = $(async (id: string) => {
		const { facedValues, facetValueIds } = enableDisableFacetValues(
			state.facedValues,
			state.facetValueIds.includes(id)
				? state.facetValueIds.filter((f) => f !== id)
				: [...state.facetValueIds, id]
		);
		state.facedValues = facedValues;
		state.facetValueIds = facetValueIds;
		changeUrlParamsWithoutRefresh('', facetValueIds);

		state.skip = 0; // Reset skip when filters change
		state.search = facetValueIds.length
			? await searchQueryWithTerm(params.slug, '', state.facetValueIds, take, state.skip)
			: await searchQueryWithCollectionSlug(params.slug, take, state.skip);
		state.skip += take;
		state.totalItemsLoaded = state.search.items.length;
		state.allItemsLoaded = state.totalItemsLoaded >= state.search.totalItems;
	});

	const onOpenCloseFilter = $((id: string) => {
		state.facedValues = state.facedValues.map((f) => {
			if (f.id === id) {
				f.open = !f.open;
			}
			return f;
		});
	});

	const loadMoreProducts = $(async () => {
		state.isLoading = true;
		const additionalProducts = state.facetValueIds.length
			? await searchQueryWithTerm(params.slug, '', state.facetValueIds, take, state.skip)
			: await searchQueryWithCollectionSlug(params.slug, take, state.skip);

		state.search.items = [...state.search.items, ...additionalProducts.items];
		state.skip += take;
		state.totalItemsLoaded += additionalProducts.items.length;
		state.allItemsLoaded = state.totalItemsLoaded >= state.search.totalItems;
		state.isLoading = false;
	});

	const SubCollectionSlider = {
		scrollSpeed: 1,
		autoScroll: false,
		showScrollbar: true,
		autoScrollSpeed: 10,
		gap: 25,
	};

	return (
		<div
			class="max-w-6xl mx-auto px-4 py-10"
			onKeyDown$={(event: QwikKeyboardEvent) => {
				if (event.key === 'Escape') {
					state.showMenu = false;
				}
			}}
		>
			<div class="flex justify-between items-center">
				<h2 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
					{collectionSignal.value.name}
				</h2>
				<div>
					{!!state.facedValues.length && (
						<FiltersButton
							onToggleMenu$={async () => {
								state.showMenu = !state.showMenu;
							}}
						/>
					)}
				</div>
			</div>
			<div>
				<Breadcrumbs items={collectionSignal.value.breadcrumbs || []}></Breadcrumbs>
				{!!collectionSignal.value.children?.length && (
					<div class="max-w-2xl mx-auto py-16 sm:py-16 lg:max-w-none border-b mb-16">
						<h2 class="text-2xl font-light text-gray-900">Collections</h2>
						<div class="">
							<Slider {...SubCollectionSlider}>
								{collectionSignal.value.children.map((child) => (
									<CollectionCard key={child.id} collection={child}></CollectionCard>
								))}
							</Slider>
						</div>
					</div>
				)}
			</div>
			<div class="mt-6 grid sm:grid-cols-5 gap-x-4">
				{!!state.facedValues.length && (
					<Filters
						showMenu={state.showMenu}
						facetsWithValues={state.facedValues}
						onToggleMenu$={async () => {
							state.showMenu = !state.showMenu;
						}}
						onFilterChange$={onFilterChange}
						onOpenCloseFilter$={onOpenCloseFilter}
					/>
				)}
				<div class="sm:col-span-5 lg:col-span-4">
					<div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{state.search.items.map((item) => (
							<ProductCard
								key={item.productId}
								productAsset={item.productAsset}
								productName={item.productName}
								slug={item.slug}
								priceWithTax={item.priceWithTax}
								currencyCode={item.currencyCode}
								customProductVariantMappings={item.customProductVariantMappings} // Add this prop
							/>
						))}
					</div>
					{!state.allItemsLoaded && (
						<div class="flex justify-center mt-8">
							<button
								onClick$={loadMoreProducts}
								class={`bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 ${
									state.isLoading ? 'cursor-not-allowed' : 'hover:bg-indigo-700'
								}`}
								disabled={state.isLoading}
							>
								{state.isLoading ? 'Loading...' : 'Load more products'}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ resolveValue, url }) => {
	const collection = resolveValue(useCollectionLoader);
	let image = collection.children?.[0]?.featuredAsset?.preview || undefined;
	if (!image) {
		const search = resolveValue(useSearchLoader);
		image = search.items?.[0]?.productAsset?.preview || undefined;
	}
	return generateDocumentHead(url.href, collection.name, undefined, image);
};
