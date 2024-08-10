import { component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { Image } from 'qwik-image';
import { HighlightedButton } from '~/components/buttons/HighlightedButton';
import { Order } from '~/generated/graphql';
import { formatDateTime, formatPrice } from '~/utils';

type IProps = {
	order: Order;
};

const orderStateDisplayMap: Record<string, string> = {
	ArrangingPayment: 'Arranging Payment',
	PaymentAuthorized: 'Payment Authorized',
	PaymentSettled: 'Payment Settled',
	PartiallyShipped: 'Partially Shipped',
	Shipped: 'Shipped',
	PartiallyDelivered: 'Partially Delivered',
	Delivered: 'Delivered',
	Modifying: 'Modifying',
	ArrangingAdditionalPayment: 'Arranging Additional Payment',
	// Add other states if they exist
};

export default component$<IProps>(({ order }) => {
	const navigate = useNavigate();

	// Get the display name for the order state
	const orderStateDisplay = orderStateDisplayMap[order.state] || order.state;

	return (
		<div class="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 text-center">
			<Image
				layout="fixed"
				width="200"
				height="200"
				aspectRatio={1}
				class="w-full h-full object-center object-cover m-auto"
				src={order.lines[0]?.featuredAsset?.preview}
				alt={order.lines[0]?.productVariant?.name}
			/>
			<div class="items-center">
				<div>
					<h1 class="mt-5 text-sm">
						Order:
						<span class="ml-2 text-xl font-semibold">{order?.code}</span>
					</h1>
					<span class="bg-teal-200 text-teal-800 text-xs px-2 py-2 mt-2 inline-block rounded-full uppercase font-semibold tracking-wide">
						{orderStateDisplay}
					</span>
					<p class="my-2">{formatPrice(order?.totalWithTax, order?.currencyCode || 'USD')}</p>
					<p class="text-xs text-gray-500">Placed on: {formatDateTime(order?.orderPlacedAt)}</p>
				</div>
			</div>
			<div>
				<HighlightedButton
					extraClass="m-auto"
					onClick$={() => {
						navigate(`/account/orders/${order?.code}`);
					}}
				>
					Go to detail
				</HighlightedButton>
			</div>
		</div>
	);
});
