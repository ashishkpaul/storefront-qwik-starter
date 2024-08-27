import gql from 'graphql-tag';
import { MutationRegisterNewSellerArgs } from '~/generated/graphql-shop';
import { Options, shopSdk } from '~/graphql-wrapper';

export const registerSellerAccount = async (
	options: Options,
	variables: MutationRegisterNewSellerArgs
) => {
	// Assuming shopSdk now includes registerNewSeller
	return shopSdk.registerNewSeller(variables, options);
};

gql`
	mutation registerNewSeller($input: RegisterSellerInput!) {
		registerNewSeller(input: $input) {
			__typename
			id
			code
			token
		}
	}
`;
