import { $, component$, useComputed$, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { Image } from 'qwik-image';
// import Accordion from '~/components/accordion/Accordion'; // Assuming Accordion is in the components folder
import { Slider } from 'qwik-slider';
import Alert from '~/components/alert/Alert';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import CheckIcon from '~/components/icons/CheckIcon';
import HeartIcon from '~/components/icons/HeartIcon';
import Price from '~/components/products/Price';
import ProductCard from '~/components/products/ProductCard';
import StockLevelLabel from '~/components/stock-level-label/StockLevelLabel';
import TopReviews from '~/components/top-reviews/TopReviews';
import { ProductAdditionalInfo } from '~/components/widgets/ProductAdditionalInfo';
import { APP_STATE } from '~/constants';
import { Order, OrderLine, Product } from '~/generated/graphql';
import { addItemToOrderMutation } from '~/providers/shop/orders/order';
import { getProductBySlug } from '~/providers/shop/products/products';
import { Variant } from '~/types';
import { cleanUpParams, formatPrice, generateDocumentHead, isEnvVariableEnabled } from '~/utils';
export const useProductLoader = routeLoader$(async ({ params }) => {
	const { slug } = cleanUpParams(params);
	const product = await getProductBySlug(slug);
	// console.log('Product Data:', product);
	if (product && product.assets && product.assets.length === 1) {
		product.assets.push({
			id: 'placeholder_2',
			name: 'placeholder',
			preview: '/asset_placeholder.webp',
		});
	}
	return product;
});

export default component$(() => {
	const appState = useContext(APP_STATE);
	const relatedProductSlider = {
		scrollSpeed: 1,
		autoScroll: false,
		autoScrollSpeed: 10,
		gap: 25,
	};

	const calculateQuantities = $((product: Product) => {
		const result: Record<string, number> = {};
		(product.variants || []).forEach((variant: Variant) => {
			const orderLine = (appState.activeOrder?.lines || []).find(
				(l: OrderLine) =>
					l.productVariant.id === variant.id && l.productVariant.product.id === product.id
			);
			result[variant.id] = orderLine?.quantity || 0;
		});
		return result;
	});

	const productSignal = useProductLoader();
	const currentImageSig = useSignal(productSignal.value.assets[0]);
	const selectedVariantIdSignal = useSignal(productSignal.value.variants[0].id);
	const selectedVariantSignal = useComputed$(() =>
		productSignal.value.variants.find((v) => v.id === selectedVariantIdSignal.value)
	);
	const addItemToOrderErrorSignal = useSignal('');
	const quantitySignal = useSignal<Record<string, number>>({});

	useTask$(async (tracker) => {
		tracker.track(() => appState.activeOrder);
		quantitySignal.value = await calculateQuantities(productSignal.value);
	});

	// Add these log statements before the console.log for customFields
	console.log('Product Signal Value:', productSignal.value);

	// Check if customFields is defined for the product
	if (productSignal.value.customFields !== undefined) {
		console.log('Product Custom Fields:', productSignal.value.customFields);
	} else {
		console.log('Product Custom Fields is not available.');
	}

	// Iterate over each variant and log DiscountAmount if available
	// productSignal.value.variants.forEach((variant) => {
	// 	console.log(`Variant ID: ${variant.id}`);
	// 	console.log(`Variant Custom Fields:`);
	// 	if (variant.customFields) {
	// 		// Check if DiscountAmount is available
	// 		if (typeof variant.customFields.DiscountAmount !== 'undefined') {
	// 			console.log(`Discount Amount for ${variant.name}: ${variant.customFields.DiscountAmount}`);
	// 		} else {
	// 			console.log('Discount Amount is not available for this variant.');
	// 		}
	// 	} else {
	// 		console.log('Custom Fields is not available for this variant.');
	// 	}
	// });

	// Accordion static page
	// const items = [
	// 	{
	// 		title: 'Additional Information',
	// 		content: 'Content for Product Additioanl Info', // Pass product as prop
	// 	},
	// 	{ title: 'Item 2', content: 'Content for Item 2' },
	// 	// ... more items
	// ];

	return (
		<div>
			<div class="max-w-6xl mx-auto px-4 py-10">
				<div>
					<h2 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
						{productSignal.value.name}
					</h2>
					<Breadcrumbs
						items={
							productSignal.value.collections[productSignal.value.collections.length - 1]
								?.breadcrumbs ?? []
						}
					></Breadcrumbs>
					<div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
						<div class="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
							<span class="rounded-md overflow-hidden">
								<div class="h-[400px] w-full md:w-[400px]">
									<Image
										layout="fixed"
										class="object-center object-cover rounded-lg mx-auto"
										width="400"
										height="400"
										src={currentImageSig.value.preview + '?w=400&h=400&format=webp'}
										alt={currentImageSig.value.name}
									/>
								</div>
								{productSignal.value.assets.length > 1 && (
									<div class="w-full md:w-[400px] my-2 flex flex-wrap gap-3 justify-center">
										{productSignal.value.assets.map((asset, key) => (
											<Image
												key={key}
												layout="fixed"
												class={{
													'object-center object-cover rounded-lg': true,
													'border-b-8 border-primary-600': currentImageSig.value.id === asset.id,
												}}
												width="80"
												height="80"
												src={asset.preview + '?w=400&h=400&format=webp'}
												alt={asset.name}
												onClick$={() => {
													currentImageSig.value = asset;
												}}
											/>
										))}
									</div>
								)}
							</span>
						</div>
						<div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
							<div class="">
								<h3 class="sr-only">Description</h3>
								<div
									class="text-base text-gray-700"
									dangerouslySetInnerHTML={productSignal.value.description}
								/>
							</div>
							{1 < productSignal.value.variants.length && (
								<div class="mt-4">
									<label class="block text-sm font-medium text-gray-700">Select option</label>
									<select
										class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
										value={selectedVariantIdSignal.value}
										onChange$={(_, el) => (selectedVariantIdSignal.value = el.value)}
									>
										{productSignal.value.variants.map((variant) => (
											<option
												key={variant.id}
												value={variant.id}
												selected={selectedVariantIdSignal.value === variant.id}
											>
												{variant.name}
											</option>
										))}
									</select>
								</div>
							)}
							<div class="mt-10 flex flex-col sm:flex-row sm:items-center">
								<Price
									priceWithTax={selectedVariantSignal.value?.priceWithTax}
									currencyCode={selectedVariantSignal.value?.currencyCode}
									forcedClass="text-3xl text-gray-900 mr-4"
								></Price>
								<div class="flex sm:flex-col1 align-baseline">
									<button
										class={{
											'max-w-xs flex-1 transition-colors border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full':
												true,
											'bg-primary-600 hover:bg-primary-700':
												quantitySignal.value[selectedVariantIdSignal.value] === 0,
											'bg-green-600 active:bg-green-700 hover:bg-green-700':
												quantitySignal.value[selectedVariantIdSignal.value] >= 1 &&
												quantitySignal.value[selectedVariantIdSignal.value] <= 7,
											'bg-gray-600 cursor-not-allowed':
												quantitySignal.value[selectedVariantIdSignal.value] > 7,
										}}
										onClick$={async () => {
											if (quantitySignal.value[selectedVariantIdSignal.value] <= 7) {
												const addItemToOrder = await addItemToOrderMutation(
													selectedVariantIdSignal.value,
													1
												);
												if (addItemToOrder.__typename !== 'Order') {
													addItemToOrderErrorSignal.value = addItemToOrder.errorCode;
												} else {
													appState.activeOrder = addItemToOrder as Order;
												}
											}
										}}
									>
										{quantitySignal.value[selectedVariantIdSignal.value] ? (
											<span class="flex items-center">
												<CheckIcon />
												{$localize`${quantitySignal.value[selectedVariantIdSignal.value]} in cart`}
											</span>
										) : (
											$localize`Add to cart`
										)}
									</button>
									<button
										type="button"
										class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
									>
										<HeartIcon />
										<span class="sr-only">{$localize`Add to favorites`}</span>
									</button>
								</div>
							</div>
							<div class="mt-4 text-gray-700">
								{/* Display DiscountAmount if available */}
								{selectedVariantSignal.value?.customFields?.DiscountAmount !== undefined && (
									<>
										{/* First line: Limited time deal + Discount percentage */}
										<div class="flex flex-wrap items-center">
											{selectedVariantSignal.value.customFields?.DiscountAmount !== null && (
												<span class="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2">
													Limited time deal
												</span>
											)}
											{selectedVariantSignal.value.customFields?.DiscountAmount !== null && (
												<span class="bg-green-500 text-white py-1 px-2 rounded-md mr-2">
													{Math.round(
														(selectedVariantSignal.value.customFields.DiscountAmount /
															selectedVariantSignal.value.priceWithTax) *
															100
													)}
													% off
												</span>
											)}
										</div>
										{/* Second line: M.R.P and DiscountAmount */}
										<div class="flex items-center mt-1">
											M.R.P:{' '}
											<span
												class={`${selectedVariantSignal.value.customFields?.DiscountAmount !== null ? 'line-through' : ''}`}
											>
												{formatPrice(
													selectedVariantSignal.value.priceWithTax +
														selectedVariantSignal.value.customFields?.DiscountAmount,
													'INR'
												)}
											</span>
											{', '}
											Discount:{' '}
											{selectedVariantSignal.value.customFields?.DiscountAmount !== null
												? formatPrice(
														selectedVariantSignal.value.customFields.DiscountAmount,
														'INR'
													)
												: 'N/A'}
										</div>
									</>
								)}
							</div>

							<div class="mt-2 flex items-center space-x-2">
								<span class="text-gray-500">{selectedVariantSignal.value?.sku}</span>
								<StockLevelLabel stockLevel={selectedVariantSignal.value?.stockLevel} />
							</div>
							{!!addItemToOrderErrorSignal.value && (
								<div class="mt-4">
									<Alert message={addItemToOrderErrorSignal.value} />
								</div>
							)}
							<section class="mt-12 pt-12 border-t text-xs">
								<h3 class="text-gray-600 font-bold mb-2">{$localize`Shipping & Returns`}</h3>
								<div class="text-gray-500 space-y-1">
									<p>
										{$localize`Standard shipping: 3 - 5 working days. Express shipping: 1 - 3 working days.`}
									</p>
									<p>
										{$localize`Shipping costs depend on delivery address and will be calculated during checkout.`}
									</p>
									<p>
										{$localize`Returns are subject to terms. Please see the`}{' '}
										<span class="underline">{$localize`returns page`}</span>{' '}
										{$localize`for further information`}.
									</p>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
			<div>
				{/* Accordion */}
				{/* <Accordion items={items} /> */}
			</div>
			<ProductAdditionalInfo product={productSignal.value} />
			{/* Display related products */}
			<section class="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8">
				<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
					<h2 class="text-2xl font-light tracking-tight text-gray-900 font-serif">{$localize`Related Products`}</h2>
				</div>
				<Slider {...relatedProductSlider}>
					{productSignal.value.customFields?.relatedProducts?.map((relatedProduct: any) => {
						const relatedVariant = relatedProduct.variants?.[0];
						return (
							<ProductCard
								productAsset={relatedProduct.featuredAsset}
								productName={relatedProduct.name}
								slug={relatedProduct.slug} // Pass the slug prop
								priceWithTax={relatedVariant?.priceWithTax}
								currencyCode={relatedVariant?.currencyCode}
								key={relatedProduct.id}
								productSignalSetter={productSignal}
							/>
						);
					})}
				</Slider>
			</section>

			{isEnvVariableEnabled('VITE_SHOW_REVIEWS') && (
				<div class="mt-24">
					<TopReviews />
				</div>
			)}
		</div>
	);
});

export const head: DocumentHead = ({ resolveValue, url }) => {
	const product = resolveValue(useProductLoader);
	return generateDocumentHead(
		url.href,
		product.name,
		product.description,
		product.featuredAsset?.preview
	);
};
