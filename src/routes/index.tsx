import { component$, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Slider } from 'qwik-slider';
import CollectionCard from '~/components/collection-card/CollectionCard';
import ProductsInCollectionCard from '~/components/products/ProductsInCollectionCard';
import Hero from '~/components/widgets/Hero';
import { APP_STATE } from '~/constants';
import { searchQueryWithCollectionSlug } from '~/providers/shop/products/products';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;
	const rootCollections = collections.filter((item) => item.parent?.name === '__root_collection__');
	const allCollections = useContext(APP_STATE).collections;

	const ShopByCategoryShowCase = {
		scrollSpeed: 1,
		autoScroll: false,
		showScrollbar: true,
		autoScrollSpeed: 10,
		gap: 25,
	};

	const ProductsInCollectionShowCase = {
		scrollSpeed: 1,
		autoScroll: false,
		showScrollbar: true,
		autoScrollSpeed: 10,
		gap: 25,
	};

	const take = 25; // Set a default value for `take`
	const skip = 0; // Set a default value for `skip`

	return (
		<div class="py-2 px-2 ">
			<Hero />

			<div class="">
				<section class="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8">
					<h2 class="text-2xl font-light tracking-tight text-gray-900 font-serif">
						{$localize`Shop by Category`}
					</h2>
					<br />
					<Slider {...ShopByCategoryShowCase}>
						{allCollections.map((collection) =>
							collection.featuredAsset ? (
								<CollectionCard key={collection.id} collection={collection} />
							) : null
						)}
					</Slider>
				</section>
			</div>

			<div>
				{rootCollections.map(async (collection) => (
					<section key={collection.id} class="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8">
						<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
							<Link
								href={`/collections/${collection.slug}`}
								key={collection.id}
								class="text-gray-900 hover:text-indigo-500"
							>
								<h2 class="text-2xl font-light tracking-tight font-serif">{collection.name}</h2>
							</Link>
						</div>
						<div>
							<Slider {...ProductsInCollectionShowCase}>
								{(await searchQueryWithCollectionSlug(collection.slug, take, skip)).items.map(
									(item) => (
										<ProductsInCollectionCard
											key={item.productId}
											productAsset={item.productAsset}
											productName={item.productName}
											slug={item.slug}
											priceWithTax={item.priceWithTax}
											currencyCode={item.currencyCode}
											// Access MRP directly from customProductVariantMappings
											MRP={item.customProductVariantMappings?.MRP}
										/>
									)
								)}
							</Slider>
						</div>
					</section>
				))}
			</div>
		</div>
	);
});
