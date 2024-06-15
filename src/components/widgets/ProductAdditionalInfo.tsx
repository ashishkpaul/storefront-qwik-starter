import { component$ } from '@builder.io/qwik';
import { Product, ProductCustomFields } from '~/generated/graphql';

interface AdditionalInfoProps {
	product: Product;
}

export const ProductAdditionalInfo = component$((props: AdditionalInfoProps) => {
	const additionalInfo = (props.product.customFields as ProductCustomFields)?.additionalInfo;

	// Log additionalInfo to the console
	// console.log('Additional Info:', additionalInfo);

	// Function to strip HTML tags and check for non-whitespace content
	const hasContent = (htmlString: string | null) => {
		if (!htmlString) return false;
		// Strip HTML tags and check if there's any non-whitespace content
		const text = htmlString.replace(/<[^>]*>/g, '').trim();
		return text.length > 0;
	};

	return (
		<section class="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8">
			{additionalInfo && hasContent(additionalInfo) && (
				<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
					<h2 class="text-2xl font-light tracking-tight text-gray-900 font-serif">
						Additional Info
					</h2>
					<div class="text-base text-gray-700" dangerouslySetInnerHTML={additionalInfo} />
				</div>
			)}
		</section>
	);
});

export default ProductAdditionalInfo;
