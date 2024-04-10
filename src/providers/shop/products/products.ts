import gql from 'graphql-tag';
import {
	Product,
	ProductQuery,
	ProductVariant,
	SearchInput,
	SearchResponse,
} from '~/generated/graphql';
import { shopSdk } from '~/graphql-wrapper';

export const search = async (searchInput: SearchInput) => {
	return await shopSdk
		.search({ input: { groupByProduct: true, ...searchInput } })
		.then((res) => res.search as SearchResponse);
};

export const searchQueryWithCollectionSlug = async (collectionSlug: string) =>
	search({ collectionSlug });

export const searchQueryWithTerm = async (
	collectionSlug: string,
	term: string,
	facetValueIds: string[]
) => search({ collectionSlug, term, facetValueFilters: [{ or: facetValueIds }] });

export const getProductBySlug = async (slug: string) => {
	return shopSdk.product({ slug }).then((res: ProductQuery) => res.product as Product);
};

// Function to retrieve a product by its ID
export const getProductById = async (id: string) => {
	return shopSdk.product({ id }).then((res: ProductQuery) => res.product as Product);
};

export const getProductMRP = async (productId: string) => {
	const product = await getProductById(productId);
	return product.variants[0]?.customFields?.MRP || null;
};

export const getMRPFromProduct = (product: any): number | null => {
	const productVariant: ProductVariant | undefined = product.productVariants?.items?.[0];
	return productVariant?.customFields?.MRP || null;
};

export const detailedProductFragment = gql`
	fragment DetailedProduct on Product {
		id
		name
		slug
		description
		collections {
			id
			slug
			name
			breadcrumbs {
				id
				name
				slug
			}
		}
		facetValues {
			facet {
				id
				code
				name
			}
			id
			code
			name
		}
		featuredAsset {
			id
			preview
		}
		assets {
			id
			preview
		}
		variants {
			id
			productId
			name
			priceWithTax
			currencyCode
			sku
			stockLevel
			featuredAsset {
				id
				preview
			}
			customFields {
				MRP
			}
		}
		customFields {
			additionalInfo
			infoUrl
			relatedProducts {
				id
				name
				slug
				description
				facetValues {
					facet {
						id
						code
						name
					}
					id
					code
					name
				}
				featuredAsset {
					id
					preview
				}
				assets {
					id
					preview
				}
				variants {
					id
					name
					priceWithTax
					currencyCode
					sku
					stockLevel
					featuredAsset {
						id
						preview
					}
				}
			}
		}
	}
`;

gql`
	query product($slug: String, $id: ID) {
		product(slug: $slug, id: $id) {
			...DetailedProduct
		}
	}
`;

export const listedProductFragment = gql`
	fragment ListedProduct on SearchResult {
		productId
		productName
		slug
		productAsset {
			id
			preview
		}
		currencyCode
		priceWithTax {
			... on PriceRange {
				min
				max
			}
			... on SinglePrice {
				value
			}
		}
	}
`;

gql`
	query search($input: SearchInput!) {
		search(input: $input) {
			totalItems
			items {
				...ListedProduct
			}
			facetValues {
				count
				facetValue {
					id
					name
					facet {
						id
						name
					}
				}
			}
		}
	}
	${listedProductFragment}
`;
