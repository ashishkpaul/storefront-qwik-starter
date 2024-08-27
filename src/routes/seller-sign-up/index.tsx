import { $, component$, useStore } from '@builder.io/qwik';
import type { DocumentNode } from 'graphql';
import { gql } from 'graphql-tag'; // Ensure you have this or similar to define your GraphQL queries
import type { MutationRegisterNewSellerArgs } from '~/generated/graphql-shop';
import { requester } from '~/utils/api'; // Ensure this imports correctly

// Define the GraphQL mutation
const REGISTER_SELLER_MUTATION: DocumentNode = gql`
	mutation RegisterNewSeller($input: RegisterNewSellerInput!) {
		registerNewSeller(input: $input) {
			id
		}
	}
`;

interface SellerFormData {
	shopName: string;
	firstName: string;
	lastName: string;
	emailAddress: string;
	password: string;
}

export default component$(() => {
	const state = useStore<{
		formData: SellerFormData;
		error: string | null;
		success: boolean;
	}>({
		formData: {
			shopName: '',
			firstName: '',
			lastName: '',
			emailAddress: '',
			password: '',
		},
		error: null,
		success: false,
	});

	const handleChange = $((e: Event) => {
		const target = e.target as HTMLInputElement;
		const { name, value } = target;
		console.log(`Changing ${name}: ${value}`); // Console log for debugging
		state.formData = { ...state.formData, [name]: value };
	});

	const handleSubmit = $(async (e: Event) => {
		e.preventDefault();

		const variables: MutationRegisterNewSellerArgs = {
			input: {
				shopName: state.formData.shopName,
				seller: {
					firstName: state.formData.firstName,
					lastName: state.formData.lastName,
					emailAddress: state.formData.emailAddress,
					password: state.formData.password,
				},
			},
		};

		console.log('Submitting form with variables:', variables); // Console log for debugging

		try {
			const response = await requester<any, MutationRegisterNewSellerArgs>(
				REGISTER_SELLER_MUTATION,
				variables,
				{ apiUrl: import.meta.env.VITE_VENDURE_PUBLIC_URL || '/graphql' }
			);
			console.log('Response:', response); // Log the response or handle success
			state.success = true;
			state.error = null;
		} catch (err) {
			console.error('Error during registration:', err); // Handle error
			state.error = 'Failed to register seller. Please try again.';
			state.success = false;
		}
	});

	return (
		<div>
			<h1>Register as a Seller</h1>
			{state.success && <p>Seller registered successfully!</p>}
			{state.error && <p style={{ color: 'red' }}>{state.error}</p>}
			<form onSubmit$={handleSubmit}>
				<div>
					<label for="shopName">Shop Name</label>
					<input
						type="text"
						id="shopName"
						name="shopName"
						value={state.formData.shopName}
						onInput$={handleChange}
						required
					/>
				</div>
				<div>
					<label for="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={state.formData.firstName}
						onInput$={handleChange}
						required
					/>
				</div>
				<div>
					<label for="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={state.formData.lastName}
						onInput$={handleChange}
						required
					/>
				</div>
				<div>
					<label for="emailAddress">Email Address</label>
					<input
						type="email"
						id="emailAddress"
						name="emailAddress"
						value={state.formData.emailAddress}
						onInput$={handleChange}
						required
					/>
				</div>
				<div>
					<label for="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={state.formData.password}
						onInput$={handleChange}
						required
					/>
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	);
});
