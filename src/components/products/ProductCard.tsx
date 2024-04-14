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
		customProductVariantMappings,
	}: any) => {
		const handleProductClick = $(async () => {
			const product = await getProductBySlug(slug);
			productSignalSetter(product);
			changeUrlParamsWithoutRefresh(productName, [slug]);
		});

		// console.log('Custom Product Variant Mappings:', customProductVariantMappings);

		const MRP = customProductVariantMappings?.MRP;
		const minPrice = priceWithTax.min || priceWithTax.max;
		const discountPercentage = MRP && minPrice ? Math.round(((MRP - minPrice) / MRP) * 100) : null;
		const hasDiscount = discountPercentage && discountPercentage > 0;

		return (
			<a class="flex flex-col mx-auto" href={`/products/${slug}/`} onClick$={handleProductClick}>
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
				{hasDiscount && (
					<div class="flex flex-wrap items-center mt-1">
						<span class="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2">
							Limited time deal
						</span>
						<span class="bg-green-500 text-white py-1 px-2 rounded-md mr-2">
							{discountPercentage}% off
						</span>
						<span class={MRP !== null ? 'line-through' : ''}>
							MRP: {formatPrice(MRP || 0, currencyCode || 'INR')}
						</span>
					</div>
				)}
			</a>
		);
	}
);
