import { $, component$ } from '@builder.io/qwik';
import { Image } from 'qwik-image';
import { getProductBySlug } from '~/providers/shop/products/products';
import { changeUrlParamsWithoutRefresh, formatPrice } from '~/utils';
import Price from './Price';

export default component$(
	({
		productAsset,
		productName,
		slug,
		priceWithTax,
		currencyCode,
		productSignalSetter,
		MRP,
	}: any) => {
		if (!productAsset || !priceWithTax) {
			return null;
		}

		const formattedMRP = formatPrice(MRP || 0, currencyCode || 'INR'); // Pre-format MRP (if always available)

		let calculatedDiscountPercentage = null;

		const handleProductClick = $(async () => {
			const product = await getProductBySlug(slug);
			productSignalSetter(product);
			changeUrlParamsWithoutRefresh(productName, [slug]);
		});

		if (MRP && priceWithTax) {
			const minPrice = priceWithTax.min || priceWithTax.max;

			if (MRP > minPrice) {
				const discountAmount = MRP - minPrice;
				calculatedDiscountPercentage = Math.round((discountAmount / MRP) * 100);
			}
		}

		return (
			<a class="" href={`/products/${slug}/`} onClick$={handleProductClick}>
				<Image
					layout="fixed"
					loading="lazy"
					class="rounded-xl flex-grow object-cover aspect-[7/8] min-w-[200px]"
					width="200"
					height="200"
					src={productAsset?.preview + '?w=300&h=400&format=webp'}
					alt={productName}
				/>
				<div class="h-2" />
				<div class="text-sm text-gray-700">{productName}</div>
				<Price
					priceWithTax={priceWithTax}
					currencyCode={currencyCode}
					forcedClass="text-sm font-medium text-gray-900"
				/>
				{MRP && priceWithTax && MRP > priceWithTax.min && (
					<div class="flex flex-wrap items-center mt-1">
						<span class="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2">
							Limited time deal
						</span>
						{calculatedDiscountPercentage !== null && (
							<span class="bg-green-500 text-white py-1 px-2 rounded-md mr-2">
								{calculatedDiscountPercentage}% off
							</span>
						)}
						<span class={MRP !== null ? 'line-through' : ''}>{formattedMRP}</span>
					</div>
				)}
			</a>
		);
	}
);
