import { component$, useContext } from '@builder.io/qwik';
// import { Image } from 'qwik-image';
import CollectionCard from '~/components/collection-card/CollectionCard';
// import { APP_STATE, HOMEPAGE_IMAGE } from '~/constants';
import Carousel from '~/components/carousel/Carousel';
// import Marquee from '~/components/marquee/Marquee';
import { APP_STATE } from '~/constants';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;
	return (
		<div>
			<div style={{ zIndex: 1, position: 'relative' }}>
				<Carousel />
			</div>
			{/* <div class="overflow-hidden mx-2 sm:mx-4 md:mx-6 lg:mx-auto xl:mx-auto 2xl:mx-auto max-w-2xl">
				<Marquee />
			</div> */}
			<section class="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8">
				<div class="mt-4 flow-root">
					<div class="-my-2">
						<div class="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
							<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
								<h2 class="text-2xl font-light tracking-tight text-orange-800">{$localize`Shop by Category`}</h2>
							</div>
							<div class="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
								{collections.map((collection) =>
									collection.featuredAsset ? (
										<CollectionCard key={collection.id} collection={collection} />
									) : null
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
});
