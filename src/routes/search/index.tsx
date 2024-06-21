import { $, QwikKeyboardEvent, component$, useStore, useTask$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import Filters from '~/components/facet-filter-controls/Filters';
import FiltersButton from '~/components/filters-button/FiltersButton';
import ProductCard from '~/components/products/ProductCard';
import { SearchResponse } from '~/generated/graphql';
import { searchQueryWithTerm } from '~/providers/shop/products/products';
import { FacetWithValues } from '~/types';
import { changeUrlParamsWithoutRefresh, enableDisableFacetValues, groupFacetValues } from '~/utils';

export const executeQuery = $(
	async (term: string, activeFacetValueIds: string[], take: number, skip: number = 0) =>
		await searchQueryWithTerm('', term, activeFacetValueIds, take, skip)
);

export const useSearchLoader = routeLoader$(async ({ query }) => {
	const term = query.get('q') || '';
	const activeFacetValueIds: string[] = query.get('f')?.split('-') || [];
	const search = await executeQuery(term, activeFacetValueIds, 25, 0);
	return { search, query };
});

export default component$(() => {
	const { url } = useLocation();
	const searchLoader = useSearchLoader();

	const term = url.searchParams.get('q') || '';

	const state = useStore<{
		showMenu: boolean;
		search: SearchResponse;
		facedValues: FacetWithValues[];
		facetValueIds: string[];
		skip: number;
		allItemsLoaded: boolean;
		isLoading: boolean; // Add isLoading to the state
	}>({
		showMenu: false,
		search: {} as SearchResponse,
		facedValues: [],
		facetValueIds: [],
		skip: 0,
		allItemsLoaded: false,
		isLoading: false, // Initialize isLoading as false
	});

	const take = 25; // Set a default value for `take`

	useTask$(async ({ track }) => {
		track(() => searchLoader.value.query);

		const term = searchLoader.value.query.get('q') || '';
		const activeFacetValueIds: string[] = searchLoader.value.query.get('f')?.split('-') || [];

		state.search = await executeQuery(term, activeFacetValueIds, take, 0);
		state.facedValues = groupFacetValues(state.search, activeFacetValueIds);
		state.facetValueIds = activeFacetValueIds;
		state.skip = take;
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
		changeUrlParamsWithoutRefresh(term, facetValueIds);

		state.search = await executeQuery(term, state.facetValueIds, take, 0);
		state.skip = take;
		state.allItemsLoaded = false;
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
		state.isLoading = true; // Set isLoading to true when loading starts
		const newSearch = await executeQuery(term, state.facetValueIds, take, state.skip);
		if (newSearch.items.length === 0) {
			state.allItemsLoaded = true;
		} else {
			state.search.items = [...state.search.items, ...newSearch.items];
			state.skip += take;
		}
		state.isLoading = false; // Set isLoading to false when loading ends
	});

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
					{term ? `Results for "${term}"` : 'All filtered results'}
				</h2>
				{!!state.facedValues.length && (
					<FiltersButton
						onToggleMenu$={async () => {
							state.showMenu = !state.showMenu;
						}}
					/>
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
						{(state.search.items || []).map((item) => (
							<ProductCard
								key={item.productId}
								productAsset={item.productAsset}
								productName={item.productName}
								slug={item.slug}
								priceWithTax={item.priceWithTax}
								currencyCode={item.currencyCode}
								customProductVariantMappings={item.customProductVariantMappings}
							/>
						))}
					</div>
					{state.search.items && state.search.items.length >= take && !state.allItemsLoaded && (
						<div class="flex justify-center mt-6">
							<button
								class={`bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 ${
									state.isLoading ? 'cursor-not-allowed' : 'hover:bg-indigo-700'
								}`}
								onClick$={loadMoreProducts}
								disabled={state.isLoading}
							>
								{state.isLoading ? 'Loading...' : 'Load More Products'}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
});
