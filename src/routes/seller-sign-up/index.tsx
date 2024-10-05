import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import CheckCircleIcon from '~/components/icons/CheckCircleIcon';
import XCircleIcon from '~/components/icons/XCircleIcon';
import { REGISTER_SELLER_MUTATION } from '~/providers/shop/seller/seller';
import { requester } from '~/utils/api';

// const shopApi =
// 	'https://core.vendure.lan/shopApi-tm9rc~ziKFM8Ts6GsAm-_Y9ccTxz8VlhYLEYaEDUvFgX7BOKrWljfjxebIySv-3-';

export default component$(() => {
	const containerRef = useSignal<HTMLDivElement>();

	const shopName = useSignal('');
	const firstName = useSignal('');
	const lastName = useSignal('');
	const emailAddress = useSignal('');
	const password = useSignal('');
	const confirmPassword = useSignal('');

	const successSignal = useSignal(false);
	const error = useSignal('');

	const registerSeller = $(async (): Promise<void> => {
		if (
			shopName.value === '' ||
			firstName.value === '' ||
			lastName.value === '' ||
			emailAddress.value === '' ||
			password.value === ''
		) {
			error.value = 'All required fields must be filled out.';
		} else if (password.value !== confirmPassword.value) {
			error.value = 'Passwords do not match';
		} else {
			error.value = '';
			successSignal.value = false;

			const variables = {
				input: {
					shopName: shopName.value,
					seller: {
						firstName: firstName.value,
						lastName: lastName.value,
						emailAddress: emailAddress.value,
						password: password.value,
					},
				},
			};

			try {
				await requester<any, any>(REGISTER_SELLER_MUTATION, variables, {
					apiUrl: import.meta.env.VITE_VENDURE_PUBLIC_URL,
					// apiUrl: shopApi,
				});
				successSignal.value = true;
				// Clear the form fields on successful registration
				shopName.value = '';
				firstName.value = '';
				lastName.value = '';
				emailAddress.value = '';
				password.value = '';
				confirmPassword.value = '';
			} catch (err) {
				error.value = 'Failed to register seller. Please try again.';
			}
		}
	});

	// Scroll to the top when success or error changes
	useVisibleTask$(({ track }) => {
		track(() => successSignal.value);
		track(() => error.value);
		if ((successSignal.value || error.value) && containerRef.value) {
			containerRef.value.scrollIntoView({ behavior: 'smooth' });
		}
	});

	return (
		<div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8" ref={containerRef}>
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 class="mt-6 text-center text-3xl text-gray-900">Register as a Seller</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Or{' '}
					<Link
						href="https://seller.buylits.com"
						target="_blank"
						class="font-medium text-primary-600 hover:text-primary-500"
					>
						login to your existing account
					</Link>
				</p>
			</div>

			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div class="space-y-6">
						{/* Shop Name */}
						<div>
							<label class="block text-sm font-medium text-gray-700">Shop Name</label>
							<div class="mt-1">
								<input
									type="text"
									value={shopName.value}
									required
									onInput$={(_, el) => (shopName.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						{/* First Name */}
						<div>
							<label class="block text-sm font-medium text-gray-700">First Name</label>
							<div class="mt-1">
								<input
									type="text"
									value={firstName.value}
									required
									onInput$={(_, el) => (firstName.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						{/* Last Name */}
						<div>
							<label class="block text-sm font-medium text-gray-700">Last Name</label>
							<div class="mt-1">
								<input
									type="text"
									value={lastName.value}
									required
									onInput$={(_, el) => (lastName.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						{/* Email Address */}
						<div>
							<label class="block text-sm font-medium text-gray-700">Email Address</label>
							<div class="mt-1">
								<input
									type="email"
									value={emailAddress.value}
									required
									onInput$={(_, el) => (emailAddress.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						{/* Password */}
						<div>
							<label class="block text-sm font-medium text-gray-700">Password</label>
							<div class="mt-1">
								<input
									type="password"
									value={password.value}
									required
									onInput$={(_, el) => (password.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						{/* Confirm Password */}
						<div>
							<label class="block text-sm font-medium text-gray-700">Confirm Password</label>
							<div class="mt-1">
								<input
									type="password"
									value={confirmPassword.value}
									required
									onInput$={(_, el) => (confirmPassword.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						{/* Error Message */}
						{error.value && (
							<div class="rounded-md bg-red-50 p-4">
								<div class="flex">
									<div class="flex-shrink-0">
										<XCircleIcon />
									</div>
									<div class="ml-3">
										<h3 class="text-sm font-medium text-red-800">{error.value}</h3>
									</div>
								</div>
							</div>
						)}

						{/* Success Message */}
						{successSignal.value && (
							<div class="rounded-md bg-green-50 p-4">
								<div class="flex">
									<div class="flex-shrink-0">
										<CheckCircleIcon />
									</div>
									<div class="ml-3">
										<h3 class="text-sm font-medium text-green-800">
											Seller registered successfully!
										</h3>
									</div>
								</div>
							</div>
						)}

						<div>
							<button
								type="button"
								class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								onClick$={registerSeller}
							>
								Register
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
