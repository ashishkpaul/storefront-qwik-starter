import { component$ } from '@builder.io/qwik';
import { Product, ProductCustomFields } from '~/generated/graphql';

interface AdditionalInfoProps {
	product: Product;
}

export const ProductAdditionalInfo = component$((props: AdditionalInfoProps) => {
	// console.log('Product Additional Info Props:', props);
	return (
		<div class="max-w-2xl mx-auto py-2 px-4 sm:py-4 sm:px-6 lg:max-w-6xl lg:px-8">
			<h2 class="text-lg font-medium text-orange-900">Additional Info</h2>
			<div
				class="text-base text-gray-700"
				dangerouslySetInnerHTML={
					(props.product.customFields as ProductCustomFields)?.additionalInfo ?? ''
				}
			/>
		</div>
	);
});

export default ProductAdditionalInfo;
