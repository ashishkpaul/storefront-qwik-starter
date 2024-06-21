import gql from 'graphql-tag';
import {
	Product,
	ProductQuery,
	ProductVariant,
	SearchInput,
	SearchResponse,
} from '~/generated/graphql';
import { shopSdk } from '~/graphql-wrapper';

export const search = async (searchInput: SearchInput, take: number, skip: number) => {
	return await shopSdk
		.search({ input: { groupByProduct: true, take, skip, ...searchInput } })
		.then((res) => res.search as SearchResponse);
};

export const searchQueryWithCollectionSlug = async (
	collectionSlug: string,
	take: number,
	skip: number
) => search({ collectionSlug }, take, skip);

export const searchQueryWithTerm = async (
	collectionSlug: string,
	term: string,
	facetValueIds: string[],
	take: number,
	skip: number
) => search({ collectionSlug, term, facetValueFilters: [{ or: facetValueIds }] }, take, skip);

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
	try {
		const res: ProductQuery = await shopSdk.product({ slug });
		if (res.product) {
			return res.product as Product;
		} else {
			console.error('Product not found.');
			return null;
		}
	} catch (error) {
		console.error('Error fetching product:', error);
		return null;
	}
};

export const getProductById = async (id: string): Promise<Product | null> => {
	try {
		const res = await shopSdk.product({ id });
		return res.product as Product;
	} catch (error) {
		console.error('Error fetching product:', error);
		return null;
	}
};

export const getProductMRP = async (productId: string): Promise<number | null> => {
	const product = await getProductById(productId);

	if (product && product.variants && product.variants.length > 0) {
		const variant = product.variants[0];
		if (variant.customFields && variant.customFields.MRP !== undefined) {
			return variant.customFields.MRP;
		}
	}

	return null; // Return null if product or MRP is not available
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
					customFields {
						MRP
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
		customProductVariantMappings {
			MRP
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
