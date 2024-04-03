import { component$ } from '@builder.io/qwik';
import { formatPrice } from '~/utils';

export default component$<{
	discountAmount: number | null | undefined;
	priceWithTax: number | undefined;
	currencyCode: string | undefined;
	forcedClass?: string;
}>(({ discountAmount, priceWithTax, currencyCode, forcedClass }) => {
	if (typeof priceWithTax === 'undefined' || typeof discountAmount === 'undefined') {
		return <div></div>;
	}

	const mrp = priceWithTax + (discountAmount || 0);
	const discountPercentage =
		discountAmount !== null && priceWithTax !== undefined
			? Math.round((discountAmount / mrp) * 100)
			: null;

	return (
		<div>
			{/* First line: Limited time deal + Discount percentage */}
			<div class="flex flex-wrap items-center">
				{discountAmount !== null && (
					<span class="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2">Limited time deal</span>
				)}
				{discountPercentage !== null && (
					<span class="bg-green-500 text-white py-1 px-2 rounded-md mr-2">
						{discountPercentage}% off
					</span>
				)}
			</div>
			{/* Second line: M.R.P and DiscountAmount */}
			<div class="flex items-center mt-1">
				M.R.P:{' '}
				<span class={`${discountAmount !== null ? 'line-through' : ''}`}>
					{formatPrice(mrp, currencyCode || 'INR')}
				</span>
				{', '}
				Discount: {formatPrice(discountAmount || 0, currencyCode || 'INR')}
			</div>
		</div>
	);
});
