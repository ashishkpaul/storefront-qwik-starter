// CarouselImage.tsx
import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from 'qwik-image';
import { Collection } from '~/generated/graphql';

interface IProps {
	collection: Collection;
}

export default component$(({ collection }: IProps) => {
	const { carouselImage } = collection.customFields || {};
	const { featuredAsset } = collection || {};

	// Log the collection, customFields, and carouselImage
	console.log('Collection:', collection);
	console.log('Custom Fields:', collection.customFields);
	console.log('Carousel Image:', carouselImage);

	// Check if carouselImage or featuredAsset is defined before rendering
	if (!carouselImage && !featuredAsset) {
		// If both carouselImage and featuredAsset are undefined, don't render anything
		console.warn('No image available for collection:', collection);
		return null;
	}

	// Choose a random image from carouselImage and featuredAsset
	const randomImage = Math.random() < 0.5 ? carouselImage : featuredAsset;

	return (
		<Link href={`/collections/${collection.slug}`} key={collection.id}>
			<div class="relative rounded-lg overflow-hidden hover:opacity-75 xl:w-auto mx-auto">
				<div class="w-full h-full object-center object-cover">
					{randomImage && (
						<Image
							layout="fullWidth"
							loading="lazy"
							class="w-full h-full object-center object-cover"
							src={randomImage?.preview}
							alt={collection.name}
						/>
					)}
				</div>
				<span class="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
				<span class="absolute w-full bottom-2 mt-auto text-center text-xl font-bold text-white">
					{collection.name}
				</span>
			</div>
		</Link>
	);
});
