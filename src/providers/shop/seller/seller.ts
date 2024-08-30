import { gql } from 'graphql-tag';
import { MutationRegisterNewSellerArgs } from '~/generated/graphql-shop';
import { Options, shopSdk } from '~/graphql-wrapper';

// Define the GraphQL mutation
export const REGISTER_SELLER_MUTATION = gql`
	mutation RegisterNewSeller($input: RegisterSellerInput!) {
		registerNewSeller(input: $input) {
			__typename
			id
			code
			token
		}
	}
`;

// Update the function to use the shopSdk
export const registerSellerAccount = async (
	options: Options,
	variables: MutationRegisterNewSellerArgs
) => {
	return shopSdk.RegisterNewSeller(variables, options);
};
