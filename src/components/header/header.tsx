import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Marquee from '~/components/marquee/Marquee';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID } from '~/constants';
import { logoutMutation } from '~/providers/shop/account/account';
import { getActiveCustomerQuery } from '~/providers/shop/customer/customer';
import CallIcon from '../icons/CallIcon';
import EmailIcon from '../icons/EmailIcon';
import LogoutIcon from '../icons/LogoutIcon';
import ShoppingBagIcon from '../icons/ShoppingBagIcon';
import UserCircle from '../icons/UserCircle';
import SearchBar from '../search-bar/SearchBar';

export default component$(() => {
	const appState = useContext(APP_STATE);
	const collections = useContext(APP_STATE).collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const totalQuantity =
		appState.activeOrder?.state !== 'PaymentAuthorized'
			? appState.activeOrder?.totalQuantity || 0
			: 0;

	useVisibleTask$(async () => {
		if (appState.customer.id === CUSTOMER_NOT_DEFINED_ID) {
			const activeCustomer = await getActiveCustomerQuery();
			if (activeCustomer) {
				appState.customer = {
					title: activeCustomer.title ?? '',
					firstName: activeCustomer.firstName,
					id: activeCustomer.id,
					lastName: activeCustomer.lastName,
					emailAddress: activeCustomer.emailAddress,
					phoneNumber: activeCustomer.phoneNumber ?? '',
				};
			}
		}
	});

	const logout = $(async () => {
		await logoutMutation();
		// force hard refresh
		window.location.href = '/';
	});

	return (
		<div
			class={`bg-gradient-to-r from-yellow-700 to-orange-900 transform shadow-xl sticky top-0 z-10 animate-dropIn`}
		>
			<header>
				<div class="bg-zinc-100 text-orange-600 shadow-inner text-center text-sm py-1 px-2 xl:px-0">
					<div class="max-w-6xl mx-2 h-5 min-h-full md:mx-auto flex items-center justify-between my-1">
						<div class="flex justify-between items-center w-full">
							<div>
								<p class="hidden sm:inline">
									<div class="flex items-center justify-center space-x-2">
										<a
											href="mailto:support@dingpack.com"
											class="flex items-center justify-center space-x-2 text-orange-800 hover:text-orange-600"
										>
											<EmailIcon />
											<span>support@dingpack.com</span>
										</a>
										<a
											href="tel:+919996099227"
											class="flex items-center justify-center space-x-2 text-orange-800 hover:text-orange-600"
										>
											<CallIcon />
											<span>+91 (999) 609-9227</span>
										</a>
									</div>
								</p>
							</div>
							<div class="flex overflow-hidden mx-2 sm:mx-4 md:mx-6 lg:mx-auto xl:mx-auto 2xl:mx-auto max-w-2xl">
								<Marquee />
							</div>
							<div class="flex sm:mr-[10px] 2xl:mr-0">
								<Link
									href={appState.customer.id !== CUSTOMER_NOT_DEFINED_ID ? '/account' : '/sign-in'}
									class="flex items-center space-x-1 pb-1 pr-2 text-orange-800 hover:text-orange-600"
								>
									<UserCircle />
									<span class="mt-1 text-orange-800 hover:text-orange-600 sm:inline">
										{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID
											? $localize`My Account`
											: $localize`SignIn`}
									</span>
								</Link>
								{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID && (
									<button onClick$={logout} class="text-orange-700">
										<div class="flex items-center cursor-pointer">
											<span class="mr-2">{$localize`Logout`}</span>
											<LogoutIcon />
										</div>
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
				<div class="max-w-6xl mx-auto p-4 flex items-center space-x-4  relative z-20">
					<h1 class="text-white w-10">
						<Link href="/">
							<img
								src={`/cube-logo-small.webp`}
								width={40}
								height={31}
								alt="Saa9vi Online Services"
							/>
						</Link>
					</h1>
					<div class="hidden space-x-4 sm:block">
						{collections.map((collection) => (
							<Link
								class="text-sm md:text-base text-orange-200 hover:text-white"
								href={`/collections/${collection.slug}`}
								key={collection.id}
							>
								{collection.name}
							</Link>
						))}
					</div>
					<div class="flex-1 block md:pr-8">
						<SearchBar />
					</div>
					<div class="">
						<button
							name="Cart"
							aria-label={`${totalQuantity} items in cart`}
							class="relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1 z-30"
							onClick$={() => (appState.showCart = !appState.showCart)}
						>
							<ShoppingBagIcon />
							{totalQuantity ? (
								<div class="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
									{totalQuantity}
								</div>
							) : (
								''
							)}
						</button>
					</div>
				</div>
			</header>
		</div>
	);
});
