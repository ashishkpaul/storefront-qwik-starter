import { $, component$, useStore, useTask$ } from '@builder.io/qwik';
import { getEligibleShippingMethodsQuery } from '~/providers/shop/checkout/checkout';
import { getActiveOrderQuery, setOrderShippingMethodMutation } from '~/providers/shop/orders/order';
import { AppState, EligibleShippingMethods } from '~/types';
import { formatPrice } from '~/utils';
import CheckCircleIcon from '../icons/CheckCircleIcon';

type Props = {
	appState: AppState;
};

export default component$<Props>(({ appState }) => {
	const currencyCode = appState.activeOrder.currencyCode || 'USD';
	const state = useStore<{
		selectedGroup: string;
		selectedMethodIds: string[];
		selfPickingMethod: EligibleShippingMethods | null;
		multiVendorMethods: EligibleShippingMethods[];
	}>({
		selectedGroup: 'self-picking',
		selectedMethodIds: [],
		selfPickingMethod: null,
		multiVendorMethods: [],
	});

	// Fetch eligible shipping methods
	const fetchShippingMethods = $(async () => {
		const methods = await getEligibleShippingMethodsQuery();
		state.selfPickingMethod = methods.find((method) => method.id === '1') || null;
		state.multiVendorMethods = methods.filter((method) => method.id !== '1');

		// Set initial selected methods based on the group
		if (state.selectedGroup === 'self-picking') {
			state.selectedMethodIds = state.selfPickingMethod ? [state.selfPickingMethod.id] : [];
		} else {
			state.selectedMethodIds = state.multiVendorMethods.map((method) => method.id);
		}

		// Trigger the mutation after state updates
		if (state.selectedMethodIds.length > 0) {
			console.log('Initial selected shipping methods:', state.selectedMethodIds);
			await setOrderShippingMethodMutation(state.selectedMethodIds);
			appState.activeOrder = await getActiveOrderQuery();
			console.log('Updated active order initially:', appState.activeOrder);
		}
	});

	// Handle group change and update shipping methods
	const handleGroupChange = $(async (group: string) => {
		state.selectedGroup = group;
		if (group === 'self-picking') {
			state.selectedMethodIds = state.selfPickingMethod ? [state.selfPickingMethod.id] : [];
		} else {
			state.selectedMethodIds = state.multiVendorMethods.map((method) => method.id);
		}

		if (state.selectedMethodIds.length > 0) {
			console.log('Selected shipping methods on group change:', state.selectedMethodIds);

			// Send data to Vendure server
			await setOrderShippingMethodMutation(state.selectedMethodIds);

			// Send duplicate request for 'Self Order Picking'
			if (group === 'self-picking') {
				console.log('Sending duplicate request for Self Order Picking');
				await setOrderShippingMethodMutation(state.selectedMethodIds);
			}

			// Fetch updated order from server to ensure UI reflects changes
			appState.activeOrder = await getActiveOrderQuery();
			console.log('Updated active order on group change:', appState.activeOrder);
		} else {
			console.log('No shipping methods selected yet');
		}
	});

	// Refresh shipping methods on cart update
	useTask$(() => {
		const refreshShippingMethods = async () => {
			await fetchShippingMethods();
		};

		// Mock function to simulate listening to cart updates
		const listenToCartUpdates = (callback: () => void) => {
			// Replace with your actual cart update logic
			// For example, this could be an event emitter or a subscription
			const interval = setInterval(() => {
				callback();
			}, 2000); // Refresh every 2 seconds for demo purposes

			return () => clearInterval(interval);
		};

		const unsubscribeCartUpdate = listenToCartUpdates(() => {
			console.log('Cart updated, refreshing shipping methods');
			refreshShippingMethods();
		});

		// Cleanup function to remove listener on component unmount
		return () => unsubscribeCartUpdate();
	});

	return (
		<div>
			<label class="text-lg font-medium text-gray-900">{$localize`Delivery method`}</label>
			<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
				<div
					class={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${
						state.selectedGroup === 'self-picking' ? 'border-primary-500' : ''
					}`}
					onClick$={async () => await handleGroupChange('self-picking')}
				>
					<span class="flex-1 flex">
						<span class="flex flex-col">
							<span class="block text-sm font-medium text-gray-900">Self Order Picking</span>
							{state.selfPickingMethod && (
								<span class="mt-6 text-sm font-medium text-gray-900">
									{formatPrice(state.selfPickingMethod.priceWithTax, currencyCode)}
								</span>
							)}
						</span>
					</span>
					{state.selectedGroup === 'self-picking' && <CheckCircleIcon />}
					<span
						class={`border-2 ${
							state.selectedGroup === 'self-picking' ? 'border-primary-500' : ''
						} absolute -inset-px rounded-lg pointer-events-none`}
					></span>
				</div>

				<div
					class={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${
						state.selectedGroup === 'multi-vendor' ? 'border-primary-500' : ''
					}`}
					onClick$={async () => await handleGroupChange('multi-vendor')}
				>
					<span class="flex-1 flex">
						<span class="flex flex-col">
							<span class="block text-sm font-medium text-gray-900">
								Dingpack Fulfillment Service
							</span>
							{state.multiVendorMethods.map((method) => (
								<span key={method.id} class="mt-2 text-sm font-medium text-gray-900">
									{method.name}: {formatPrice(method.priceWithTax, currencyCode)}
								</span>
							))}
						</span>
					</span>
					{state.selectedGroup === 'multi-vendor' && <CheckCircleIcon />}
					<span
						class={`border-2 ${
							state.selectedGroup === 'multi-vendor' ? 'border-primary-500' : ''
						} absolute -inset-px rounded-lg pointer-events-none`}
					></span>
				</div>
			</div>
		</div>
	);
});
