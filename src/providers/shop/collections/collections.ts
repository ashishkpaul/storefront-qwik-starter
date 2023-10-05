import gql from 'graphql-tag';
import { Collection, CollectionListOptions } from '~/generated/graphql';
import { shopSdk } from '~/graphql-wrapper';

export const getCollections = async () => {
	// return await shopSdk.collections().then((res) => res?.collections.items as Collection[]);
	return await shopSdk
		.collections({ options: { take: 25 } })
		.then((res) => res?.collections.items as Collection[]);
};

export const getCollectionBySlug = async (slug: string) => {
	return await shopSdk.collection({ slug }).then((res) => res.collection as Collection);
};

gql`
	query collections($options: CollectionListOptions) {
		collections(options: $options) {
			items {
				id
				name
				slug
				parent {
					name
				}
				featuredAsset {
					id
					preview
				}
			}
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
