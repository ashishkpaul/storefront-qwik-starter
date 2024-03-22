import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from 'qwik-image';
import { Collection } from '~/generated/graphql';

interface IProps {
	collection: Collection;
}

export default component$(({ collection }: IProps) => {
	return (
		<Link href={`/collections/${collection.slug}`} key={collection.id}>
			<div class="max-w-[96px] relative rounded-full overflow-hidden hover:opacity-75 xl:w-auto mx-auto">
				<div class="object-cover rounded-full">
					<Image
						layout="fixed"
						class="flex-grow object-cover aspect-[7/8] min-w-[96px]"
						width="96"
						height="96"
						src={collection.featuredAsset?.preview + '?w=96&h=96&format=webp'}
						alt={collection.name}
					/>
				</div>
			</div>
			<span class="block mt-2 text-center text-black">{collection.name}</span>
		</Link>
	);
});
