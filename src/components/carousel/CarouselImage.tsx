import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from 'qwik-image';
import { Collection, Asset } from '~/generated/graphql';

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

	// Render the image based on the logic provided
	const renderImage = (image: Asset) => {
		const imageUrl = `${image.preview}`;

		return (
			<Image
				layout="fullWidth"
				loading="lazy"
				class="w-full h-full object-center object-cover"
				src={imageUrl}
				alt={collection.name}
			/>
		);
	};

	// Check if carouselImage or featuredAsset is defined
	if (carouselImage || featuredAsset) {
		return (
			<Link href={`/collections/${collection.slug}`} key={collection.id}>
				<div class="relative rounded-lg overflow-hidden hover:opacity-75 xl:w-auto mx-auto h-96">
					<div class="w-full h-full object-center object-cover">
						{carouselImage
							? renderImage(carouselImage)
							: featuredAsset && renderImage(featuredAsset)}
					</div>
					<span class="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
					<span class="absolute w-full bottom-2 mt-auto text-center text-xl font-bold text-white sm:text-base">
						{collection.name}
					</span>
				</div>
			</Link>
		);
	} else {
		// If both carouselImage and featuredAsset are undefined, show a random image
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
