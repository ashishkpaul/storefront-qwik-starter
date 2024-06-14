import { $, QwikKeyboardEvent, component$, useStore, useTask$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { Slider } from 'qwik-slider';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import CollectionCard from '~/components/collection-card/CollectionCard';
import Filters from '~/components/facet-filter-controls/Filters';
import FiltersButton from '~/components/filters-button/FiltersButton';
import ProductCard from '~/components/products/ProductCard';
import { SearchResponse } from '~/generated/graphql';
import { getCollectionBySlug, getNextPage } from '~/providers/shop/collections/collections';

import {
	// getProductMRP,
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
	const take = 25; // Set the default `take` value here
	return activeFacetValueIds.length
		? await searchQueryWithTerm(params.slug, '', activeFacetValueIds, take)
		: await searchQueryWithCollectionSlug(params.slug, take);
});

export default component$(() => {
	const { params: p, url } = useLocation();
	const params = cleanUpParams(p);
	const activeFacetValueIds: string[] = url.searchParams.get('f')?.split('-') || [];
	const take = 25; // Set the default `take` value here

	const collectionSignal = useCollectionLoader();
	const searchSignal = useSearchLoader();

	const state = useStore<{
		showMenu: boolean;
		search: SearchResponse;
		facedValues: FacetWithValues[];
		facetValueIds: string[];
		currentPage: number;
		totalCount: number;
		isLoadingNextPage: boolean;
	}>({
		showMenu: false,
		search: searchSignal.value as SearchResponse,
		facedValues: groupFacetValues(searchSignal.value as SearchResponse, activeFacetValueIds),
		facetValueIds: activeFacetValueIds,
		currentPage: 0,
		totalCount: searchSignal.value.totalItems,
		isLoadingNextPage: false,
	});

	useTask$(async ({ track }) => {
		track(() => collectionSignal.value.slug);
		params.slug = cleanUpParams(p).slug;
		state.facetValueIds = url.searchParams.get('f')?.split('-') || [];
		state.search = state.facetValueIds.length
			? await searchQueryWithTerm(params.slug, '', state.facetValueIds, take)
			: await searchQueryWithCollectionSlug(params.slug, take);
		state.facedValues = groupFacetValues(state.search as SearchResponse, state.facetValueIds);
		state.totalCount = state.search.totalItems;
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

		state.search = facetValueIds.length
			? await searchQueryWithTerm(params.slug, '', state.facetValueIds, take)
			: await searchQueryWithCollectionSlug(params.slug, take);
		state.totalCount = state.search.totalItems;
	});

	const onOpenCloseFilter = $((id: string) => {
		state.facedValues = state.facedValues.map((f) => {
			if (f.id === id) {
				f.open = !f.open;
			}
			return f;
		});
	});

	const loadNextPage = $(async () => {
		if (state.isLoadingNextPage) return;
		state.isLoadingNextPage = true;

		const nextPageData = await getNextPage({
			rangeStart: state.search.items.length, // Start from the current length of items
			collectionSlug: params.slug,
			facetValueIds: state.facetValueIds,
		});

		console.log('Next page data:', nextPageData);

		// Append nextPageData.array to state.search.items
		state.search.items = [...state.search.items, ...nextPageData.array];

		// No need to increment currentPage in this case

		state.isLoadingNextPage = false;
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
						{Promise.all(
							state.search.items.map(async (item) => {
								return (
									<ProductCard
										key={item.productId}
										productAsset={item.productAsset}
										productName={item.productName}
										slug={item.slug}
										priceWithTax={item.priceWithTax}
										currencyCode={item.currencyCode}
										customProductVariantMappings={item.customProductVariantMappings} // Add this prop
									/>
								);
							})
						)}
					</div>
					{state.search.items.length < state.totalCount && (
						<button
							class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
							onClick$={loadNextPage}
							disabled={state.isLoadingNextPage}
						>
							{state.isLoadingNextPage ? 'Loading...' : 'Load More'}
						</button>
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
