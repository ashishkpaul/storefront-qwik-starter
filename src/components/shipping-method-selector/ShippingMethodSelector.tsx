import { $, component$, useStore, useTask$ } from '@builder.io/qwik';
import {
	getEligibleShippingMethodsQuery,
	setOrderShippingMethodMutation,
} from '~/providers/shop/checkout/checkout';
import { getActiveOrderQuery } from '~/providers/shop/orders/order';
import { AppState, EligibleShippingMethods } from '~/types';
import { formatPrice } from '~/utils';
import CheckCircleIcon from '../icons/CheckCircleIcon';

type Props = {
	appState: AppState;
};

export default component$<Props>(({ appState }) => {
	const currencyCode = appState.activeOrder.currencyCode || 'USD';
	const state = useStore({
		selectedGroup: 'self-picking',
		selectedMethodIds: [] as string[],
		selfPickingMethod: null as EligibleShippingMethods | null,
		multiVendorMethods: [] as EligibleShippingMethods[],
	});

	const fetchShippingMethods = $(async () => {
		try {
			const methods = await getEligibleShippingMethodsQuery();
			state.selfPickingMethod = methods.find((method) => method.id === '1') || null;
			state.multiVendorMethods = methods.filter((method) => method.id !== '1');

			state.selectedMethodIds =
				state.selectedGroup === 'self-picking' && state.selfPickingMethod
					? [state.selfPickingMethod.id]
					: state.multiVendorMethods.map((method) => method.id);

			if (state.selectedMethodIds.length > 0) {
				await setOrderShippingMethodMutation(state.selectedMethodIds);
				appState.activeOrder = await getActiveOrderQuery();
			}
		} catch (error) {
			console.error('Error fetching shipping methods:', error);
		}
	});

	const handleGroupChange = $(async (group: string) => {
		state.selectedGroup = group;
		state.selectedMethodIds =
			group === 'self-picking' && state.selfPickingMethod
				? [state.selfPickingMethod.id]
				: state.multiVendorMethods.map((method) => method.id);

		if (state.selectedMethodIds.length > 0) {
			try {
				await setOrderShippingMethodMutation(state.selectedMethodIds);
				if (group === 'self-picking') {
					await setOrderShippingMethodMutation(state.selectedMethodIds);
				}
				appState.activeOrder = await getActiveOrderQuery();
			} catch (error) {
				console.error('Error setting order shipping method:', error);
			}
		} else {
			console.log('No shipping methods selected yet');
		}
	});

	useTask$(() => {
		const refreshShippingMethods = async () => {
			await fetchShippingMethods();
		};

		const listenToCartUpdates = (callback: () => void) => {
			const interval = setInterval(callback, 2000);
			return () => clearInterval(interval);
		};

		const unsubscribeCartUpdate = listenToCartUpdates(refreshShippingMethods);

		return () => unsubscribeCartUpdate();
	});

	return (
		<div>
			<label class="text-lg font-medium text-gray-900">{$localize`Delivery method`}</label>
			<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
				<div
					class={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${state.selectedGroup === 'self-picking' ? 'border-primary-500' : ''}`}
					onClick$={() => handleGroupChange('self-picking')}
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
						class={`border-2 ${state.selectedGroup === 'self-picking' ? 'border-primary-500' : ''} absolute -inset-px rounded-lg pointer-events-none`}
					></span>
				</div>

				<div
					class={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${state.selectedGroup === 'multi-vendor' ? 'border-primary-500' : ''}`}
					onClick$={() => handleGroupChange('multi-vendor')}
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
						class={`border-2 ${state.selectedGroup === 'multi-vendor' ? 'border-primary-500' : ''} absolute -inset-px rounded-lg pointer-events-none`}
					></span>
				</div>
			</div>
		</div>
	);
});
