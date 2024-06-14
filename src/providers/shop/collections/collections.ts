import gql from 'graphql-tag';
import { Collection } from '~/generated/graphql';
import { shopSdk } from '~/graphql-wrapper';
import {
	searchQueryWithCollectionSlug,
	searchQueryWithTerm,
} from '~/providers/shop/products/products';

export const getCollections = async () => {
	return await shopSdk
		.collections({ take: 25 })
		.then((res) => res?.collections.items as Collection[]);
};

export const getCollectionBySlug = async (slug: string) => {
	return await shopSdk.collection({ slug }).then((res) => res.collection as Collection);
};

export const getNextPage = async ({
	rangeStart,
	collectionSlug,
	facetValueIds,
}: {
	rangeStart: number;
	collectionSlug: string;
	facetValueIds: string[];
}) => {
	const take = 25; // Number of items to fetch per page
	console.log('Fetching next page with params:', {
		rangeStart,
		collectionSlug,
		facetValueIds,
		take,
	});
	const response = await (facetValueIds.length
		? searchQueryWithTerm(collectionSlug, '', facetValueIds, take)
		: searchQueryWithCollectionSlug(collectionSlug, take));
	console.log('Fetched response:', response);
	return {
		startIndex: rangeStart,
		array: response.items,
		totalCount: response.totalItems,
	};
};

// Define the GraphQL queries
gql`
	query collections($take: Int, $skip: Int) {
		collections(options: { take: $take, skip: $skip }) {
			items {
				id
				name
				slug
				parent {
					id
					slug
					name
				}
				featuredAsset {
					id
					preview
				}
				customFields {
					promoBanner {
						preview
					}
					promoBannerStatus
					popularityScore
				}
			}
			totalItems
		}
	}
`;

gql`
	query collection($slug: String, $id: ID) {
		collection(slug: $slug, id: $id) {
			id
			name
			slug
			breadcrumbs {
				id
				name
				slug
			}
			children {
				id
				name
				slug
				featuredAsset {
					id
					preview
				}
			}
		}
	}
`;
