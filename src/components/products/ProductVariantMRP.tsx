import { component$ } from '@builder.io/qwik';
import { formatPrice } from '~/utils';

export default component$<{
	ProductVariantMRP: number | null | undefined;
	priceWithTax: number | undefined;
	currencyCode: string | undefined;
	forcedClass?: string;
}>(({ ProductVariantMRP, priceWithTax, currencyCode }) => {
	if (typeof priceWithTax === 'undefined' || typeof ProductVariantMRP === 'undefined') {
		return <div></div>;
	}

	const discountAmount = (ProductVariantMRP || 0) - (priceWithTax || 0);
	const discountPercentage =
		ProductVariantMRP !== null && priceWithTax !== undefined
			? Math.round((1 - priceWithTax / ProductVariantMRP) * 100)
			: null;

	// Additional condition to check if ProductVariantMRP is greater than priceWithTax
	if (ProductVariantMRP && priceWithTax && ProductVariantMRP > priceWithTax) {
		return (
			<div>
				{/* First line: Limited time deal + Discount percentage */}
				<div class="flex flex-wrap items-center">
					{ProductVariantMRP !== null && (
						<span class="bg-yellow-500 text-white text-xs py-1 px-2 rounded-md mr-2">
							Limited time deal
						</span>
					)}
					{discountPercentage !== null && (
						<span class="bg-green-500 text-white text-xs py-1 px-2 rounded-md mr-2">
							{discountPercentage}% off
						</span>
					)}
				</div>
				{/* Second line: M.R.P and DiscountAmount */}
				<div class="flex items-center mt-1 text-xs">
					<span class="text-gray-500">MRP:</span>{' '}
					<span class={ProductVariantMRP !== null ? 'line-through' : ''}>
						{formatPrice(ProductVariantMRP || 0, currencyCode || 'INR')}
					</span>
					{', '}
					{discountAmount > 0 && (
						<span class="ml-2 text-gray-500">{formatPrice(discountAmount, currencyCode)} off</span>
					)}
				</div>
				{/* Third line: Display discount percentage */}
				{/* {discountPercentage !== null && (
					<div class="flex items-center mt-1">Discount Percentage: {discountPercentage}%</div>
				)} */}
			</div>
		);
	}
});
