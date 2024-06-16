import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import OrderCard from '~/components/account/OrderCard';
import { Customer, Order } from '~/generated/graphql';
import { getActiveCustomerOrdersQuery } from '~/providers/shop/customer/customer';

export default component$(() => {
	const activeCustomerOrdersSignal = useSignal<Customer>();
	const skipSignal = useSignal<number>(0); // Initialize skip signal with 0
	const totalItemsSignal = useSignal<number>(0); // Signal to hold the total number of items

	useVisibleTask$(async () => {
		const skip = skipSignal.value; // Get current skip value
		const result = await getActiveCustomerOrdersQuery(skip);
		activeCustomerOrdersSignal.value = result;
		totalItemsSignal.value = result?.orders?.totalItems || 0; // Update total items signal
	});

	const goToPreviousPage = $(async () => {
		const currentSkip = skipSignal.value; // Get current skip value
		const newSkip = Math.max(currentSkip - 25, 0); // Decrease skip by 25, but ensure it doesn't go below 0
		skipSignal.value = newSkip; // Update skip signal with new value
		// Fetch orders for the previous page
		activeCustomerOrdersSignal.value = await getActiveCustomerOrdersQuery(newSkip);
	});

	const goToNextPage = $(async () => {
		const currentSkip = skipSignal.value; // Get current skip value
		const newSkip = currentSkip + 25; // Increase skip by 25
		skipSignal.value = newSkip; // Update skip signal with new value
		// Fetch orders for the next page
		activeCustomerOrdersSignal.value = await getActiveCustomerOrdersQuery(newSkip);
	});

	return activeCustomerOrdersSignal.value ? (
		<div class="max-w-6xl m-auto rounded-lg p-4 space-y-4">
			<div class="flex flex-wrap gap-6 justify-evenly">
				{(activeCustomerOrdersSignal.value?.orders?.items || []).map((order: Order) => (
					<div key={order.id}>
						<OrderCard order={order} />
					</div>
				))}
			</div>
			<div class="flex justify-center mt-4 space-x-4">
				{skipSignal.value > 0 && ( // Show previous button if skip is greater than 0
					<button
						class="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
						onClick$={goToPreviousPage}
					>
						Previous
					</button>
				)}
				{totalItemsSignal.value > skipSignal.value + 25 && ( // Show next button if there are more items to load
					<button
						class="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onClick$={goToNextPage}
					>
						Next
					</button>
				)}
			</div>
		</div>
	) : (
		<div class="h-[100vh]" />
	);
});
