import { $, component$ } from '@builder.io/qwik';
import { Image } from 'qwik-image';
import { getProductBySlug } from '~/providers/shop/products/products';
import { changeUrlParamsWithoutRefresh } from '~/utils';
import Price from './Price';

export default component$(
	({ productAsset, productName, slug, priceWithTax, currencyCode, productSignalSetter }: any) => {
		const handleProductClick = $(async () => {
			const product = await getProductBySlug(slug);
			productSignalSetter(product);
			changeUrlParamsWithoutRefresh(productName, [slug]);
		});

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
			</a>
		);
	}
);
