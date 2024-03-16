import { $, component$, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import XCircleIcon from '~/components/icons/XCircleIcon';
import { registerCustomerAccountMutation } from '~/providers/shop/account/account';

export default component$(() => {
	const email = useSignal('');
	const firstName = useSignal('');
	const lastName = useSignal('');
	const password = useSignal('');
	const confirmPassword = useSignal('');
	const successSignal = useSignal(false);
	const error = useSignal('');
	const websiteUrl = useSignal(''); // Add a signal for the websiteUrl input field
	const phoneNumber = useSignal(''); // Add a signal for the phoneNumber input field

	const registerCustomer = $(async (): Promise<void> => {
		if (
			email.value === '' ||
			firstName.value === '' ||
			lastName.value === '' ||
			password.value === ''
		) {
			error.value = 'All fields are required';
		} else if (password.value !== confirmPassword.value) {
			error.value = 'Passwords do not match';
		} else {
			if (websiteUrl.value !== '') {
				// Website URL is not allowed for account registration
				error.value = 'Invalid registration attempt';
			} else {
				// Proceed with account registration if websiteUrl is empty
				error.value = '';
				successSignal.value = false;

				const { registerCustomerAccount } = await registerCustomerAccountMutation({
					input: {
						emailAddress: email.value,
						firstName: firstName.value,
						lastName: lastName.value,
						password: password.value,
						phoneNumber: phoneNumber.value, // Include phoneNumber in the mutation input
						customFields: {
							websiteUrl: websiteUrl.value,
						},
					},
				});
				if (registerCustomerAccount.__typename === 'Success') {
					successSignal.value = true;
				} else {
					error.value = registerCustomerAccount.message;
				}
			}
		}
	});

	return (
		<div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 class="mt-6 text-center text-3xl text-gray-900">Create a new account</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Or{' '}
					<Link href="/sign-in" class="font-medium text-primary-600 hover:text-primary-500">
						login to your existing account
					</Link>
				</p>
			</div>

			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div class="mb-6 bg-yellow-50 border border-yellow-400 text-yellow-800 rounded p-4 text-center text-sm">
						{successSignal.value ? (
							<p>
								Account registration successful! We sent email verification to {email.value}, you
								must verify before logging in.
							</p>
						) : (
							<p>
								Hi! Welcome. Please take a moment to fill out the form below. Afterward, kindly
								check your email in all folders, including spam, and click on 'Verify Account'.
							</p>
						)}
					</div>
					<div class="space-y-6">
						<div>
							<label class="block text-sm font-medium text-gray-700">Email address</label>
							<div class="mt-1">
								<input
									type="email"
									autoComplete="email"
									value={email.value}
									required
									onInput$={(_, el) => (email.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-gray-700">Firstname</label>
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

						<div>
							<label class="block text-sm font-medium text-gray-700">Lastname</label>
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

						<div>
							<label class="block text-sm font-medium text-gray-700">Repeat Password</label>
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
						<div class="mt-1">
							<input
								type="hidden"
								value={websiteUrl.value}
								onInput$={(_, el) => (websiteUrl.value = el.value)}
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700">Phone Number</label>
							<div class="mt-1">
								<input
									type="text"
									value={phoneNumber.value}
									required
									onInput$={(_, el) => (phoneNumber.value = el.value)}
									class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								/>
							</div>
						</div>
						{error.value !== '' && (
							<div class="rounded-md bg-red-50 p-4">
								<div class="flex">
									<div class="flex-shrink-0">
										<XCircleIcon />
									</div>
									<div class="ml-3">
										<h3 class="text-sm font-medium text-red-800">
											We ran into a problem signing you up!
										</h3>
										<p class="text-sm text-red-700 mt-2">{error.value}</p>
									</div>
								</div>
							</div>
						)}
						<div>
							<button
								class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								onClick$={registerCustomer}
							>
								Sign up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
