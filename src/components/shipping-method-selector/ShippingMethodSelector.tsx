import { $, component$, useStore, useTask$ } from '@builder.io/qwik';
import { getEligibleShippingMethodsQuery } from '~/providers/shop/checkout/checkout';
import { setOrderShippingMethodMutation } from '~/providers/shop/orders/order';
import { AppState, EligibleShippingMethods } from '~/types';
import { formatPrice } from '~/utils';
import CheckCircleIcon from '../icons/CheckCircleIcon';

type Props = {
	appState: AppState;
};

export default component$<Props>(({ appState }) => {
	const currencyCode = appState.activeOrder.currencyCode || 'USD';
	const state = useStore<{ selectedCategory: string | null; methods: EligibleShippingMethods[] }>({
		selectedCategory: null,
		methods: [],
	});

	useTask$(async () => {
		const methods = await getEligibleShippingMethodsQuery();
		state.methods = methods;
	});

	useTask$(async (tracker) => {
		const selectedCategory = tracker.track(() => state.selectedCategory);
		if (selectedCategory !== null) {
			const selectedMethods = state.methods.filter((method) =>
				selectedCategory === 'self-order-picking' ? method.id === '1' : method.id !== '1'
			);
			const selectedMethodIds = selectedMethods.map((method) => method.id);
			if (selectedMethodIds.length) {
				appState.activeOrder = await setOrderShippingMethodMutation(selectedMethodIds);
			}
		}
	});

	const toggleCategorySelection = $((category: string) => {
		if (state.selectedCategory === category) {
			state.selectedCategory = null;
		} else {
			state.selectedCategory = category;
		}
	});

	const selfOrderPickingMethods = state.methods.filter((method) => method.id === '1');
	const dingpackFulfillmentMethods = state.methods.filter((method) => method.id !== '1');

	return (
		<div>
			<label class="text-lg font-medium text-gray-900">{$localize`Delivery method`}</label>

			{selfOrderPickingMethods.length > 0 && (
				<div class="mt-4">
					<div
						class={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none`}
						onClick$={() => toggleCategorySelection('self-order-picking')}
					>
						<span class="flex-1 flex">
							<span class="flex flex-col">
								<span class="block text-sm font-medium text-gray-900">{$localize`Self Order Picking`}</span>
								<span class="mt-6 text-sm font-medium text-gray-900">
									{selfOrderPickingMethods
										.map((method) => formatPrice(method.priceWithTax, currencyCode))
										.join(', ')}
								</span>
							</span>
						</span>
						{state.selectedCategory === 'self-order-picking' && <CheckCircleIcon />}
						<span
							class={`border-2 ${
								state.selectedCategory === 'self-order-picking' ? 'border-primary-500' : ''
							} absolute -inset-px rounded-lg pointer-events-none`}
						></span>
					</div>
				</div>
			)}

			{dingpackFulfillmentMethods.length > 0 && (
				<div class="mt-8">
					<div
						class={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none`}
						onClick$={() => toggleCategorySelection('dingpack-fulfillment-service')}
					>
						<span class="flex-1 flex">
							<span class="flex flex-col">
								<span class="block text-sm font-medium text-gray-900">{$localize`Dingpack Fulfillment Service`}</span>
								<span class="mt-6 text-sm font-medium text-gray-900">
									{dingpackFulfillmentMethods
										.map((method) => formatPrice(method.priceWithTax, currencyCode))
										.join(', ')}
								</span>
							</span>
						</span>
						{state.selectedCategory === 'dingpack-fulfillment-service' && <CheckCircleIcon />}
						<span
							class={`border-2 ${
								state.selectedCategory === 'dingpack-fulfillment-service'
									? 'border-primary-500'
									: ''
							} absolute -inset-px rounded-lg pointer-events-none`}
						></span>
					</div>
				</div>
			)}
		</div>
	);
});
