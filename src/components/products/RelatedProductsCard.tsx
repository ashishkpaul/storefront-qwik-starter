// RelatedProductsCard.tsx
import { component$ } from '@builder.io/qwik';
import ProductCard from '~/components/products/ProductCard';

export default component$(({ relatedProducts }: any) => {
	return (
		<div>
			<h3 class="text-2xl font-medium mt-8 mb-4">Related Products</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{relatedProducts.map((relatedProduct: any) => {
					const relatedVariant = relatedProduct.variants?.[0]; // Assuming there is only one variant
					const { slug } = { slug: relatedProduct.slug }; // Clean up the slug

					// const handleRelatedProductClick = () => {
					//     // Change URL params without refreshing the page
					//     changeUrlParamsWithoutRefresh(relatedProduct.name, [relatedProduct.id]);
					// };

					return (
						<ProductCard
							productAsset={relatedProduct.featuredAsset}
							productName={relatedProduct.name}
							slug={slug}
							priceWithTax={relatedVariant?.priceWithTax}
							currencyCode={relatedVariant?.currencyCode}
							key={relatedProduct.slug}
							// onClick$={handleRelatedProductClick} // Use onClick$ instead of onClick
						/>
					);
				})}
			</div>
		</div>
	);
});
