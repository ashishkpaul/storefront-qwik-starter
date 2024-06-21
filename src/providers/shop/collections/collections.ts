import gql from 'graphql-tag';
import { Collection } from '~/generated/graphql';
import { shopSdk } from '~/graphql-wrapper';

export const getCollections = async () => {
	return await shopSdk
		.collections({ take: 25 })
		.then((res) => res?.collections.items as Collection[]);
};

export const getCollectionBySlug = async (slug: string) => {
	return await shopSdk.collection({ slug }).then((res) => res.collection as Collection);
};

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
