import gql from 'graphql-tag';
import type { Order } from '~/generated/graphql-admin';
import type { Options } from '~/graphql-wrapper';
import { adminSdk } from '~/graphql-wrapper';

export const getOrderByCode = async (code: string, options?: Options) => {
	try {
		const response = await adminSdk.orders(
			{
				options: {
					filter: { code: { eq: code } },
					sort: options?.sort,
				},
			},
			options
		);

		console.log('GraphQL Response:', response); // Log the entire response

		return (response?.orders?.items?.[0] as Order) || null; // Handle potential empty response
	} catch (error) {
		console.error('Error in getOrderByCode:', error); // Log the error
		throw new Error('Failed to fetch order details.');
	}
};

gql`
	fragment OrderDetail on Order {
		__typename
		id
		code
		active
		createdAt
		updatedAt
		state
		currencyCode
		totalQuantity
		subTotal
		subTotalWithTax
		taxSummary {
			description
			taxRate
			taxTotal
		}
		shippingWithTax
		totalWithTax
		customer {
			id
			firstName
			lastName
			emailAddress
		}
		shippingAddress {
			fullName
			streetLine1
			streetLine2
			company
			city
			province
			postalCode
			countryCode
			phoneNumber
		}
		shippingLines {
			shippingMethod {
				id
				name
				code
				description
			}
			priceWithTax
		}
		lines {
			id
			unitPriceWithTax
			linePriceWithTax
			quantity
			featuredAsset {
				id
				preview
			}
			productVariant {
				id
				name
				sku
				price
				product {
					id
					slug
				}
			}
		}
	}
`;

gql`
	query orders($options: OrderListOptions) {
		orders(options: $options) {
			items {
				...OrderDetail
			}
		}
	}
`;
