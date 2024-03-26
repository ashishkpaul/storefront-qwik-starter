import { component$ } from '@builder.io/qwik';
import ProductCard from '~/components/products/ProductCard';

export default component$(({ relatedProducts }: any) => {
	// console.log('Related Products:', relatedProducts);
	return (
		<div>
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
						loading="lazy"
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
	);
});
