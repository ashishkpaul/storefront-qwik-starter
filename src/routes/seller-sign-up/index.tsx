import { $, component$, useStore } from '@builder.io/qwik';
import type { MutationRegisterNewSellerArgs } from '~/generated/graphql-shop';
import { REGISTER_SELLER_MUTATION } from '~/providers/shop/seller/seller';
import { requester } from '~/utils/api';

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

		try {
			await requester<any, MutationRegisterNewSellerArgs>(REGISTER_SELLER_MUTATION, variables, {
				apiUrl: import.meta.env.VITE_VENDURE_PUBLIC_URL || '/graphql',
			});
			console.log('Before setting success:', state.success);
			state.success = true;
			console.log('After setting success:', state.success);

			state.error = null;
			console.log('Registration successful');
		} catch (err) {
			console.error('Registration error:', err); // Debugging line
			state.error = 'Failed to register seller. Please try again.';
			state.success = false;
		}
	});

	return (
		<div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-12">
			<h1 class="text-2xl font-bold mb-6">Register as a Seller</h1>
			{state.success && <p class="text-green-500 mb-6">Seller registered successfully!</p>}
			{state.error && <p class="text-red-500 mb-6">{state.error}</p>}
			<form onSubmit$={handleSubmit} method="post" class="space-y-4">
				<div class="flex flex-col">
					<label for="shopName" class="font-medium mb-1">
						Shop Name
					</label>
					<input
						type="text"
						id="shopName"
						name="shopName"
						value={state.formData.shopName}
						onInput$={handleChange}
						required
						class="border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div class="flex flex-col">
					<label for="firstName" class="font-medium mb-1">
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={state.formData.firstName}
						onInput$={handleChange}
						required
						class="border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div class="flex flex-col">
					<label for="lastName" class="font-medium mb-1">
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={state.formData.lastName}
						onInput$={handleChange}
						required
						class="border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div class="flex flex-col">
					<label for="emailAddress" class="font-medium mb-1">
						Email Address
					</label>
					<input
						type="email"
						id="emailAddress"
						name="emailAddress"
						value={state.formData.emailAddress}
						onInput$={handleChange}
						required
						class="border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div class="flex flex-col">
					<label for="password" class="font-medium mb-1">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={state.formData.password}
						onInput$={handleChange}
						required
						class="border border-gray-300 rounded-md p-2"
					/>
				</div>
				<button
					type="submit"
					class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Register
				</button>
			</form>
		</div>
	);
});
