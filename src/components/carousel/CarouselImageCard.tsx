import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from 'qwik-image';
import { Asset, Collection } from '~/generated/graphql';

interface IProps {
	collection: Collection;
}

export default component$(({ collection }: IProps) => {
	const { promoBanner } = collection.customFields || {};
	const { featuredAsset } = collection || {};

	// Log the collection, customFields, and promoBanner
	console.log('Collection:', collection);
	console.log('Custom Fields:', collection.customFields);
	console.log('Promo Banner:', promoBanner);

	// Render the image based on the logic provided
	const renderImage = (image: Asset) => {
		const imageUrl = `${image.preview}`;

		return (
			<div class="min-w-[720px]">
				<Image
					layout="fixed"
					loading="lazy"
					// width="854"
					// height="480"
					class="w-full h-full object-center object-cover"
					src={imageUrl + '?w=640&h=360&format=webp'}
					alt={collection.name}
				/>
			</div>
		);
	};

	// Check if promoBanner or featuredAsset is defined
	if (promoBanner || featuredAsset) {
		return (
			<Link href={`/collections/${collection.slug}`} key={collection.id}>
				<div class="relative rounded-lg overflow-hidden hover:opacity-75 xl:w-auto mx-auto h-96">
					<div class="w-full h-full object-center object-cover">
						{promoBanner ? renderImage(promoBanner) : featuredAsset && renderImage(featuredAsset)}
					</div>
					<span class="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
					<span class="absolute w-full bottom-2 mt-auto text-center text-xl font-bold text-white sm:text-base">
						{collection.name}
					</span>
				</div>
			</Link>
		);
	} else {
		// If both promoBanner and featuredAsset are undefined, show a random image
		const renderRandomImage = () => {
			// Your logic for rendering a random image goes here
			// You can use Math.random() to choose a random index from an array of image URLs
			const randomImages = [
				'http://example.com/random-image1.jpg',
				'http://example.com/random-image2.jpg',
				'http://example.com/random-image3.jpg',
				// Add more image URLs as needed
			];
			const randomIndex = Math.floor(Math.random() * randomImages.length);
			const randomImageUrl = randomImages[randomIndex];

			return (
				<Image
					layout="fullWidth"
					loading="lazy"
					class="w-full h-full object-center object-cover"
					src={randomImageUrl}
					alt={collection.name}
				/>
			);
		};

		return renderRandomImage();
	}
});
